import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import firebase from 'firebase';
import Reactions from './Reactions';
import RepliesReactions from './RepliesReactions';
import ReportBoard from '../../../../components/ReportBoard';
import Modify from '../Modify';

function ArticleCommentReplies({ articleId, commentId, totalReplies, commentUserId, commentText }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false)
    const initialLimit = 3;
    const [limit, setLimit] = useState(initialLimit);

    // Get all Replies and total Replies
    useEffect(() => {
        if (showReplies) {
            if (articleId) {
                db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('replies')
                    .orderBy('createdAt', 'desc')
                    .limit(limit)
                    .onSnapshot((snapshot) => {
                        let r = snapshot.docs.map((doc) => ({ replyId: doc.id, reply: doc.data() }))
                        setReplies(r);
                    });

            }
        }
        return () => { setReplies([]) }
    }, [articleId, commentId, limit, showReplies]);

    const replyComment = () => {
        if (auth.currentUser?.displayName) {
            if (newReply !== '') {
                db.collection('articles').doc(articleId).collection('comments').doc(`${commentId}`).collection('replies').add({
                    reply: newReply,
                    totalReplies: totalReplies + 1,
                    userName: auth.currentUser.displayName,
                    userId: auth.currentUser.uid,
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

    const [elipsisInfoComment, setElipsisInfoComment] = useState(false)
    const [showReportBoard, setShowReportBoard] = useState(false)

    // const [replyUserId, setReplyUserId] = useState('')
    // const [text, setText] = useState('')
    // useEffect(() => {
    //     if (replies) {
    //         setText(replies.map(({ reply }) => reply.reply))
    //         setReplyUserId(replies.map(({ reply }) => reply.userId))
    //     }
    // }, [replies]);

    return (
        <>
            {showReportBoard && <ReportBoard
                type="comment"
                id={commentId}
                setShowReportBoard={setShowReportBoard}
            />}
            <div className="replies-data-js d-flex align-center">
                {commentId && <Reactions articleId={articleId} commentId={commentId} colctn={'comments'} />}

                <span className="rxt" onClick={() => { setShowReplies(!showReplies) }} style={{ display: 'flex', alignItems: 'center' }}>
                    Replies <span style={{ marginLeft: 5 }}>{totalReplies}</span>
                    {showReplies ? <span className="fa fa-angle-up" style={{ fontSize: '1.2rem', marginLeft: 5 }}></span> : <span className="fa fa-angle-down" style={{ fontSize: '1.2rem', marginLeft: 5 }}></span>}
                </span>

                <span className="reportBtn" id={`${commentId}_reported`}>
                    <img src="/images/Group 1192.svg" alt="elipsis icon" onClick={() => { setElipsisInfoComment(!elipsisInfoComment) }} />
                    {elipsisInfoComment &&
                        <div className="elipsis--info-comment">
                            <ul style={{ display: 'flex' }}>
                                {auth.currentUser.uid !== commentUserId &&
                                <li style={{ margin: '5px' }} onClick={() => { setShowReportBoard(true) }}>Report</li>}
                                <Modify
                                    modal={setElipsisInfoComment}
                                    type={'comment'}
                                    articleId={articleId}
                                    itemId={commentId}
                                    itemUserId={commentUserId}
                                    text={commentText} />
                            </ul>
                        </div>
                    }
                </span>
            </div>
            {showReplies &&
                <>
                    {replies ? replies.map(({ replyId, reply }) => (
                        <div key={replyId} className="replies--user">
                            <div className="img-comment-replies">
                                <div className="user-data">
                                    <img key={replyId} className="c-photo" src={reply.photoURL ? reply.photoURL : '/images/default-user.png'} alt="" />
                                </div>
                                <div className="post--details">
                                    <div className="username">{reply.userName}</div>
                                    <comment key={replyId}>{reply.reply ? reply.reply : 'Loading ...'}</comment>
                                </div>
                            </div>
                            <div className="replies-data-js d-flex align-center">
                                <RepliesReactions
                                    articleId={articleId}
                                    commentId={commentId}
                                    replyId={replyId}
                                    replyUserId={reply.userId}
                                    reply={reply.reply} />
                            </div>
                        </div>
                    )) : <strong>Loading ...</strong>}

                    <div> <br />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {totalReplies > limit && <span style={{ marginRight: '10px' }} onClick={() => { setLimit(parseInt(limit) + 5) }} className="c">see older replies</span>}
                            <span style={{ marginRight: '10px' }} onClick={() => { setLimit(initialLimit); setShowReplies(!showReplies) }} className="c"><i className="fa fa-angle-up" style={{ fontSize: '1.2rem' }}></i></span>
                            <span>Replies {totalReplies}</span>
                        </div>
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
