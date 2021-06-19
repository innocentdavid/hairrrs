import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase';
import VerifyAccount from './Components/VerifyAccount';
import Business from './Components/Business';
import ProfilePics from './Components/ProfilePics';
import CoverPics from './Components/CoverPics';
import PersonalInfo from './Components/PersonalInfo';
import Location from './Components/Location';
import NotificationSettings from './Components/NotificationSettings';
import ResetPassword from './Components/ResetPassword';
import DeleteAccount from './Components/DeleteAccount';

function SettingsPage() {
    const currentUser = auth.currentUser
    let history = useHistory()
    useEffect(() => {
        if (!currentUser) {
            history.push('/')
        }
    }, [currentUser, history])

    const [user, setUser] = useState([])
    useEffect(() => {
        if (currentUser) {
            let uid = auth.currentUser?.uid
            db.collection('users').doc(uid)
                .onSnapshot(doc => {
                    let result = ({ ...doc.data(), id: doc.id });
                    setUser({ ...result });
                });
        }
    }, [currentUser])

    // list of settings like pushNotification, emailNot..., messageNot..., showAnalystics, appAutoUpdate, usePhNumbAsCNumb
    const [toggleAnalystics, setToggleAnalystics] = useState(false)
    useEffect(() => {
        if (user) {
            setToggleAnalystics(user.toggleAnalystics)
        }
    }, [user])

    return (
        <>
            <div className="layout1" style={{ height: 'auto', background: 'white', fontSize: '25px' }}>
                <div className="accord-2">
                    <h6>Account</h6>
                    <h6>Business</h6>
                    <h6>Location</h6>
                    <h6>Notification</h6>
                    <h6>App</h6>
                    <h6>Password</h6>
                    <h6>Request verification</h6>
                    <h6>Delete Account</h6>
                    <h6>About</h6>
                    <h6>Terms of use</h6>
                    <h6>Privacy policy</h6>
                </div>
            </div>

            <div className="layout2" style={{ marginLeft: '300px' }}>
                <div className="according-vv">

                    <div className="account-1">
                        <h6>Account</h6>
                    </div>

                    <ProfilePics user={user} />
                    <CoverPics user={user} />

                    <PersonalInfo user={user} />

                    <div className="order-form">
                        <Business user={user} />

                        {/* Show/hide analystics */}
                        <div className="knobstxt">
                            <div className="knobflex">
                                <span><span className='txt'>Show/hide analystics</span></span>
                                <div className="info--support">
                                    This knob supports you either to keep your stats hidden from your visitors
                                    or shown to all by choice.
                                </div>
                                <img src="images/saturday-info-icon.svg" alt="info icon" className="infoicon" />
                            </div>
                            <label className="switch">
                                <input
                                    value={toggleAnalystics}
                                    onChange={(e) => {
                                        setToggleAnalystics(!toggleAnalystics);
                                        db.collection('users').doc(auth.currentUser?.uid).update({ toggleAnalystics: e.target.value });
                                    }}
                                    type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {user && <Location user={user} />}

                        {user && <NotificationSettings user={user} />}

                        {user && <ResetPassword user={user} />}

                        {user && <VerifyAccount key={user.uid} user={user} />}

                        <DeleteAccount />
                    </div>

                    <h2>About us</h2>

                    <>
                        <div className="logo-2">
                            <Link to="/" ><img src="images/hairrrs-Logo.png" alt="logo" style={{ width: '180px' }} /></Link>
                            <p>Ohyanga - Everything hair...</p>
                        </div>

                        <div className="marginx-top" style={{ fontWeight: '300px' }}>
                            <p><strong>Why Ohyanga?</strong> - it's a platform designed ...</p>
                        </div>

                        <div className="marginx-top" style={{ fontWeight: '300' }}>
                            <p>Contact - <Link to="support@Ohyanga.com" ><span>support@Ohyanga.com</span></Link></p>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default SettingsPage
