import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase'
import firebase from 'firebase'
// import { confirm } from "../components/Confirmation";

function Modify({ modal, type, articleId, commentId, itemId, itemUserId, text }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editedtext, setEditedtext] = useState('');
    useEffect(() => {
        setEditedtext(text)
    }, [text]);


    const handleDelete = async () => {
        if (await window.confirm("Are your sure?")) {
            if (type === 'comment') {
                db.collection('articles').doc(articleId).collection('comments').doc(itemId).delete()
            }
            if (type === 'reply') {
                db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('replies').doc(itemId).delete()
                db.collection('articles').doc(articleId).collection('comments').doc(commentId).update({ totalReplies: firebase.firestore.FieldValue.increment(-1) })
            }
            modal(false)
        }
        modal(false)
    }

    const handleEdit = () => {
        if (editedtext) {
            if (type === 'comment') {
                db.collection('articles').doc(articleId).collection('comments').doc(itemId).update({ comment: editedtext })
            }
            if (type === 'reply') {
                db.collection('articles').doc(articleId).collection('comments').doc(commentId).collection('replies').doc(itemId).update({ reply: editedtext })
            }
            setOpenEditModal(false)
            modal(false)
        }
    }

    return (<> {itemUserId === auth.currentUser.uid &&
        <div style={{ display: 'flex' }}>
            <li
                onClick={() => { setOpenEditModal(true) }}
                style={{ margin: '5px' }}>Edit</li>
            <li
                onClick={handleDelete}
                style={{ margin: '5px' }}>Delete</li>
        </div>}

        {/* edit item */}
        {openEditModal && <> <div
            onClick={() => { setOpenEditModal(false) }}
            className="outsideCloset"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                cursor: 'not-allowed'
            }}></div>

            <div
                className="editModal"
                style={{
                    position: 'fixed',
                    height: '40vh',
                    width: '40%',
                    top: '30vh',
                    left: '30%',
                    background: '#e0e0e0d9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div style={{
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '150px',
                            margin: '30px auto',
                            marginBottom: '10px',
                            display: 'block',
                            border: 'none',
                            padding: '10px',
                        }}
                        value={editedtext}
                        onChange={(e) => { setEditedtext(e.target.value) }}
                    ></textarea>

                    <div>
                        {editedtext ? <button onClick={handleEdit}>submit</button>
                            : <button className="disabledBtn">submit</button>}
                        <button className="btnSolid" onClick={() => { setOpenEditModal(false) }}>cancel</button>
                    </div>
                </div>
            </div>
        </>}
    </>)
}

export default Modify
