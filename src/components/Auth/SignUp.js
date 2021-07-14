import React, { useState } from 'react'
import { auth, db } from '../../firebase';
import firebase from 'firebase'
import { getRandomInt } from '../../fuctions';
import AlertModal from './AlertModal';

function SignUp({ defaults, signInWithGoogle, toggleShowAuthModal }) {
  const [alertModal, setAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('')
  const [openLoading, setOpenLoading] = useState(false)

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // email & password
  const signUp = () => {
    setOpenLoading(true)
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        fetch('https://api.ipdata.co/?api-key=f4332401282ddc4b12019f87256936ad24586eca9f5ce05ad5c079db')
          .then(res => res.json())
          .then(d2 => {
            let d1 = {
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              displayName: fullName,
              userName: "New user_" + getRandomInt(1000),
              uid: authUser.user.uid,
              email: authUser.user.email,
              photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL
            }

            let a = { ...d1, ...d2, ...defaults };
            let data = a;

            db.collection('users').doc(authUser.user.uid).set(data);
            authUser.user.updateProfile({
              displayName: fullName,
              photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL
            });
          })
      })
      .then(data => {
        // console.log(data)
        setOpenLoading(false)
      })
      .catch((error) => {
        setOpenLoading(false)
        setAlertMsg(error.message);
        setAlertModal(true)
      });
  }

  return (
    <div className="signup-form">
      {openLoading && <div className="loader" style={{ display: 'grid' }}>
        <img src="/images/loading.svg" alt="" />
      </div>}

      <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg} />
      <form onSubmit={(e) => { e.preventDefault(); signUp() }}>
        <input value={fullName} onChange={(e) => { setFullName(e.target.value) }} type="text" placeholder="Full name" className="email" required />
        <hr className="HomeHr" />
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" className="email" required />
        <hr className="HomeHr" />
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="true" placeholder="Password" className="email" required />
        <hr className="HomeHr" />
        <input type="password" autoComplete="true" placeholder="Confirm password" id="confirmPassword" className="email" required />
        <hr className="HomeHr" />

        <div className="others">
          <button type="submit" className="signinbtn-1">Sign up</button>
        </div>

        <div className="others-1">
          <span>Sign up with</span>
          <br />
          <div className="justify">
            <button className="signinbtn">
              <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
            <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle() }}>
              <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google</button>
          </div>
        </div>

        <div className="others-2">
          Already Registered? &nbsp;
          <button onClick={(e) => { e.preventDefault(); toggleShowAuthModal('signIn') }} className="signinbtn-1">Sign in</button>
        </div>
      </form>
    </div>

  )
}

export default SignUp