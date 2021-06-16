import React, { useEffect } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'

function History({ user, event, location }) {
  useEffect(() => {
    var data = {
      event,
      location,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    db.collection('users').doc(user.uid).collection('history').doc().set(data)
  }, [event, location, user])

  return (
    <div>
      
    </div>
  )
}

export default History
