import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../firebase'
import firebase from 'firebase';

function VerifyAccount({ user }) {
  const [isVerify, setIsVerify] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)
  const [fullName, setFullName] = useState(null)
  const [docForVerification, setDocForVerification] = useState(null)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user) {
      if (user.verified) {
        setIsVerify(true)
      }
      if (user.hasRequested) {
        setHasRequested(true)
      }
    }

  }, [user])

  const verifyAccount = () => {
    if (auth.currentUser && user?.email) {
      if (fullName && docForVerification) {
        setProgress(1)
        const uploadTask = storage.ref(`VerificationFiles/${docForVerification.name}`).put(docForVerification);
        uploadTask.on("state_change", (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
          (error) => {
            console.log(error);
            alert(error.message)
          },
          () => {
            // complete function...
            storage
              .ref('VerificationFiles')
              .child(docForVerification.name)
              .getDownloadURL()
              .then(url => {
                let email = user.email;
                let displayName = user.displayName;
                var data = { fullName, url, email, displayName }

                db.collection('users').doc(auth.currentUser.uid).update({
                  reqVerificationDate: firebase.firestore.FieldValue.serverTimestamp(),
                  docForVerification: url
                });
                db.collection('verifyAccount').doc(auth.currentUser.uid).set(data)

                setProgress(0);
                setDocForVerification(null);
              });
          }
        );
      } else { alert(`You have not tell us your name :(`) }
    } else { console.log('error') }
  }

  return (
    <div>
      <h2>Verify Account</h2>

      {!isVerify && !hasRequested ? <>
        <div className="margin-top">
          <span className='txt'>Full name</span>
          <br />

          <input id="fullName"
            value={fullName}
            onChange={(e) => { setFullName(e.target.value) }}
            type="text" className="classctl" />
        </div>

        <div className="margins-top">
          <h3><strong>Upload document</strong></h3>
          <p>you have upload the jkf ocut ioi and scorf fodfg so let
            us verify you well via documents uploads</p>
          <br />

          <input className="docForVerification"
            // value={docForVerification}
            onChange={(e) => {
              setDocForVerification(e.target.files[0])
            }}
            type="file" id="fileupload" hidden />
          {progress > 0 && <progress value={progress} max='100' />}
          <br /><br />
          <div className="d-flex align-items-center">
            <label htmlFor="fileupload">Upload file</label>
            <span style={{ marginLeft: '15px' }}>{docForVerification ? (docForVerification.name)?.toString() : "Choose a file"}</span>
          </div>

          <div className="requestdoc d-flex align-items-center">
            <button onClick={verifyAccount} className="btnSolid" style={{ cursor: 'pointer' }}>Request</button>
            {progress >= 1 && progress <= 100 && <span style={{ marginLeft: '15px' }}>
              <img src="/images/loading.svg" alt="" width="30" height='30' />
            </span>}
          </div>
        </div>
      </> :
        <>
          {!hasRequested ? <strong>Verified!</strong> : <strong>Your verification is still in process</strong>}
        </>
      }

    </div>
  )
}

export default VerifyAccount
