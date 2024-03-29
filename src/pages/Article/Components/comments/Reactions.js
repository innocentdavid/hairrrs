import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase';
import firebase from 'firebase';
import UserProfile from '../../../../components/UserProfile/UserProfile';

function Reactions({ articleId, commentId, colctn }) {
    const user = UserProfile.getUser()
    const [liked, setLiked] = useState(false);
    const [disLiked, setDisLiked] = useState(false);

    // check if current user has liked or unlike this comment
    useEffect(() => {
        function isCuserLikedOrDisLiked(colctn, stateToUpdate) {
            db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection(colctn).doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    stateToUpdate(true);
                }
            });
        }

        if (articleId && user) {
            isCuserLikedOrDisLiked('likes', setLiked);
            isCuserLikedOrDisLiked('disLikes', setDisLiked);
        }
    }, [articleId, commentId, user])


    function getTotalCommentReactions(reaction) {
        if (reaction && articleId && commentId && colctn) {
            db.collection('articles').doc(articleId).collection(colctn).doc(commentId).collection(reaction)
            .onSnapshot(snapshot => {
                const result = (snapshot.docs.map(doc => doc.data())).length;
                const div = document.querySelector(`#${reaction}_${commentId}`);
                if (div) { div.textContent = result }
            })
        }
    }

    const like = () => {
        if (articleId && commentId && user) {
            const uid = user?.uid
            if (uid) {
                if (disLiked) {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('disLikes').doc(uid).delete();
                    setDisLiked(false)
                }
                if (liked) {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('likes').doc(uid).delete();
                    setLiked(false)
                } else {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('likes').doc(uid).set({ userName: user.displayName, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                    setLiked(true)
                }
            } else {
                alert('sorry you have to login')
            }
        } else {
            alert('sorry you have to login')
        }
    }

    const disLike = () => {
        if (articleId && commentId && user) {
            const uid = user.uid
            if (uid) {
                if (liked) {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('likes').doc(uid).delete();
                    setLiked(false)
                }
                if (disLiked) {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('disLikes').doc(uid).delete();
                    setDisLiked(false)
                } else {
                    db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('disLikes').doc(uid).set({ userName: user.displayName, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                    setDisLiked(true)
                }
            } else {
                alert('sorry you have to login')
            }
        } else {
            alert('sorry you have to login')
        }
    }

    return (
        <>
        {commentId && 
            <>
            <div className="rxt" onClick={() => { like() }}>
                Likes <span key={`likes_${commentId}`} id={`likes_${commentId}`}>{getTotalCommentReactions('likes')}</span>
                <div className={`underLine_${liked}`}></div>
            </div>
            <div className="rxt" onClick={() => { disLike() }}>
                Dislikes <span key={`disLikes_${commentId}`} id={`disLikes_${commentId}`}>{getTotalCommentReactions('disLikes')}</span>
                <div className={`underLine_${disLiked}`}></div>
            </div>
            </>
}
        </>
    )
}

export default Reactions
