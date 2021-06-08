import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';

function ItemOwner({ userId }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        db.collection('users').doc(userId).get().then(doc => {
            setUser(doc.data())
        })
    }, [userId]);

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

    return (
        <div className="layout6">
            <div className="sellers-data">
                <div className="postedBy">Posted by</div>
                <div className="users-data">
                    <div className="images-data"> <img src={user?.photoURL} alt={user?.displayName} /></div>
                    <div className="author-name">{user?.displayName}</div>
                    <div className="clickables">
                        <div className="message">Message</div>
                    &nbsp;&nbsp;
                    {hasFollow ? <div className={`followed showFbtn_${showFbtn}`} onClick={() => { unFollowAuthor() }}>unfollow</div>
                            : <div className={`follow showFbtn_${showFbtn}`} onClick={() => { followAuthor() }}>Follow</div>}
                        <div className={`followed totalFollowers_${showFbtn}`} onClick={() => { followAuthor() }}>Following</div>
                    &nbsp;&nbsp;
                    <div className="followers">{totalFollowers}</div>
                    </div>
                </div>
                <div className="report">
                    <img src="/images/Icon material-flag.png" className="flag" alt="" /> Report this Business</div>
            </div>
        </div>

    )
}

export default ItemOwner
