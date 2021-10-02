import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { handleSwitchAccount, triggerAuthUser } from '../../../myFunctions';
import MyImage from '../../MyImage';
import UserProfile from '../../UserProfile/UserProfile';

function SwitchAccount({ setShowSwitchAccount, handleSignOut }) {
  const [user, setUser] = useState([])
  const [allUSERS, setAllUSERS] = useState([])

  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser?.uid) {
        db.collection('users').doc(authUser?.uid).onSnapshot((snapshot => {
          if (snapshot.exists) {
            setUser(snapshot.data())
          } else {
            let res = UserProfile.getUser()
            res && setUser(res);
          }
        }))
      }
    })
  }, []);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers'))
    allUsers && setAllUSERS(allUsers)
  }, []);

  const handleSwitch = async (uid) => {
    let res = await handleSwitchAccount(uid);
    res === 'success' && setShowSwitchAccount(false); // window.location.reload()
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
    top: -100,
    width: 350,
    height: 500,
    background: 'white',
    textAlign: 'left',
    boxShadow: "2px 2px 16px 0px rgb(102 102 102 / 49%)",
    zIndex: 95,
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
          <span>{user?.userName ? user?.userName : user?.displayName}</span>
        </div>
        <br />
        <br />

        <b>Switch to:</b>
        <div style={{ minHeight: 5 }}></div>

        {allUSERS ? allUSERS?.map((user) => (
          <div
            key={user?.uid}
            onClick={() => { handleSwitch(user?.uid) }}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 20, cursor: 'pointer' }}>
            <MyImage
              src={user?.photoURL}
              alt={user?.userName ? user?.userName : user?.displayName}
              className="AuthorPhotoURL"
            />

            <div style={{ marginLeft: 20, fontSize: 16 }}>{user?.userName ? user?.userName : user?.displayName}</div>
          </div>
        )) : <>
          <h4 style={{ color: 'red' }}>You do not have another account</h4>
        </>}

        <div style={{ minHeight: 15 }}></div>
        <div className="d-flex align-items-center">
          <button className="mr-2" onClick={(e) => { triggerAuthUser(true) }}>Add new account</button>
          <button onClick={handleSignOut}>Logout</button>
        </div>

      </div>
      <div className="switchAccount-footer"></div>
    </div>
  )
}

export default SwitchAccount
