import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../../firebase'
import { resizeSingleImage, UrlSlug } from '../../../fuctions'

function CoverPics({ user }) {
  const [coverPhotoURLPrevw, setCoverPhotoURLPrevw] = useState(null)
  const [coverPhotoURL, setCoverPhotoURL] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setCoverPhotoURLPrevw(user.coverPhotoURL)
    }
  }, [user])

  const handleUploadImage = () => {
    resizeSingleImage(handleUpdatePics, coverPhotoURL, 300, 'max');
  }

  const handleUpdatePics = (imageFile, fileNameRef, type) => {
    var fileName = UrlSlug(fileNameRef, 'encode')
    var storageRef = `images/${auth?.currentUser?.uid}_${type}/${fileName}`;
    if(fileName){
      var file = new File([imageFile], fileName, { type: "image/png" });
      if (user && storageRef) {
        setUpdating(true)
        const uploadTask = storage.ref(storageRef).put(file);
        uploadTask.on("state_change", (snapshot) => {
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // console.log(progress);
        },
          (error) => {
            console.log(error);
          },
          () => {
            storage.ref(storageRef).getDownloadURL()
              .then(url => {
                db.collection('users').doc(user?.uid).update({ coverPhotoURL: url })    
                setCoverPhotoURL(null)   
                setUpdating(false)
              });
          }
        );
      }
    }
  }

  return (
    <>
      <input
        onChange={(e) => {
          setCoverPhotoURLPrevw(URL.createObjectURL(e.target.files[0]))
          setCoverPhotoURL(e.target.files[0])
        }}
        type="file" id="chooseCoverPics" hidden />
      <label htmlFor="chooseCoverPics" style={{ cursor: 'pointer' }}>
        <div className="cover">
          <img id="coverPics" src={coverPhotoURLPrevw} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </label>
      <div className="d-flex align-items-center">
        <span className='txt' style={{ marginRight: '10px' }}>Cover picture</span>
        {coverPhotoURL && <button onClick={handleUploadImage}>update</button>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>
    </>
  )
}

export default CoverPics
