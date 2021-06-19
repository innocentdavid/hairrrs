import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../firebase'

function CoverPics({ user }) {
  const [coverPhotoURLPrevw, setCoverPhotoURLPrevw] = useState(null)
  const [coverPhotoURL, setCoverPhotoURL] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setCoverPhotoURLPrevw(user.coverPhotoURL)
    }
  }, [user])

  const handleUpdatePics = () => {
    setUpdating(true)
    if (user) {
      const uploadTask = storage.ref(`images/${coverPhotoURL.name}`).put(coverPhotoURL);
      uploadTask.on("state_change", (snapshot) => {
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // console.log(progress);
      },
        (error) => {
          console.log(error);
        },
        () => {
          storage.ref('images').child(coverPhotoURL.name).getDownloadURL()
            .then(url => {
              db.collection('users').doc(user.uid).update({ coverPhotoURL: url })    
              setCoverPhotoURL(null)   
              setUpdating(false)
            });
        }
      );
    }
  }

  return (
    <>
      <input
        onChange={(e) => {
          setCoverPhotoURL(e.target.files[0])
          setCoverPhotoURLPrevw(URL.createObjectURL(e.target.files[0]))
        }}
        type="file" id="chooseCoverPics" hidden />
      <label htmlFor="chooseCoverPics" style={{ cursor: 'pointer' }}>
        <div className="cover">
          <img id="coverPics" src={coverPhotoURLPrevw} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </label>
      <div className="d-flex align-items-center">
        <span className='txt' style={{ marginRight: '10px' }}>Cover picture</span>
        {coverPhotoURL && <button onClick={handleUpdatePics}>update</button>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>
    </>
  )
}

export default CoverPics
