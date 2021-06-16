import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import UserProfile from './UserProfile'
import { formatAMPM } from '../fuctions'

function Chat({ toggle, userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user && userId)
      db.collection('users').doc(userId)
        .onSnapshot((doc) => {
          setUser(doc.data());
        });
  }, [user, userId]);

  const currentUser = UserProfile.getUser()
  // const currentUser = auth.currentUser

  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (currentUser && user) {
      let chatRef = db.collection('chats').doc(currentUser.uid).collection(user.uid)
        .orderBy('createdAt', 'desc');
      chatRef.onSnapshot((querySnapshot) => {
        var msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(({ message: doc.data(), id: doc.id }));
        });
        if (msgs) { setMessages(msgs) }
      });
    }
  }, [currentUser, user])

  const [newMessage, setNewMessage] = useState('')
  const addChat = (type) => {
    if (currentUser && user) {
      var msg = newMessage;
      if (type !== 'text') {
        // store file and return the download link
        msg = 'download link'
      }
      var data = {
        type,
        senderId: currentUser.uid,
        receiverId: user.uid,
        message: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }


      // db.collection('chats').doc(`${currentUser.uid}_${user.uid}`).set(data)

      db.collection('chats').doc(currentUser.uid).collection(user.uid).doc().set(data)

      db.collection('chats').doc(user.uid).collection(currentUser.uid).doc().set(data)

      let userHistoryRef = db.collection('users').doc(user.uid).collection('history').doc(currentUser.uid);
      userHistoryRef.get().then(doc => {
        if (!doc.exists) {
          userHistoryRef.set({
            text: `You have new message from ${currentUser.displayName}`,
            msgCount: 1,
            type: 'message',
            seen: false,
            receiverId: currentUser.uid,
            userName: currentUser.displayName,
            userPhotoURL: currentUser.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        } else {
          userHistoryRef.update({ msgCount: firebase.firestore.FieldValue.increment(+1) })
        }
      })

      setNewMessage('')
    }
  }

  // const [usersInChat, setUsersInChat] = useState([])

  // if (currentUser && user) {
  //   setUsersInChat([...usersInChat, currentUser])
  //   if (auth.currentUser.uid === user.uid) {
  //     setUsersInChat([...usersInChat, user])
  //   }
  // }

  // if(usersInChat){
  //   console.log(usersInChat)
  // }



  return (
    <div id="chatPage">
      <div className="chat">
        <div className="chatHeader">
          <div className="userInfo">
            <div className="backbtn" onClick={() => { toggle(false) }}>❮</div>
            <div className="img">
              <img src={user?.photoURL} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="username">{user?.displayName}</div>
          </div>
          <div className="options">
            <img src="images/Group 1192.svg" alt="elipsis" />
          </div>
        </div>
        <div className="search">
          <form action>
            <div className="searchBtn">
              <img src="images/search.png" alt="" />
            </div>
            <div className="input">
              <input type="text" placeholder="Search in chat" style={{ padding: '5px' }} />
            </div>
          </form>
        </div>
        <div className="chatS">
          {/* get the time of the last message */}
          {/* <div className="lastSeen">Today</div> */}
          <br />

          {messages.map(({ id, message }) => (
            <div key={id} className={message.senderId === currentUser.uid ? 'chat_msg You' : 'chat_msg User'}>
              <p>{message.message}</p>
              <div className="time">{formatAMPM(message.createdAt)}</div>
            </div>
          ))}
        </div>
        <div className="chatBoard">
          <div className="gallery">
            <img src="images/Icon feather-image.svg" alt="" />
          </div>
          <div className="voicerecord">
            <img src="images/Icon-mic.svg" alt="" />
          </div>
          <div className="textarea">
            <input
              value={newMessage}
              onChange={(e) => { setNewMessage(e.target.value) }}
              type="text" placeholder="write message" />
          </div>
          {newMessage ?
            <div className="sendBtn" onClick={() => { addChat('text') }}>
              <img src="images/Icon-send.svg" alt="" />
            </div>
            : <div className="sendBtn">
              <img src="images/Icon-send.svg" alt="" style={{ transform: "scale(.3)" }} />
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Chat
