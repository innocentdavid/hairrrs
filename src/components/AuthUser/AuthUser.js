import React from 'react'
import { useState } from 'react'
import { isSavedUsersListOpen, triggerAuthUser } from '../../myFunctions';
import Signin from './Signin';
import Signup from './Signup';
import WithFb from './WithFacebook';
import WithGoogle from './WithGoogle';

function AuthUser() {
  const [saveAccountToDevice, setSaveAccountToDevice] = useState(false)
  const [page, setPage] = useState('signin');

  const defaults = {
    photoURLmax: '',
    aboutBusiness: '',
    website: '',
    services: '',
    phoneNumber: "",
    country: "",
    location: "",
    address: "",
    totalProducts: 0,
    totalArticles: 0,
    totalJobs: 0,
    verified: false,
    pushNotifications: false,
    messageNotifications: false,
    emailNotifications: false,
    appAutoUpdate: false,
    totalEngagement: 0
  }

  const handleSaveAccountToDevice = (res) => {
    if (res === 'yes') {
      var allUsers = JSON.parse(localStorage.getItem('allUsers'))
      var u = JSON.parse(localStorage.getItem('user'))
      var user = u?.data?.user?.user
      if (user) {
        let cUser = {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL
        };
        // add_cUser_to_list
        allUsers && isSavedUsersListOpen() ? allUsers.push(cUser) :
          localStorage.setItem('allUsers', JSON.stringify(cUser));

        allUsers && !isSavedUsersListOpen() && alert('Account full!, you can only have 4 accounts saved');

        setSaveAccountToDevice(false)
        triggerAuthUser(false)
      }
    }
  }

  return (<>
    <div className="authUserParent">
      <div
        onClick={() => { triggerAuthUser(false) }}
        className="closeSigninModal">+</div>
      <div className="authUser-main">
        <div className="authUser-logo"><img src="/images/hairrrs-Logo-original.png" width="100%" height="100%" alt="logo" /></div>

        {page === 'signin' && <div> <Signin /> </div>}

        {page === 'signup' && <div>
          <Signup defaults={defaults}
            handleSaveAccountToDevice={handleSaveAccountToDevice}
          />
        </div>}

        <br />
        <div>or</div>
        <br />


        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Sign up with</span>

          <WithGoogle defaults={defaults} handleSaveAccountToDevice={handleSaveAccountToDevice} />

          <WithFb defaults={defaults} handleSaveAccountToDevice={handleSaveAccountToDevice} />
        </div>

        <br />

        {page === 'signup' && <div onClick={() => { setPage('signin') }}>Registered? <span
          onClick={() => { setPage('signin') }}
          style={{ cursor: 'pointer', color: 'brown' }}>Sign in</span></div>}

        {page === 'signin' && <div onClick={() => { setPage('signup') }}>Not registered? <span
          onClick={() => { setPage('signup') }}
          style={{ cursor: 'pointer', color: 'brown' }}>Sign up</span></div>}
      </div>


      {/* authUser-sideImg */}
      <div className="authUser-sideImg"><img src="/images/signup img.png" width="100%" height="100%" alt="signup img" /></div>
    </div>



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

  </>)
}

export default AuthUser
