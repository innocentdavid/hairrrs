import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../firebase';
import firebase from "firebase";
import ArticleCommentReplies from './ArticleCommentReplies';

function ArticleComments({ articleId, totalComments, articleUid }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [limit, setLimit] = useState(5);


    // Get all comments and total Comments
    useEffect(() => {
        const unsubscribe = () => {
            if (articleId) {
                db.collection('articles').doc(articleId).collection('comments')
                    .orderBy('createdAt', 'desc')
                    .limit(limit)
                    .onSnapshot((snapshot) => {
                        let r = (snapshot.docs.map((doc) => ({ commentId: doc.id, comment: doc.data() })))
                        setComments(r);
                    })
            }
        }
        unsubscribe()
    }, [articleId, limit]);

    const addComment = () => {
        if (auth.currentUser) {
            if (comment !== '') {
                db.collection('articles').doc(articleId).collection('comments')
                    .add({
                        id: articleId,
                        comment,
                        totalReplies: 0,
                        userName: auth.currentUser.displayName,
                        userId: auth.currentUser.uid,
                        photoUrl: auth.currentUser.photoURL ? auth.currentUser.photoURL : '/images/default-user.png',
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                db.collection('articles').doc(articleId).update({
                    totalComments: totalComments + 1
                });
            }
        } else {
            alert('sorry you have to login')
        }
        setComment('');
    }

    const [authUserPhotoURL, setAuthUserPhotoURL] = useState('/images/default-user.png');
    const currentUser = auth.currentUser
    useEffect(() => {
        if (currentUser.photoURL) {
            setAuthUserPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])

    return (
        <>
            <div className="comment-box">
                {authUserPhotoURL && <img className="user-photo" src={authUserPhotoURL} alt="user-profile-pics - Hairrrs" />}
                <form action="comment" method="POST" onSubmit={(e) => { e.preventDefault(); addComment() }} >
                    <div className="holder-accord">
                        <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} type="text" name="reply" placeholder="write reply" className="comment-textarea"></textarea>
                        <div className="submit-content-cont">
                            <button className="submit-content">
                                {auth.currentUser ? <img src="/images/Group 1188.svg" alt="send icon" /> : <i class="fa fa-times"></i>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="holder">
                <div className="comments-numb">
                    <span>{totalComments} comments</span>
                </div>

                {comments.map(({ commentId, comment }) => (
                    <div key={commentId} className="comments-post">
                        <div key={commentId} className="img-comment">
                            <div className="user-data">
                                <img key={commentId} className="c-photo" src={comment.photoUrl ? comment.photoUrl : '/images/default-user.png'} alt="" />
                            </div>
                            <div className="post--" style={{ marginLeft: '20px' }}>
                                <div className="username">{comment.userName}</div>
                                <p className="comment">{comment.comment}</p>
                            </div>
                        </div>

                        <div className="replies-data show_replies">
                            <ArticleCommentReplies
                                key={commentId}
                                commentText={comment.comment}
                                commentUserId={comment.userId}
                                totalReplies={comment.totalReplies}
                                articleId={articleId}
                                commentId={commentId} />
                        </div>
                    </div>
                ))}
                <div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {totalComments > limit && <span style={{ marginRight: '10px' }} onClick={() => { setLimit(parseInt(limit) + 5) }} className="c">see older messages</span>}
                        {limit > 5 && <span style={{ marginRight: '10px' }} onClick={() => { setLimit(5) }} className="c">see less</span>}
                        <span>Comments {totalComments}</span>
                    </div>
                </div>
            </div>

        </>

    )
}

export default ArticleComments
