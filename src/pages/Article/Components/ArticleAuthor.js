import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase'

function ArticleAuthor({ article, articleId }) {
    const [hasFollow, setHasFollow] = useState(false)
    const [totalFollowers, setTotalFollowers] = useState(0)
    const [showFbtn, setShowFbtn] = useState(false)

    // setShowFbtn true if current user is not the  author
    useEffect(() => {
        if (auth.currentUser?.uid !== article?.userId) { setShowFbtn(true) }
    }, [article?.userId])

    // setTotalFollowers
    useEffect(() => {
        const unsubscribe = () => {
            if (article) {
                db.collection('users').doc(article?.userId).collection('follower').onSnapshot((snapshot) => {
                    setTotalFollowers((snapshot.docs.map(doc => doc.data())).length)
                });
            }
        }
        unsubscribe();
    }, [article, article?.userId])

    // check if current user is already following the author
    var currentUser = auth.currentUser

    useEffect(() => {
        const unsubscribe = () => {
            if (currentUser && article) {
                db.collection('users').doc(article.userId).collection('follower').doc(currentUser.uid).get()
                    .then((doc) => {
                        setHasFollow(doc.exists);
                    });
            }
        }
        unsubscribe()
    }, [article, currentUser])

    const followAuthor = () => {
        if (article) {
            if (!hasFollow && auth.currentUser) {
                var uid = auth.currentUser.uid

                db.collection('users').doc(uid).collection('following').doc(article.userId).set({
                    uid: article.userId,
                    photoURL: article.authorPhotoURL,
                    displayName: article.authorName
                })

                db.collection('users').doc(article.userId).collection('follower').doc(uid).set({
                    uid: auth.currentUser.uid,
                    photoURL: auth.currentUser.photoURL,
                    displayName: auth.currentUser.displayName

                })
                setHasFollow(true);
            }
        }
    }

    const unFollowAuthor = () => {
        if (article) {
            if (hasFollow) {
                db.collection('users').doc(article.userId).collection('follower').doc(auth.currentUser.uid).delete()
                db.collection('users').doc(auth.currentUser.uid).collection('following').doc(article.userId).delete()
                setHasFollow(false);
            }
        }
    }

    return (
        <div className="layout6">
            <div className="sellers-data">
                <div className="postedBy">Posted by</div>
                <div className="users-data">
                    <div className="images-data"> <img src={article?.authorPhotoURL ? article.authorPhotoURL : "/images/user.png"} alt={article?.authorName} /></div>
                    <div className="author-name">{article?.authorName}</div>
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

export default ArticleAuthor
