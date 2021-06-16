import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import { auth, db } from '../firebase';
import UserProfile from './UserProfile';
import { getRandomInt } from '../fuctions';

function Auth() {
    const [alertModal, setAlertModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const [signInModal, setSignInModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const handleModal = (modal, action) => { modal(action) };

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect for signing up users
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                UserProfile.setUser(authUser);
                setSignUpModal(false);
            } else {
                // auth.signInAnonymously();
            }
        })

        return () => { unsubscribe(); setAlertMsg('') }
    }, [fullName]);

    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log(authUser.user)
                db.collection('users').doc(authUser.user.uid).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    displayName: fullName,
                    userName: "New user_" + getRandomInt(1000),
                    uid: authUser.user.uid,
                    email: authUser.user.email,
                    photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL,
                    phoneNumber: "779797329",
                    address: "474 Mercer Drive",
                    totalProducts: 0,
                    totalArticles: 0,
                    totalJobs: 0,
                    verified: false
                });
                authUser.user.updateProfile({ displayName: fullName, photoURL: process.env.REACT_APP_DEFAULT_USER_PHOTO_URL });
            })
            .catch((error) => { setAlertMsg(error.message); setAlertModal(true) });
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((authUser) => {
                // if (!authUser.additionalUserInfo.isNewUser) {
                    db.collection('users').doc(authUser.user.uid).set({
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        displayName: authUser.user.displayName,
                        uid: authUser.user.uid,
                        email: authUser.user.email,
                        photoURL: authUser.additionalUserInfo.profile.picture,
                        phoneNumber: "779797329",
                        address: "474 Mercer Drive",
                        totalProducts: 0,
                        totalArticles: 0,
                        totalJobs: 0,
                        verified: false
                    });
                    setSignUpModal(false);
                    if (!alertMsg) { setSignInModal(false) }
                // }
            })
            .catch((error) => { setAlertMsg(error.message); setAlertModal(true) });
    }

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => { setAlertMsg(error.message); setAlertModal(true) });
        if (!alertMsg) { setSignInModal(false) }
    }

    return (
        <>
            {auth.currentUser ?
                <div className="signOutChild">
                    <span className="">Switch Account</span>
                    <span onClick={() => auth.signOut()} className="SignOut">SignOut</span>
                </div>
                : <button onClick={() => { handleModal(setSignInModal, true) }} className="signin">Sign in</button>
            }

            <div className={`signup-modal modal_show_${signUpModal}`}>
                <div className="logo-close">
                    <div className="logo-signin">
                        <img src="/images/Logo-1.png" alt="hairrrs logo" />
                    </div>
                    <div onClick={() => { handleModal(setSignUpModal, false) }} className="close">&times;</div>
                </div>
                <div className="contents">
                    <div className="signup-form">
                        <form onSubmit={(e) => { e.preventDefault(); signUp() }}>
                            <input value={fullName} onChange={(e) => { setFullName(e.target.value) }} type="text" placeholder="Full name" className="email" required />
                            <hr className="HomeHr" />
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" className="email" required />
                            <hr className="HomeHr" />
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="true" placeholder="Password" className="email" required />
                            <hr className="HomeHr" />
                            <input type="password" autoComplete="true" placeholder="Confirm password" id="confirmPassword" className="email" required />
                            <hr className="HomeHr" />

                            <div className="others">
                                <span>Recover password</span>
                                <br />
                                <button type="submit" className="signinbtn-1">Sign up</button>
                            </div>

                            <div className="others-1">
                                <span>Sign up with</span>
                                <br />
                                <div className="justify">
                                    <button className="signinbtn">
                                        <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
                                    <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle() }}>
                                        <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google</button>
                                </div>
                            </div>

                            <div className="others-2">
                                Already Registered? &nbsp;
                                    <button onClick={(e) => { e.preventDefault(); handleModal(setSignInModal, true); handleModal(setSignUpModal, false) }} className="signinbtn-1">Sign in</button>
                            </div>
                        </form>
                    </div>
                    <div className="image">
                        <img src="/images/11a11585cec9fb88054ea71c21cbf4ea.png" alt="" className="" />
                    </div>
                </div>
            </div>

            <div className={`signin-modal modal_show_${signInModal}`}>
                <div className="logo-close">
                    <div className="logo-signin">
                        <img src="/images/Logo-1.png" alt="hairrrs logo" />
                    </div>
                    <div onClick={() => { handleModal(setSignInModal, false) }} className="close">&times;</div>
                </div>
                <div className="contents">
                    <div className="signin-form">
                        <form onSubmit={(e) => { e.preventDefault(); signIn() }}>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" className="email" required />
                            <hr className="HomeHr" />
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="true" placeholder="Password" className="email" required />
                            <hr className="HomeHr" />

                            <div className="others">
                                <span>Recover password</span>
                                <br />
                                <button type="submit" className="signinbtn-1">Sign in</button>
                            </div>

                            <div className="others-1">
                                <span>Sign in with</span>
                                <br />
                                <div className="justify">
                                    <button className="signinbtn">
                                        <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
                                    <button className="signinbtn" onClick={(e) => { e.preventDefault(); signInWithGoogle() }}>
                                        <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google
                                    </button>
                                </div>
                            </div>

                            <div className="others-2">
                                Not Registered? &nbsp;
                                    <button onClick={(e) => { e.preventDefault(); handleModal(setSignInModal, false); handleModal(setSignUpModal, true) }} className="signinbtn-1">Signup</button>
                            </div>
                        </form>
                    </div>
                    <div className="image">
                        <img src="/images/11a11585cec9fb88054ea71c21cbf4ea.png" alt="" className="" />
                    </div>
                </div>
            </div>

            <div className={`signinalert modal_show_${alertModal}`}>
                <div className="container">
                    <div onClick={() => { handleModal(setAlertModal, false) }} className="close">&times;</div>
                    <div className="logins">
                        <div className="info-1">
                            <p>{alertMsg}</p>
                            <p className="btn underline" onClick={() => { handleModal(setAlertModal, false) }}>Try again?</p>
                        </div>
                        <div className="others-1">
                            <span>You can also signin with</span>
                            <br />
                            <div className="justify">
                                <button className="signinbtn">
                                    <img src="/images/Icon awesome-facebook-f.svg" alt="facebook icon hairrrs" />Facebook</button>
                                <button className="signinbtn">
                                    <img src="/images/Icon ionic-logo-google.svg" alt="google icon hairrrs" />Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Auth
