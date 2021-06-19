import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from "firebase";
import UserProfile from '../UserProfile';
import { getRandomInt } from '../../fuctions';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AlertModal from './AlertModal';

function Auth({ setOpenAuthModal, setOpenLogInOrReg }) {
    const [alertModal, setAlertModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const defaults = {
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
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((authUser) => {
                // if (!authUser.additionalUserInfo.isNewUser) {
                db.collection('users').doc(authUser.user.uid).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    displayName: authUser.user.displayName,
                    userName: "New user_" + getRandomInt(1000),
                    uid: authUser.user.uid,
                    email: authUser.user.email,
                    photoURL: authUser.additionalUserInfo.profile.picture,
                    defaults
                });
                setOpenAuthModal(false);
                setOpenLogInOrReg(true)
                if (!alertMsg) { setOpenAuthModal(false); setOpenLogInOrReg(true) }
                window.location.reload()
                // }
            })
            .catch((error) => { setAlertMsg(error.message); setAlertModal(true) });
    }

    if (auth.currentUser) {
        setAlertMsg('')
    }

    const [signInModal, setSignInModal] = useState(true)
    const [signUpModal, setSignUpModal] = useState(false)

    const toggleShowAuthModal = (modal) => {
        if (modal === 'signIn') {
            setSignUpModal(false)
            setSignInModal(true)
        }
        if (modal === 'signUp') {
            setSignUpModal(true)
            setSignInModal(false)
        }
    }

    return (<div style={{ zIndex: 22 }}>
        {!auth.currentUser && <div>
            {alertModal && <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} alertMsg={alertMsg.message} />}
            <div className={`authModal signin-modal`}>
                <div className="logo-close">
                    <div className="logo-signin">
                        <img src="/images/Logo-1.png" alt="hairrrs logo" />
                    </div>
                    <div onClick={() => { setOpenAuthModal(false); setOpenLogInOrReg(true) }} className="close">&times;</div>
                </div>
                <div className="contents">
                    {signInModal && <SignIn
                        setOpenAuthModal={setOpenAuthModal}
                        setOpenLogInOrReg={setOpenLogInOrReg}
                        toggleShowAuthModal={toggleShowAuthModal}
                        signInWithGoogle={signInWithGoogle} />}

                    {signUpModal && <SignUp
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
