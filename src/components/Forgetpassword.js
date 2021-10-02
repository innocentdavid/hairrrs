import React, { useState } from 'react';
import { auth } from '../firebase';
import { loading } from '../myFunctions';

export default function Forgetpassword({ setTogglePassRest }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleSend = () => {
    loading('open')
    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('A link has been sent to the your email address')
        loading('close');
        setTogglePassRest(false)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(`${errorCode} - ${errorMessage}`)
        loading('close');
      });
  }

  return (<>
    <div class="forgotPassword">
      <div class="forgotPasswordModal">
        <div onClick={() => { setTogglePassRest(false) }} class="closeBtn">&times;</div>
        <div class="middler">
          <div class="logo">
            <img src="images/Logo-icon.svg" alt="logo" />
          </div>
          <h2>Forgot Password?</h2>
          <p>We will send a recovery link to your provided email address
            if linked to the account
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleSend() }}>
            <input
              value={email}
              onChange={(e) => { setError(''); setEmail(e.target.value) }}
              type="email" placeholder="Email" required />
            <button type="submit">Next</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
    </div>
  </>)
}