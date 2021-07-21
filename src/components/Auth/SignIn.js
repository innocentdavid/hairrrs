import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import UserProfile from '../UserProfile/UserProfile';
import AlertModal from './AlertModal';

function SignIn({ signInWithGoogle, toggleShowAuthModal, setOpenAuthModal, setOpenLogInOrReg }) {
  const [alertModal, setAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('')
  const [openLoading, setOpenLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // email & password
  const signIn = () => {
    setOpenLoading(true)
    auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        // console.log(data)
        db.collection('users').doc(data?.user?.uid)
          .onSnapshot(user => {
            if(user.exists){
              UserProfile.setUser(user.data());
              setOpenLoading(false);
              
              if (isSaved(data?.user?.uid)) {
                setOpenAuthModal(false);
                setOpenLogInOrReg(false);
              } else {
                setSaveAccountToDevice(true)
              }
            }
          });
      })
      .catch((error) => {
        console.log(error)
        setOpenLoading(false)
        setAlertMsg(error.message);
        setAlertModal(true)
      });
  }

  const [saveAccountToDevice, setSaveAccountToDevice] = useState(false)
  const handleSaveAccountToDevice = (res) => {
    if (res === 'yes') {
      var allUsers = JSON.parse(localStorage.getItem('allUsers'))
      console.log(allUsers?.length)
      console.log(allUsers)

      if (allUsers.length < 4) {
        var u = JSON.parse(localStorage.getItem('user'))
        var user = u?.data?.user?.user
        let cUser = [{
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL
        }]
        allUsers ? allUsers.push(cUser[0]) : allUsers = cUser;
        let data = allUsers
        localStorage.setItem('allUsers', JSON.stringify(data));
      } else { alert('Account full!, you can only have 4 accounts saved') }
    }
    setSaveAccountToDevice(false)
    setOpenAuthModal(false);
    setOpenLogInOrReg(false);
  }

  function isSaved(uid) {
    var allUsers = JSON.parse(localStorage.getItem('allUsers'));
    let myArray = allUsers.filter(function (obj) {
      return obj.uid === uid;
    });
    if (myArray.length > 0) { return true; } else { return false; }
  }

  return (
    <div className="signin-form">
      {openLoading && <div className="loader" style={{ display: 'grid' }}>
        <img src="/images/loading.svg" alt="" />
      </div>}

      {saveAccountToDevice && <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100vh',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 95
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '10px 30px',
            boxShadow: 'rgb(0 0 0 / 50%) -1px 1px 5px 0px'
          }}
        >
          <div>Do you want to save this Account for easy login?</div>
          <div className="d-flex" style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              style={{ cursor: 'pointer' }}
              className="btnSolid"
              onClick={() => { handleSaveAccountToDevice('yes') }}>yes</button>
            <div style={{ width: 20 }}></div>
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => { handleSaveAccountToDevice('no') }}>no</button>
          </div>
        </div>
      </div>}


      <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg} />
      <form onSubmit={(e) => { e.preventDefault(); signIn() }}>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" className="email" required />
        <hr className="HomeHr" />
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="true" placeholder="Password" className="email" required />
        <hr className="HomeHr" />

        <div className="others">
          <span>Recover password</span>
          <br />
          <button type="submit" className="signinbtn-1">Sign in</button>
        </div>

        <div className="others-1">
          <span>Sign in with</span>
          <br />
          <div className="justify">
          <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle('facebook') }}>
              <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
            <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle('google') }}>
              <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google
            </button>
          </div>
        </div>

        <div className="others-2">
          Not Registered? &nbsp;
          <button onClick={() => { toggleShowAuthModal('signUp') }} className="signinbtn-1">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
