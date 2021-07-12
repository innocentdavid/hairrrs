import React, { useState } from 'react';
import { auth } from '../../firebase';
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
        setOpenLoading(false)
        setOpenAuthModal(false); 
        setOpenLogInOrReg(false);
      })
      .catch((error) => {
        console.log(error)
        setOpenLoading(false)
        setAlertMsg(error.message);
        setAlertModal(true)
      });
  }

  return (
    <div className="signin-form">
      {openLoading && <div className="loader" style={{ display: 'grid' }}>
        <img src="/images/loading.svg" alt="" />
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
            <button className="signinbtn">
              <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
            <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle() }}>
              <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google
            </button>
          </div>
        </div>

        <div className="others-2">
          Not Registered? &nbsp;
          <button onClick={(e) => { e.preventDefault(); toggleShowAuthModal('signUp') }} className="signinbtn-1">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
