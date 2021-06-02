import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../firebase';
import firebase from "firebase";
import ArticleCommentReplies from './ArticleCommentReplies';

function ArticleComments({ articleId }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [totalComments, setTotalComments] = useState(0);


    // Get all comments and total Comments
    useEffect(() => {
        const unsubscribe = () => {
            if (articleId) {
                db.collection('articles').doc(articleId).collection('comments').orderBy('createdAt', 'desc').get()
                .then(data => {
                    let r = (data.docs.map(doc => ({ commentId: doc.id, comment: doc.data() })))
                    setComments(r);
                    setTotalComments(r.length);
                }).catch(e => console.log(`setComments and totalcoments error`, e))
                // .onSnapshot((snapshot) => {
                //     let r = (snapshot.docs.map((doc) => ({ commentId: doc.id, comment: doc.data() })))
                //     setComments(r);
                //     setTotalComments(r.length);
                // })
            }
        }
        unsubscribe()
    }, [articleId]);

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

    return (
        <>
            <div className="comment-box">
                <img className="user-photo" src={auth.currentUser ? auth.currentUser.photoURL : '/images/default-user.png'} alt={auth.currentUser?.displayName} />
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
                            <div className="post--">
                                <div className="username">{comment.userName}</div>
                                <p className="comment">{comment.comment}</p>
                            </div>
                        </div>

                        <div className="replies-data show_replies">
                            <ArticleCommentReplies key={commentId} totalReplies={comment.totalReplies} articleId={articleId} commentId={commentId} />
                        </div>
                    </div>
                ))}
                <div>
                    <br />
                    <span className="c">see more</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>Comments {totalComments}</span>
                </div>
            </div>

        </>

    )
}

export default ArticleComments
