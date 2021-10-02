import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { hasFollowed } from '../myFunctions';
import Chat from './Chat';
import ReportBoard from './ReportBoard'
import UserProfile from './UserProfile/UserProfile';

function ItemOwner({ userId }) {
    const user = UserProfile.getUser()
    const [owner, setOwner] = useState([]);

    useEffect(() => {
        db.collection('users').doc(userId).get().then(doc => {
            setOwner(doc.data());
        })
    }, [userId]);

    const [showReportBoard, setShowReportBoard] = useState(false)

    const [hasFollow, setHasFollow] = useState(false)
    const [totalFollowers, setTotalFollowers] = useState(0)
    const [showFbtn, setShowFbtn] = useState(false)

    // setShowFbtn true if current user is not the  author
    useEffect(() => {
        if (user?.uid !== userId) { setShowFbtn(true) }
    }, [user, userId])

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
    useEffect(() => {
        const unsubscribe = () => { user && userId && setHasFollow(hasFollowed(userId)) }
        unsubscribe()
    }, [user, userId])

    const followAuthor = () => {
        if (user) {
            if (!hasFollow && user) {
                var uid = user?.uid

                db.collection('users').doc(uid).collection('following').doc(userId).set({
                    uid: userId,
                    photoURL: owner.photoURL,
                    userName: owner.userName
                })

                db.collection('users').doc(userId).collection('follower').doc(uid).set({
                    uid,
                    photoURL: user.photoURL,
                    userName: user.userName

                })
                setHasFollow(true);
            }
        }
    }

    const unFollowAuthor = () => {
        if (userId) {
            if (hasFollow) {
                db.collection('users').doc(userId).collection('follower').doc(user?.uid).delete()
                db.collection('users').doc(user?.uid).collection('following').doc(userId).delete()
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
                    <Link to={`/${owner?.userName}`} className="images-data"> <img src={owner?.photoURL} alt={owner && owner?.userName} /></Link>
                    <div className="author-name">
                        {user?.userName && owner?.userName === user?.userName ? 'You' : owner?.userName}
                    </div>

                    <div className="clickables">
                        {user && user?.uid !== userId ? <div className="message" onClick={() => { setOpenChat(true) }}>Message</div>
                            : <div className="message" style={{ background: "#ff7ba861", border: 'none' }}></div>}
                        &nbsp;
                        {user && hasFollow ? <div className={`followed showFbtn_${showFbtn}`} onClick={() => { unFollowAuthor() }}>unfollow</div>
                            : <div className={`follow showFbtn_${showFbtn}`} onClick={() => { followAuthor() }}>Follow</div>}
                        <div className={`followed totalFollowers_${showFbtn}`} onClick={() => { followAuthor() }}>Following</div>
                        &nbsp;
                        <div className="followers">{totalFollowers}</div>
                    </div>

                </div>
                {user && user?.uid !== userId &&
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
