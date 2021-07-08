import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { topFunction } from './fuctions';

function SideProfileSection({ setOpenLogInOrReg }) {
  const [user, setUser] = useState(null)
  const [signOutModal, setSignOutModal] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        db.collection('users').doc(authUser.uid)
          .onSnapshot(user => {
            setUser(user.data())
          });
      }
    })
    return () => { unsubscribe() }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    auth.signOut();
    setUser(null)
    setOpenLogInOrReg(true)
    // window.location = '/'
  }

  return (<>
    {user?.uid && <div className="accord--profile">
      <div className="user--photo">
        <Link
          to='/profile'
          onClick={() => { topFunction() }}
          className="d-flex align-items-center"
          style={{ position: 'relative' }}>
          <img src={user?.photoURL} alt="" className="user" />
          <span style={{ fontSize: '1.2rem', color: '#f40053', marginLeft: 10 }}>{user?.displayName}</span>
          <span
            onClick={(e) => { e.preventDefault(); setSignOutModal(!signOutModal) }}
            style={{ color: '#f40053', marginLeft: 10 }}>
            {signOutModal ? <i style={{ fontSize: '25px' }} className="fa fa-angle-up" aria-hidden="true"></i>
              : <i style={{ fontSize: '25px' }} className="fa fa-angle-down" aria-hidden="true"></i>}
          </span>
        </Link>
        {signOutModal &&
          <div
            onclick={(e) => { e.preventDefault() }}
            className="signOutChild" style={{
              position: 'absolute',
              top: "70px",
              right: '5px',
              textAlign: 'right',
              zIndex: 25
            }}>
            <div className="" onclick={(e) => { e.preventDefault() }} ><button style={{ cursor: 'pointer' }}>Switch Account</button></div>
            <div onClick={handleSignOut} className="SignOut" onclick={(e) => { e.preventDefault() }}><button className="btnSolid" style={{ cursor: 'pointer' }}>sign out</button></div>
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
