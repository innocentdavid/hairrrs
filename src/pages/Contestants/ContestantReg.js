import React from 'react'
import { useState } from 'react'
import UserProfile from '../../components/UserProfile/UserProfile'
import { db, storage } from '../../firebase'
import { UrlSlug } from '../../fuctions'

function ContestantReg() {
  const user = UserProfile.getUser()

  const [photoUrl, setPhotoUrl] = useState('')
  const [photoError, setPhotoError] = useState(false)
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [naturalHairColor, setNaturalHairColor] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [linkInstagram, setLinkInstagram] = useState(false)
  const [instagram, setInstagram] = useState('instagram.com/')
  const [voteCount] = useState(0)

  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')


  const handlePhotoUpload = (imageFile) => {
    var fileName = UrlSlug(imageFile?.name, 'encode')
    var storageRef = `images/contestants/${fileName}_${user?.uid}`;

    if (fileName) {
      var file = new File([imageFile], fileName, { type: "image/png" });

      if (user && storageRef) {
        setLoading(true)
        const uploadTask = storage.ref(storageRef).put(file);
        uploadTask.on("state_change", (snapshot) => {
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // console.log(progress);
        },
          (error) => {
            console.log(error.message);
          },
          () => {
            storage.ref(storageRef).getDownloadURL()
              .then(async (url) => {
                let instagramAccountLink = linkInstagram ? instagram : '';
                let data = {
                  photoUrl: url, name, gender, age, naturalHairColor, hobbies, country, state, linkInstagram, instagramAccountLink, voteCount, uid: user?.uid, userName: user?.userName
                }
                console.log(data)
                await db.collection('contestants').doc(user?.uid).set(data)
                window.location = '/contestant'
                setLoading(false)
              });
          }
        );
      }
    }
    return 'success'
  }


  const handleRegister = async (e) => {
    e.preventDefault();
    let photoUpload = await handlePhotoUpload(photoUrl)
    console.log(photoUpload)
  }

  return (
    <div className="layout2" style={{ paddingBottom: 50 }}>

      {loading && <div className="loader" style={{ display: 'grid' }}>
        <img src="/images/loading.svg" alt="" />
      </div>}


      <div className="AD-space">ads</div>
      <div className="dialogue" style={{ marginTop: 50, boxShadow: '0px 10px 70px 0.1px #f2f2f2' }}>
        <h4>Register for Face of Hairrrs 2021</h4>
        <div className="according-000" style={{ paddingTop: 30 }}>

          <form onSubmit={(e) => { handleRegister(e) }} id="contestanRegForm">
            <div className="infos">
              <div className="add-p" style={{ height: 100, width: 100 }}>
                {previewImage && <img src={previewImage} id="addP" width="100%" height="100%" alt="" srcset="" />}
              </div>

              <label className="uploadBtnWrap" htmlFor="thefile">
                <input
                  onChange={(e) => {
                    setPhotoError(false)
                    let file = e.target.files[0]
                    setPreviewImage(URL.createObjectURL(file))
                    setPhotoUrl(file);
                  }}
                  type="file" id="thefile" style={{ opacity: 0 }} required />
                <h2 style={{ color: '#f40053' }}>Upload image</h2>
              </label>
            </div>
            {photoError && <div style={{ color: 'red' }}>You have not selected any photoUrl</div>}

            <div className="add-title">
              <input
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                type="text" placeholder="Full name" required />
            </div>

            <div className="selection">
              <div className="selector">
                <input
                  value={gender}
                  onChange={(e) => { setGender(e.target.value) }}
                  type="text" placeholder="Gender" required />
                <div id="selecticon">{'❮'}</div>
              </div>
            </div>

            <div className="add-title">
              <input
                value={age}
                onChange={(e) => { setAge(e.target.value) }}
                type="number" placeholder="Age" required />
            </div>

            <div className="selection">
              <div className="selector">
                <input
                  value={naturalHairColor}
                  onChange={(e) => { setNaturalHairColor(e.target.value) }}
                  type="text" placeholder="Natural hair color" required />
                <div id="selecticon">❮</div>
              </div>
            </div>

            <div className="Details">
              <textarea
                value={hobbies}
                onChange={(e) => { setHobbies(e.target.value) }}
                className="form-control"
                type="text" placeholder="Hobbies" defaultValue={""} required />
            </div>

            <div className="selection">
              <div className="selector">
                <input
                  value={country}
                  onChange={(e) => { setCountry(e.target.value) }}
                  type="text" placeholder="Country" required />
                <div id="selecticon">{'❮'}</div>
              </div>
            </div>

            <div className="selection">
              <div className="selector">
                <input
                  value={state}
                  onChange={(e) => { setState(e.target.value) }}
                  type="text" placeholder="State" required />
                <div id="selecticon">{'❮'}</div>
              </div>
            </div>

            <div className="system" style={{ marginTop: '-5px', textAlign: 'left' }}>
              Link Instagram account <input
                value={linkInstagram}
                onChange={(e) => { setLinkInstagram(e.target.value) }}
                type="checkbox" />
            </div>

            {linkInstagram && <div className="add-title-1">
              <input
                value={instagram}
                onChange={(e) => { setInstagram(e.target.value) }}
                type="text" placeholder="instagram.com/username" />
              <img src="images/Icon feather-instagram.svg" alt="instagram icon" className="dropdown" />
            </div>}

            <input
              onClick={() => { !photoUrl ? setPhotoError(true) : setPhotoError(false) }}
              type="submit" value="submit" className="nextbtn" style={{ marginTop: 5 }} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContestantReg
