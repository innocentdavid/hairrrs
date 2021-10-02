import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyImage from './components/MyImage';
import SwitchAccount from './components/Popups/SideProfileSection/SwitchAccount';
import { auth, db } from './firebase';
import { topFunction, triggerAuthUser } from './myFunctions';
import './styles/sideProfileSection.css'

function SideProfileSection() {
  const [signOutModal, setSignOutModal] = useState(false)
  const [showSwitchAccount, setShowSwitchAccount] = useState(false)
  
  const [user, setUser] = useState([]);
  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser?.uid) {
        const fetch = () => {
          db.collection('users').doc(authUser?.uid).onSnapshot((snapshot => {
            if(snapshot.exists){
              setUser(snapshot.data())
            }
          }))
        }
        fetch();
      }
    })
  }, [])

  const handleSignOut = () => {
    setSignOutModal(false);
    const data = {
      uid: user?.uid,
      userName: user?.userName,
      photoURL: user?.photoURL
    }
    localStorage.setItem('lastUser', JSON.stringify(data));
    localStorage.removeItem("user");
    auth.signOut();
    setUser(null);
    // window.location.reload();
  }

  return (<>
    <div className="accord--profile">
      <div className="user--photo"
        style={{ position: 'relative' }}>
        {user?.uid && <Link to={`/profile/me`} onClick={() => { topFunction() }}>
          <MyImage
            src={user?.photoURL}
            width=''
            height=''
            alt={user?.userName}
            className="user"
          />
        </Link>}

        {user?.uid ?
          <Link to={`/profile/me`} onClick={() => { topFunction() }}>
            <span style={{ fontSize: '1.2rem', color: '#f40053', marginLeft: 10 }}>{user?.userName}</span>
          </Link> :
          <button onClick={() => { triggerAuthUser(true) }} className="btnSolid">log in / sign up</button>
        }

        {user?.uid && <span
          onClick={(e) => { e.preventDefault(); setSignOutModal(!signOutModal) }}
          style={{ color: '#f40053', marginLeft: 10 }}>
          {signOutModal ? <i style={{ fontSize: '25px', marginButtom: -10 }} className="fa fa-angle-up" aria-hidden="true"></i>
            : <i style={{ fontSize: '25px' }} className="fa fa-angle-down" aria-hidden="true"></i>}
        </span>}

        {signOutModal &&
          <div
            onClick={(e) => { e.preventDefault() }}
            className="signOutChild" style={{
              position: 'absolute',
              top: "35px",
              right: '2px',
              textAlign: 'right',
              zIndex: 25
            }}>
            <div className="" onClick={(e) => { e.preventDefault() }} ><button onClick={() => { setShowSwitchAccount(true) }} style={{ cursor: 'pointer' }}>Switch Account</button></div>
            {showSwitchAccount && <SwitchAccount
              setShowSwitchAccount={setShowSwitchAccount}
              handleSignOut={handleSignOut}
            // setOpenAuthModal={setOpenAuthModal}
            />}
            <div className="SignOut"
              onClick={(e) => { e.preventDefault(); handleSignOut() }}>
              <button className="btnSolid" style={{ cursor: 'pointer' }}>sign out</button>
            </div>
          </div>
        }
      </div>

      <div className="profile" style={{ width: '100%', textAlign: 'left' }}>
        <Link to="/profile/me#analytics">Analystics</Link><br />
        <Link to="/profile/me#Products">Products</Link><br />
        <Link to="/profile/me#Job Vacancies">Job Vacancies</Link><br />
        <Link to="/profile/me#Articles">Articles</Link>
      </div>
    </div>
  </>)
}

export default SideProfileSection
