import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MyImage from './components/MyImage';
import SwitchAccount from './components/Popups/SideProfileSection/SwitchAccount';
import { auth } from './firebase';
import { topFunction } from './fuctions';

function SideProfileSection({ setOpenLogInOrReg, setOpenAuthModal }) {
  const [user, setUser] = useState()
  useEffect(() => {
    var u = JSON.parse(localStorage.getItem('user'))
    if(u){
      var userC = u?.data?.user?.user
      setUser(userC)
    }
  }, [])

  const [signOutModal, setSignOutModal] = useState(false)
  const [showSwitchAccount, setShowSwitchAccount] = useState(false)


  const handleSignOut = async () => {
    const data = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL
    }
    await localStorage.setItem('lastUser', JSON.stringify(data));

    localStorage.removeItem("user");
    auth.signOut();
    setUser(null)
    setOpenLogInOrReg(true)
  }

  return (<>
    {user?.uid && <div className="accord--profile">
      <div className="user--photo"
        style={{ position: 'relative' }}>
        <Link to={`/profile`} onClick={() => { topFunction() }}>
          <MyImage
            src={user?.photoURL}
            width=''
            height=''
            alt={user?.displayName}
            className="user"
          />
        </Link>

        <Link to={`/profile`} onClick={() => { topFunction() }}>
          <span style={{ fontSize: '1.2rem', color: '#f40053', marginLeft: 10 }}>{user?.displayName}</span>
        </Link>

        <span
          onClick={(e) => { e.preventDefault(); setSignOutModal(!signOutModal) }}
          style={{ color: '#f40053', marginLeft: 10 }}>
          {signOutModal ? <i style={{ fontSize: '25px' }} className="fa fa-angle-up" aria-hidden="true"></i>
            : <i style={{ fontSize: '25px' }} className="fa fa-angle-down" aria-hidden="true"></i>}
        </span>

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
              setOpenAuthModal={setOpenAuthModal}
            />}
            <div className="SignOut"
              onClick={(e) => { e.preventDefault(); handleSignOut() }}>
              <button className="btnSolid" style={{ cursor: 'pointer' }}>sign out</button>
            </div>
          </div>
        }
      </div>

      <div className="profile" style={{ width: '100%', textAlign: 'left' }}>
        <Link to="/profile">Analystics</Link><br />
        <Link to="/profile">Products</Link><br />
        <Link to="/profile">Job Vacancies</Link><br />
        <Link to="/profile">Articles</Link>
      </div>
    </div>}
  </>)
}

export default SideProfileSection
