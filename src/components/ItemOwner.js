import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import Chat from './Chat';
import ReportBoard from './ReportBoard'
import UserProfile from './UserProfile/UserProfile';

function ItemOwner({ userId }) {
    const [user, setUser] = useState(UserProfile.getUser());
    useEffect(() => {
        db.collection('users').doc(userId).get().then(doc => {
            setUser(doc.data())
        })
    }, [userId]);

    const [showReportBoard, setShowReportBoard] = useState(false)

    const [hasFollow, setHasFollow] = useState(false)
    const [totalFollowers, setTotalFollowers] = useState(0)
    const [showFbtn, setShowFbtn] = useState(false)

    // setShowFbtn true if current user is not the  author
    useEffect(() => {
        if (auth.currentUser?.uid !== userId) { setShowFbtn(true) }
    }, [userId])

    // setTotalFollowers
    useEffect(() => {
        const unsubscribe = () => {
            if (userId) {
                db.collection('users').doc(userId).collection('follower').onSnapshot((snapshot) => {
                    setTotalFollowers((snapshot.docs.map(doc => doc.data())).length)
                });
            }
        }
        unsubscribe();
    }, [userId])

    // check if current user is already following the author
    var currentUser = auth.currentUser

    useEffect(() => {
        const unsubscribe = () => {
            if (currentUser && userId) {
                db.collection('users').doc(userId).collection('follower').doc(currentUser.uid).get()
                    .then((doc) => {
                        setHasFollow(doc.exists);
                    });
            }
        }
        unsubscribe()
    }, [currentUser, userId])

    const followAuthor = () => {
        if (user) {
            if (!hasFollow && auth.currentUser) {
                var uid = auth.currentUser.uid

                db.collection('users').doc(uid).collection('following').doc(userId).set({
                    uid: userId,
                    photoURL: user.photoURL,
                    displayName: user.displayName
                })

                db.collection('users').doc(userId).collection('follower').doc(uid).set({
                    uid: auth.currentUser.uid,
                    photoURL: auth.currentUser.photoURL,
                    displayName: auth.currentUser.displayName

                })
                setHasFollow(true);
            }
        }
    }

    const unFollowAuthor = () => {
        if (userId) {
            if (hasFollow) {
                db.collection('users').doc(userId).collection('follower').doc(auth.currentUser.uid).delete()
                db.collection('users').doc(auth.currentUser.uid).collection('following').doc(userId).delete()
                setHasFollow(false);
            }
        }
    }

    const [openChat, setOpenChat] = useState(false)

    return (
        <div className="layout6">
            {showReportBoard && <ReportBoard
                setShowReportBoard={setShowReportBoard}
            />}
            {openChat && <Chat toggle={setOpenChat} userId={userId} />}

            <div className="sellers-data">
                <div className="postedBy">Posted by</div>
                <div className="users-data">
                    <Link to={`/profile?uid=${userId}`} className="images-data"> <img src={user?.photoURL} alt={user && user?.displayName} /></Link>
                    <div className="author-name">
                        {user?.displayName && user?.displayName === auth.currentUser?.displayName ? 'You' : user?.displayName}
                    </div>

                    <div className="clickables">
                        {auth.currentUser && auth.currentUser?.uid !== userId ? <div className="message" onClick={() => { setOpenChat(true) }}>Message</div>
                            : <div className="message" style={{ background: "#ff7ba861", border: 'none' }}></div>}
                        &nbsp;
                        {auth.currentUser && hasFollow ? <div className={`followed showFbtn_${showFbtn}`} onClick={() => { unFollowAuthor() }}>unfollow</div>
                            : <div className={`follow showFbtn_${showFbtn}`} onClick={() => { followAuthor() }}>Follow</div>}
                        <div className={`followed totalFollowers_${showFbtn}`} onClick={() => { followAuthor() }}>Following</div>
                        &nbsp;
                        <div className="followers">{totalFollowers}</div>
                    </div>

                </div>
                {auth.currentUser && auth.currentUser?.uid !== userId &&
                    <div className="report" onClick={() => { setShowReportBoard(true) }}>
                        <img src="/images/Icon material-flag.png" className="flag" alt="" />
                        Report this Business
                    </div>
                }
            </div>
        </div>

    )
}

export default ItemOwner
