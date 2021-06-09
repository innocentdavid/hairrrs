import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import firebase from 'firebase';
import Reactions from './Reactions';
import RepliesReactions from './RepliesReactions';

function ArticleCommentReplies({ articleId, commentId, totalReplies }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false)

    // Get all Replies and total Replies
    useEffect(() => {
        if (showReplies) {
            if (articleId) {
                const repliesRef = db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('replies');
                const query = repliesRef.orderBy('createdAt', 'desc');
                query.onSnapshot((snapshot) => {
                    let r = snapshot.docs.map((doc) => ({ replyId: doc.id, reply: doc.data() }))
                    setReplies(r);
                });

            }
        }
        return () => { setReplies([]) }
    }, [articleId, commentId, showReplies]);

    const replyComment = () => {
        if (auth.currentUser?.displayName) {
            if (newReply !== '') {
                db.collection('articles').doc(articleId).collection('comments').doc(`${commentId}`).collection('replies').add({
                    reply: newReply,
                    totalReplies: totalReplies + 1,
                    userName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                db.collection('articles').doc(articleId).collection('comments').doc(`${commentId}`).update({
                    totalReplies: totalReplies + 1
                });
            }
        } else {
            alert('sorry you have to login')
        }
        setReply('');
    }

    return (
        <>
            <div className="replies-data-js d-flex align-center">
                {commentId && <Reactions articleId={articleId} commentId={commentId} colctn={'comments'} />}
                <span className="rxt" onClick={() => { setShowReplies(!showReplies) }}>
                    Replies <span>{totalReplies}</span> {showReplies ? <span className="fa fa-angle-up"></span> : <span className="fa fa-angle-down"></span>}
                </span>
                <span className="reportBtn">
                    <img src="/images/Group 1192.svg" alt="elipsis hairrrs" />
                    <div className="elipsis--info-reply">
                        <ul>
                            <li>Report</li>
                        </ul>
                    </div>
                </span>
            </div>
            {showReplies &&
                <>
                    {replies.map(({ replyId, reply }) => (
                        <div key={replyId} className="replies--user">
                            <div className="img-comment-replies">
                                <div className="user-data">
                                    <img key={replyId} className="c-photo" src={reply.photoURL ? reply.photoURL : '/images/default-user.png'} alt="" />
                                </div>
                                <div className="post--details">
                                    <div className="username">{reply.userName}</div>
                                    <comment key={replyId}>{reply.reply}</comment>
                                </div>
                            </div>
                            <div className="replies-data-js d-flex align-center">
                                <RepliesReactions articleId={articleId} commentId={commentId} replyId={replyId} />
                                <span className="reportBtn">
                                    <img src="/images/Group 1192.svg" alt="elipsis hairrrs" />
                                    <div className="elipsis--info-reply">
                                        <ul>
                                            <li>Report</li>
                                        </ul>
                                    </div>
                                </span>
                            </div>
                        </div>
                    ))}

                    <div> <br />
                        <span className="c" onClick={() => { setShowReplies(!showReplies) }}>see less</span> &nbsp;&nbsp;&nbsp;
                        <span className="c">see more</span>
                    </div>

                    <div className="reply-box">
                        <img className="user-photo" src={auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/images/default-user.png'} alt={auth.currentUser?.displayName} />
                        <form action="comment" method="POST" onSubmit={(e) => { e.preventDefault(); replyComment() }} >
                            <div className="holder-accord">
                                <textarea onChange={(e) => { setReply(e.target.value) }} value={newReply} type="text" name="reply" placeholder="write reply" className="comment-textarea"></textarea>
                                <div className="submit-content-cont">
                                    {newReply &&
                                        <button className="submit-content">
                                            {auth.currentUser ? <img src="/images/Group 1188.svg" alt="send icon" /> : <i className="fa fa-times"></i>}
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default ArticleCommentReplies
