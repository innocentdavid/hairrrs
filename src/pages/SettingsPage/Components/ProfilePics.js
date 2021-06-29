import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../../firebase'

function ProfilePics({ user }) {
  const [photoURLPrevw, setPhotoURLPrevw] = useState(null)
  const [photoURL, setPhotoURL] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setPhotoURLPrevw(user.photoURL)
    }
  }, [user])

  const handleUpdatePics = () => {
    setUpdating(true)
    if (user) {
      const uploadTask = storage.ref(`images/${photoURL.name}`).put(photoURL);
      uploadTask.on("state_change", (snapshot) => {
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // console.log(progress);
      },
        (error) => {
          console.log(error.message);
        },
        () => {
          storage.ref('images').child(photoURL.name).getDownloadURL()
            .then(url => {
              db.collection('users').doc(user.uid).update({ photoURL: url })
              auth.currentUser.updateProfile({ 
                photoURL: url
              })
              // photoURL.replace(url)
              setPhotoURL(false)
              setUpdating(false)
            });
        }
      );
    }
  }

  return (
    <div className="display-picture">
      <input
        onChange={(e) => {
          setPhotoURLPrevw(URL.createObjectURL(e.target.files[0]))
          setPhotoURL(e.target.files[0]);
        }}
        type="file" id="chooseProfilePics" hidden />
      <label htmlFor="chooseProfilePics" style={{ cursor: 'pointer' }}>
        <div className="d-photo">
          <img id="profilePics" src={photoURLPrevw} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>
      </label>
      <div className="d-flex align-items-center">
        <span className='txt' style={{ marginRight: '10px' }}>Profile picture</span>
        {photoURL && <button onClick={handleUpdatePics}>Update profile picture</button>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>
    </div>
  )
}

export default ProfilePics
