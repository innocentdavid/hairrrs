import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase';
import firebase from 'firebase';
import ReportBoard from '../../../../components/ReportBoard';
import Modify from '../Modify';
import UserProfile from '../../../../components/UserProfile/UserProfile';

function RepliesReactions({ articleId, commentId, replyId, replyUserId, reply }) {
    const user = UserProfile.getUser()
    const [likedReply, setLikedReply] = useState(false);
    const [disLikedReply, setDisLikedReply] = useState(false);

    // check if current user has likedReply or unlike this comment
    useEffect(() => {
        function isCuserLikedOrDisLiked(collection, stateToUpdate) {
            db.collection('articles').doc(articleId).collection('comments')
            .doc(commentId).collection('replies').doc(replyId)
            .collection(collection).doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    stateToUpdate(true);
                }
            });
        }

        if (articleId && user) {
            isCuserLikedOrDisLiked('likes', setLikedReply);
            isCuserLikedOrDisLiked('disLikes', setDisLikedReply);
        }
    }, [articleId, commentId, replyId, user])

    function getTotalCommentReplyReactions(reaction) {
        db.collection('articles').doc(articleId).collection('comments')
        .doc(commentId).collection('replies').doc(replyId)
        .collection(reaction).onSnapshot((snapshot) => {
            const result = snapshot.docs.map(doc => doc.data()).length;
            const div = document.querySelector(`#${reaction}_${replyId}`);
            if (div) { div.textContent = result }
        })
    }

    const likeReply = () => {
        if (user) {
            const uid = user.uid
            if (disLikedReply) {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('disLikes').doc(uid).delete();
                setDisLikedReply(false)
            }
            if (likedReply) {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('likes').doc(uid).delete();
                setLikedReply(false)
            } else {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('likes').doc(uid).set({
                    userName: user.displayName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                setLikedReply(true)
            }
        } else {
            alert('sorry you have to login')
        }
    }

    const disLikeReply = () => {
        if (user) {
            const uid = user.uid
            if (likedReply) {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('likes').doc(uid).delete();
                setLikedReply(false)
            }
            if (disLikedReply) {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('disLikes').doc(uid).delete();
                setDisLikedReply(false)
            } else {
                db.collection('articles').doc(articleId).collection('comments')
                .doc(commentId).collection('replies').doc(replyId)
                .collection('disLikes').doc(uid).set({ userName: user.displayName, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                setDisLikedReply(true)
            }
        } else {
            alert('sorry you have to login')
        }
    }

    const [elipsisInfoComment, setElipsisInfoComment] = useState(false)
    const [showReportBoard, setShowReportBoard] = useState(false)

    return (
        <div className="replies-data-js d-flex align-center">
            {showReportBoard && <ReportBoard
                type="reply"
                id={replyId}
                setShowReportBoard={setShowReportBoard}
            />}
            <>
                <div className="rxt" onClick={() => { likeReply() }}>
                    Likes <span key={`likes_${replyId}`} id={`likes_${replyId}`}>{getTotalCommentReplyReactions('likes')}</span>
                    <div className={`underLine_${likedReply}`}></div>
                </div>

                <div className="rxt" onClick={() => { disLikeReply() }}>
                    Dislikes <span key={`disLikes_${replyId}`} id={`disLikes_${replyId}`}>{getTotalCommentReplyReactions('disLikes')}</span>
                    <div className={`underLine_${disLikedReply}`}></div>
                </div>
            </>
            <span className="reportBtn" id={`${replyId}_reported`}>
                <img src="/images/Group 1192.svg" alt="elipsis icon" onClick={() => { setElipsisInfoComment(!elipsisInfoComment) }} />
                {elipsisInfoComment &&
                    <div className="elipsis--info-comment">
                        <ul style={{ display: 'flex' }}>
                        {user.uid !== replyUserId &&
                            <li style={{ margin: '5px' }} onClick={() => { setShowReportBoard(true) }}>Report</li>}
                            <Modify
                            modal={setElipsisInfoComment}
                                type={'reply'}
                                articleId={articleId}
                                itemId={replyId}
                                commentId={commentId}
                                itemUserId={replyUserId}
                                text={reply} />
                        </ul>
                    </div>
                }
            </span>
        </div>


    )
}

export default RepliesReactions
