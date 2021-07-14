import React from 'react'
import MyImage from '../../MyImage'
import UserProfile from '../../UserProfile/UserProfile'

function SwitchAccount({ setShowSwitchAccount, handleSignOut, setOpenAuthModal }) {
  const user = UserProfile.getUser()

  const handleSwitch = () => {
    // if (!user || !user.uid) {
    //   lastUser = JSON.parse(localStorage.getItem('lastUser'))
    // }
  }


  const closeSwitchAccountModal = {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 16,
    color: 'gray',
    cursor: 'pointer'
  }

  const switchAccount = {
    position: 'absolute',
    top: -50,
    width: 350,
    height: 500,
    background: 'white',
    textAlign: 'left',
    boxShadow: "2px 2px 16px 0px rgb(102 102 102 / 49%)"
  }

  const switchAccountHeader = {
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid rgb(128 128 128 / 12%)',
    position: 'relative'
  }

  return (
    <div style={switchAccount}>
      <div style={switchAccountHeader}>
        <span
          onClick={() => { setShowSwitchAccount(false) }}
          style={closeSwitchAccountModal} className="fa fa-times"></span>
        <h1>Switch Account</h1>
      </div>

      <div
        style={{
          padding: 20,
        }}
        className="switchAccount-body">
        <div>
          <b>currently logged in as: </b>
          <span>{user?.displayName}</span>
        </div>
        <br />
        <br />

        <b>Switch to:</b>
        <div style={{ minHeight: 5 }}></div>

        {user?.accounts ? user?.accounts.map((user) => (
          <div
            onClick={() => { handleSwitch('uid') }}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 20, cursor: 'pointer' }}>
            <MyImage
              src={user.photoURL}
              alt={user.displayName}
              className="AuthorPhotoURL"
            />

            <div style={{ marginLeft: 20, fontSize: 16 }}>{user.displayName}</div>
          </div>
        )) : <>
          <h4 style={{ color: 'red' }}>You do not have another account</h4>
        </>}

        <div style={{ minHeight: 15 }}></div>
        <div className="d-flex align-items-center">
        <button className="mr-2" onClick={(e) => { setOpenAuthModal(true) }}>Add new account</button>
        <button onClick={handleSignOut}>Logout</button>
        </div>

      </div>
      <div className="switchAccount-footer"></div>
    </div>
  )
}

export default SwitchAccount
