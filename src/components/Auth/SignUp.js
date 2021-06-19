import React, { useState } from 'react'
import { auth, db } from '../../firebase';
import firebase from 'firebase'
import { getRandomInt } from '../../fuctions';
import AlertModal from './AlertModal';

function SignUp({ defaults, signInWithGoogle, toggleShowAuthModal, setOpenAuthModal, setOpenLogInOrReg }) {
  const [alertModal, setAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('')

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // email & password
  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser.user)
        db.collection('users').doc(authUser.user.uid).set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          displayName: fullName,
          userName: "New user_" + getRandomInt(1000),
          uid: authUser.user.uid,
          email: authUser.user.email,
          photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL,
          defaults
        });
        authUser.user.updateProfile({ displayName: fullName, photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL });
      })
      .catch((error) => { setAlertMsg(error.message); setAlertModal(true) });
    if (!alertMsg) { setOpenAuthModal(false); setOpenLogInOrReg(true) }
  }

  if (auth.currentUser) {
    setAlertMsg('')
  }

  return (
    <div className="signup-form">
      <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg.message} />
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
          <span>Recover password</span>
          <br />
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
