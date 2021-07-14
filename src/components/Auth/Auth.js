import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from "firebase";
import { getRandomInt } from '../../fuctions';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AlertModal from './AlertModal';

function Auth({ setOpenAuthModal, setOpenLogInOrReg }) {
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

    const signInWithGoogle = () => {
        setOpenLoading(true)
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(async (authUser) => {
                // if (!authUser.additionalUserInfo.isNewUser) {
                fetch('https://api.ipdata.co/?api-key=f4332401282ddc4b12019f87256936ad24586eca9f5ce05ad5c079db')
                    .then(res => res.json())
                    .then(d2 => {
                        let d1 = {
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            displayName: authUser.user.displayName,
                            userName: "New user_" + getRandomInt(1000),
                            uid: authUser.user.uid,
                            email: authUser.user.email,
                            photoURL: authUser.additionalUserInfo.profile.picture
                        }
                        let a = { ...defaults, ...d1, ...d2 };
                        let data = a;
                        db.collection('users').doc(authUser.user.uid).set(data);
                    })
                    .catch((error) => {
                        // console.log(error)
                        // setAlertMsg(error.message); 
                        // setAlertModal(true)
                    })

                setOpenAuthModal(false);
                setOpenLogInOrReg(false)

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

        {!auth.currentUser && <div>
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
                        setOpenAuthModal={setOpenAuthModal}
                        setOpenLogInOrReg={setOpenLogInOrReg}
                        toggleShowAuthModal={toggleShowAuthModal}
                        signInWithGoogle={signInWithGoogle} />}

                    {signUpModal && <SignUp
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
