import { useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import { isAccountSavedToDevice } from '../../lib/api';
import { loading, triggerAuthUser, confirmPasswordMatch, isSavedUsersListOpen } from '../../myFunctions';
import AlertModal from './AlertModal';
import UserProfile from '../UserProfile/UserProfile';

function Signup({ defaults }) {
  const [saveAccountToDevice, setSaveAccountToDevice] = useState(false)
  const [alertModal, setAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('')
  const [content, setContent] = useState({ firstName: '', lastName: '', email: '', userName: '', password: '', Cpassword: '' });
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const handleCleanUp = () => {
    setContent({ firstName: '', lastName: '', email: '', userName: '', password: '', Cpassword: '' })
  }

  // const getGeolocation = async () => {
  //   let res = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=ecfa2663b95641e38969caf485af468c');
  //   return await res.json();
  // }

  const handleSignup = () => {
    if (confirmPasswordMatch(content.password, content.Cpassword)) {
      loading('open');
      auth.createUserWithEmailAndPassword(content.email, content.password)
        .then(async (authUser) => {
          authUser.user.updateProfile({
            userName: content.userName,
            photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL
          });

          fetch('https://api.ipdata.co/?api-key=f4332401282ddc4b12019f87256936ad24586eca9f5ce05ad5c079db')
            .then(res => res.json())
            .then(async geoLocation => {
              const encodePassword = window.btoa(content.password) // Encode String
              // const decodePassword = window.atob(encodePassword) // Decode String
              let d1 = {
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                userName: content.userName,
                password: encodePassword,
                uid: authUser.user.uid,
                email: authUser.user.email,
                photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL
              }

              let a = { ...d1, ...geoLocation, ...defaults };
              let data = a;

              UserProfile.setUser(data);
              await db.collection('users').doc(authUser.user.uid).set(data);

              if (isAccountSavedToDevice(authUser?.user?.uid)) {
                loading('close'); triggerAuthUser(false);
              } else {
                loading('close'); setSaveAccountToDevice(true);
              }
            })
        })
        .then(data => {
          // console.log(data)
          // loading('close')
        })
        .catch((error) => {
          loading('close');
          setAlertMsg(error.message);
          setAlertModal(true);
        });
    } else {
      setAlertMsg('password and confirm password must match must match!');
      setAlertModal(true);
    }
  }

  const handleSaveAccountToDevice = (res) => {
    if (res === 'yes') {
      loading('open');
      var allUsers = JSON.parse(localStorage.getItem('allUsers'))
      var u = JSON.parse(localStorage.getItem('user'))
      var user = u?.data?.user?.user
      if (user) {
        let cUser = [{
          uid: user?.uid,
          userName: user?.userName,
          password: user?.password,
          photoURL: user?.photoURL
        }];
        // add_cUser_to_list
        if (allUsers && isSavedUsersListOpen()) {
          allUsers.push(cUser[0]);
          localStorage.setItem('allUsers', JSON.stringify(allUsers));

        } else {
          localStorage.setItem('allUsers', JSON.stringify(cUser));
        }

        allUsers && !isSavedUsersListOpen() && alert('Account full!, you can only have 4 accounts saved');

        handleCleanUp();
        loading('close');
        setSaveAccountToDevice(false);
        triggerAuthUser(false);
      }
    }
  }

  return (<>
    <br />
    <br />

    <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg} />

    <form onSubmit={(e) => { e.preventDefault(); handleSignup() }}>
      <span>First name</span>
      <div className="form-control">
        <input
          name="firstName"
          value={content.firstName}
          onChange={onChange}
          type="firstname" id="firstName" placeholder="First name" required />
      </div><br />

      <span>Last name</span>
      <div className="form-control">
        <input
          name="lastName"
          value={content.lastName}
          onChange={onChange}
          type="lastname" id="lastName" placeholder="Last name" required />
      </div><br />

      <span>Email</span>
      <div className="form-control">
        <input
          name="email"
          value={content.email}
          onChange={onChange}
          type="email" id="email" placeholder="Email" required />
      </div><br />

      <span>username / trending name</span>
      <div className="form-control">
        <input
          name="userName"
          value={content.userName}
          onChange={onChange}
          type="username" id="username" placeholder="username / trending name" required />
      </div><br />

      <span>Password</span>
      <div className="form-control">
        <input
          name="password"
          value={content.password}
          onChange={onChange}
          type="password" id="password" placeholder="Password" required />
      </div><br />

      <span>Comfirm password</span>
      <div className="form-control">
        <input
          name="Cpassword"
          value={content.Cpassword}
          onChange={onChange}
          type="password" id="Cpassword" placeholder="Confirm password" required />
      </div>
      <button className="btnSolid">Sign in</button>
    </form>

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

export default Signup
