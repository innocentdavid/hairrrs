import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from "firebase";
import { getRandomInt, makeid, UrlSlug } from '../../fuctions';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AlertModal from './AlertModal';
import UserProfile from '../UserProfile/UserProfile';

function Auth({ setOpenAuthModal, setOpenLogInOrReg }) {
    const user = UserProfile.getUser()
    const [alertModal, setAlertModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [openLoading, setOpenLoading] = useState(false)

    const defaults = {
        photoURLmax: '',
        fullName: '',
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

    const signInWithGoogle = (providerU) => {
        setOpenLoading(true)
        const provider = providerU === 'google' ?
            new firebase.auth.GoogleAuthProvider()
            : new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider)
            .then(async (authUser) => {
                // if (!authUser.additionalUserInfo.isNewUser) {
                fetch('https://api.ipdata.co/?api-key=f4332401282ddc4b12019f87256936ad24586eca9f5ce05ad5c079db')
                    .then(res => res.json())
                    .then(d2 => {
                        let d1 = {
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            displayName: authUser.user.displayName,
                            // userName: `New user${makeid(4)}`,
                            userName: authUser.user.displayName ? UrlSlug(authUser.user.displayName, 'encode') : `New user${makeid(4)}`,
                            uid: authUser.user.uid,
                            email: authUser.user.email,
                            photoURL: authUser.additionalUserInfo.profile.picture
                        }
                        let a = { ...defaults, ...d1, ...d2 };
                        let data = a;
                        db.collection('users').doc(authUser.user.uid).set(data);
                        UserProfile.setUser(data);

                        setOpenLoading(false)

                        if (isSaved(authUser?.user?.uid)) {
                            setOpenAuthModal(false);
                            setOpenLogInOrReg(false);
                        } else {
                            setSaveAccountToDevice(true);
                        }
                    })
                    .catch((error) => {
                        // console.log(error)
                        // setAlertMsg(error.message); 
                        // setAlertModal(true)
                    })

            })
            .catch((error) => {
                // console.log(error)
                setOpenLoading(false)

                if (error?.code === 'auth/popup-closed-by-user') {
                    setAlertMsg("The popup has been closed before finalizing the operation.");
                } else { setAlertMsg(error.message) }

                setAlertModal(true)
            });
    }

    const [saveAccountToDevice, setSaveAccountToDevice] = useState(false)
    const handleSaveAccountToDevice = (res) => {
        if (res === 'yes') {
            var allUsers = JSON.parse(localStorage.getItem('allUsers'))
            if (allUsers.length < 4) {
                var u = JSON.parse(localStorage.getItem('user'))
                var user = u?.data?.user?.user
                let cUser = [{
                    uid: user?.uid,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL
                }]
                allUsers ? allUsers.push(cUser[0]) : allUsers = cUser;
                let data = allUsers
                localStorage.setItem('allUsers', JSON.stringify(data));
            } else { alert('Account full!, you can only have 4 accounts saved') }
        }
        setSaveAccountToDevice(false)
        setOpenAuthModal(false);
        setOpenLogInOrReg(false)
    }

    function isSaved(uid) {
        var allUsers = JSON.parse(localStorage.getItem('allUsers'));
        let myArray = allUsers.filter(function (obj) {
            return obj.uid === uid;
        });
        if (myArray.length > 0) { return true; } else { return false; }
    }

    const [signInModal, setSignInModal] = useState(true)
    const [signUpModal, setSignUpModal] = useState(false)

    const toggleShowAuthModal = (modal) => {
        if (modal === 'signIn') {
            setSignInModal(true)
            setSignUpModal(false)
        }
        if (modal === 'signUp') {
            setSignUpModal(true)
            setSignInModal(false)
        }
    }

    return (<div style={{ zIndex: 22 }}>
        {openLoading && <div className="loader" style={{ display: 'grid' }}>
            <img src="/images/loading.svg" alt="" />
        </div>}

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
                        className="btnSolid"
                        style={{ cursor: 'pointer' }}
                        onClick={() => { handleSaveAccountToDevice('yes') }}
                    >yes</button>
                    <div style={{ width: 20 }}></div>
                    <button
                        style={{ cursor: 'pointer' }}
                        onClick={() => { handleSaveAccountToDevice('no') }}
                    >no</button>
                </div>
            </div>
        </div>}


        {!user && <div>
            {alertModal && <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg} />}
            <div id="authModal" className={`authModal signin-modal`}>
                <div className="logo-close">
                    <div className="logo-signin">
                        <img src="/images/Logo-1.png" alt="hairrrs logo" />
                    </div>
                    <div onClick={() => { setOpenAuthModal(false) }} className="close">&times;</div>
                </div>
                <div className="contents">
                    {signInModal && <SignIn
                        saveAccountToDevice={saveAccountToDevice}
                        setSaveAccountToDevice={setSaveAccountToDevice}

                        setOpenAuthModal={setOpenAuthModal}
                        setOpenLogInOrReg={setOpenLogInOrReg}
                        toggleShowAuthModal={toggleShowAuthModal}
                        signInWithGoogle={signInWithGoogle} />}

                    {signUpModal && <SignUp
                        saveAccountToDevice={saveAccountToDevice}
                        setSaveAccountToDevice={setSaveAccountToDevice}

                        setOpenAuthModal={setOpenAuthModal}
                        setOpenLogInOrReg={setOpenLogInOrReg}
                        toggleShowAuthModal={toggleShowAuthModal}
                        defaults={defaults}
                        signInWithGoogle={signInWithGoogle} />}

                    <div className="image">
                        <img src="/images/11a11585cec9fb88054ea71c21cbf4ea.png" alt="" className="" />
                    </div>
                </div>
            </div>
        </div>}
    </div>)
}

export default Auth
