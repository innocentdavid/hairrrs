import { useState } from 'react';
import { auth, db } from '../../firebase';
import { isAccountSavedToDevice } from '../../lib/api';
import { handleSwitchAccount, loading, triggerAuthUser } from '../../myFunctions';
import AlertModal from './AlertModal';
import UserProfile from '../UserProfile/UserProfile';
import Forgetpassword from '../Forgetpassword';

function Signin() {
  const [saveAccountToDevice, setSaveAccountToDevice] = useState(false)
  const [alertModal, setAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [togglePassRest, setTogglePassRest] = useState(false)
  const [content, setContent] = useState({ email: '', password: '' });
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  // email & password
  const handleSignIn = () => {
    loading('open')
    auth.signInWithEmailAndPassword(content.email, content.password)
      .then(data => {
        // console.log(data)
        db.collection('users').doc(data?.user?.uid)
          .onSnapshot(user => {
            if (user.exists) {
              UserProfile.setUser(user.data());

              if (isAccountSavedToDevice(data?.user?.uid)) {
                triggerAuthUser(false);
                loading('close');
              } else {
                setSaveAccountToDevice(true);
                loading('close');
              }
            }
          });
      })
      .catch((error) => {
        loading('close');
        setAlertMsg(error.message);
        setAlertModal(true)
      });
  }

  const handleSaveAccountToDevice = (res) => {
    if (res === 'yes') {
      var allUsers = JSON.parse(localStorage.getItem('allUsers'))
      // console.log(allUsers?.length)
      // console.log(allUsers)

      if (allUsers.length < 4) {
        var u = JSON.parse(localStorage.getItem('user'))
        var user = u?.data?.user?.user
        let cUser = [{
          uid: user?.uid,
          userName: user?.userName,
          // encode => "Buffer.from(str, 'base64')" and decode => "buf.toString('base64')"
          password: Buffer.from(user?.password, 'base64'),
          photoURL: user?.photoURL
        }]
        allUsers ? allUsers.push(cUser[0]) : allUsers = cUser;
        let data = allUsers
        localStorage.setItem('allUsers', JSON.stringify(data));
      } else { alert('Account full!, you can only have 4 accounts saved') }
    }
    setSaveAccountToDevice(false)
    triggerAuthUser(false)
  }

  const handleSwitch = async (uid) => {
    let res = await handleSwitchAccount(uid);
    res === 'success' && triggerAuthUser(false); //window.location.reload()
  }

  const [showLoginWithSavedAcc, setShowLoginWithSavedAcc] = useState(true)
  const savedAccounts = JSON.parse(localStorage.getItem('allUsers'));


  return (<div style={{ position: 'relative' }}>
    <br />
    <br />

    <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg} />

    {showLoginWithSavedAcc && savedAccounts && <div className="loginWithSavedAcc" style={{
      position: 'fixed',
      top: 15,
      left: 15,
      width: 250,
      minHeight: 300,
      background: 'rgb(0 0 0 / 79%)',
      color: 'white',
      padding: 15
    }}>
      <div
        onClick={() => { setShowLoginWithSavedAcc(false) }}
        style={{ textAlign: 'right', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>X</div>

      <center><div style={{ fontSize: '18px', fontWeight: 700 }}>Login as</div></center>
      <div style={{ height: 10 }}></div>

      {savedAccounts?.map((doc, index) => {
        // console.log(doc)
        return (
          <div key={index} onClick={() => { handleSwitch(doc?.uid) }} className="d-flex align-items-center" style={{ cursor: 'pointer', marginBottom: 10 }}>
            <img src={doc?.photoURL} alt={doc?.userName}
              style={{ width: 30, height: 30, borderRadius: '50%' }}
            />
            <h3 style={{ marginLeft: 10 }}>{doc?.userName}</h3>
          </div>
        )
      })}

    </div>}

    <form onSubmit={(e) => { e.preventDefault(); handleSignIn() }}>
      <div className="form-control">
        <input
          name="email"
          value={content.email}
          onChange={onChange}
          type="email" id="email" placeholder="Email" />
      </div><br />

      <div className="form-control">
        <input
          name="password"
          value={content.password}
          onChange={onChange}
          type="password" id="password" placeholder="Password" />
      </div>
      <div>Lost password? <span onClick={() => { setTogglePassRest(true) }} style={{ color: 'brown', cursor: 'pointer' }}>click here</span></div>
      <button>Sign in</button>
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


    {togglePassRest && <Forgetpassword setTogglePassRest={setTogglePassRest} />}
  </div>)
}

export default Signin
