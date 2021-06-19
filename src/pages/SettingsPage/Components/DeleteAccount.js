import React from 'react'
import { auth, db } from '../../../firebase'
import firebase from 'firebase'

function DeleteAccount({ user }) {
  const deleteAccount = async () => {
    if (auth.currentUser) {
        if (window.confirm('Are you sure?')) {
            db.collection('reqToDelAcc').doc(auth.currentUser?.uid).set({
                uid: auth.currentUser?.uid,
                email: auth.currentUser?.email,
                phoneNumber: auth.currentUser?.phoneNumber,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            db.collection('users').doc(auth.currentUser?.uid).update({ requestedDeleteAcc: true })
        }
    } else { alert('You can\'t delete an account you don\'t have') }
}

const cancilRequestedDeleteAcc = () => {
    db.collection('users').doc(auth.currentUser?.uid).update({ requestedDeleteAcc: false })
}

  return (

    <>
      <h2>Delete account</h2>
      <p>Account will be deactivated and <span>deleted after 10days</span> if delete request is not cancelled.</p>
      <p><span>Note:all account informations will be lost after account is deleted</span></p>
      <div className="margins-top" style={{ marginTop: '-40px' }} />
      <div className="requestdoc">
        {!user?.requestedDeleteAcc ?
          <button onClick={deleteAccount}>Request delete</button> :
          <div className="d-flex align-items-center">
            <span style={{ color: 'red', marginRight: '10px' }}>Your request is under process</span>
            <button className="btnSolid" style={{ cursor: 'pointer' }} onClick={cancilRequestedDeleteAcc}>Cancil</button>
          </div>
        }
      </div>
    </>
  )
}

export default DeleteAccount
