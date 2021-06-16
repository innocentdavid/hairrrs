import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import VerifyAccount from './VerifyAccount';
import Business from './Business';

function SettingsPage() {
    const [user, setUser] = useState([])
    const currentUser = auth.currentUser
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

    const [photoURL, setPhotoURL] = useState(null)
    const [coverPhotoURL, setCoverPhotoURL] = useState(null)
    const [photoURLPrevw, setPhotoURLPrevw] = useState(null)
    const [coverPhotoURLPrevw, setCoverPhotoURLPrevw] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState(null)
    const [userName, setUserName] = useState('')
    const [aboutBusiness, setAboutBusiness] = useState('')
    const [website, setWebsite] = useState('')
    const [services, setServices] = useState([]) // list of services
    const [country, setCountry] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [fullName, setFullName] = useState('')
    const [reqToDelAcc, setReqToDelAcc] = useState('')
    // list of settings like pushNotification, emailNot..., messageNot..., showAnalystics, appAutoUpdate, usePhNumbAsCNumb
    const [phoneNumberAsContactNo, setPhoneNumberAsContactNo] = useState(false)
    const [toggleAnalystics, setToggleAnalystics] = useState(false)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [messageNotifications, setMessageNotifications] = useState(false)
    const [emailNotifications, setEmailNotifications] = useState(false)
    const [appAutoUpdate, setAppAutoUpdate] = useState(false)

    useEffect(() => {
        if (user) {
            setPhotoURL(user.photoURL)
            setCoverPhotoURL(user.coverphotoURL)
            setPhotoURLPrevw(user.photoURL)
            setCoverPhotoURLPrevw(user.coverphotoURL)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setGender(user.gender)
            setUserName(user.userName)
            setAboutBusiness(user.aboutsetAboutBusiness)
            setWebsite(user.Website)
            setServices(user.services)
            setCountry(user.country)
            setLocation(user.location)
            setAddress(user.address)
            setFullName(user.fullName)
            setPhoneNumberAsContactNo(user.phoneNumberAsContactNo)
            setReqToDelAcc(user.reqToDelAcc)
            setDob(user.dob)
            setPhoneNumber(user.phoneNumber)
            setToggleAnalystics(user.toggleAnalystics)
            setPushNotifications(user.pushNotifications)
            setMessageNotifications(user.messageNotifications)
            setEmailNotifications(user.emailNotifications)
            setAppAutoUpdate(user.appAutoUpdate)
        }
    }, [user])

    const updateAccount = () => {
        var data = {
            firstName, lastName, phoneNumber, dob, gender, userName, aboutBusiness, website, services, country, location, address, fullName, reqToDelAcc, photoURL, coverPhotoURL
        }
        console.log({ data })

        // if(auth.currentUser && user?.email){
        //     db.collection('users').doc(auth.currentUser?.uid).update(data)
        //     console.log('updated')
        // }else{ console.log('error') }
    }

    const deleteAccount = async () => {
        if (auth.currentUser) {
            if (window.confirm('Are you sure?')) {
                db.collection('reqToDelAcc').doc(auth.currentUser?.uid).set({
                    uid: auth.currentUser?.uid,
                    email: auth.currentUser?.email,
                    phoneNumber: auth.currentUser?.phoneNumber,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                db.collection('users').doc(auth.currentUser?.uid).update({ requestedDeleteAcc: true })
            }
        } else { alert('You can\'t delete an account you don\'t have') }
    }

    const cancilRequestedDeleteAcc = () => {
        db.collection('users').doc(auth.currentUser?.uid).update({ requestedDeleteAcc: false })
    }


    return (
        <>
            <div className="layout1" style={{ height: 'auto', background: 'white', fontSize: '25px' }}>
                <button onClick={updateAccount} className="saveBtn" style={{ position: 'fixed', bottom: '50px', right: '200px' }}>Update</button>
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

                    {/* display-picture */}
                    <div className="display-picture">
                        <input
                            onChange={(e) => {
                                setPhotoURLPrevw(URL.createObjectURL(e.target.files[0]))
                                setPhotoURL(e.target.files[0]);
                            }}
                            type="file" id="chooseProfilePics" hidden />
                        <label htmlFor="chooseProfilePics" style={{ cursor: 'pointer' }}>
                            <div className="d-photo">
                                <img id="profilePics" src={photoURLPrevw} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            </div>
                        </label>

                        <span className='txt'>Profile picture</span>
                    </div>

                    {/* cover-picture */}
                    <>
                        <input
                            onChange={(e) => {
                                setCoverPhotoURL(e.target.files[0])
                                setCoverPhotoURLPrevw(URL.createObjectURL(e.target.files[0]))
                            }}
                            type="file" id="chooseCoverPics" hidden />
                        <label htmlFor="chooseCoverPics" style={{ cursor: 'pointer' }}>
                            <div className="cover">
                                <img id="coverPics" src={coverPhotoURLPrevw} alt="" style={{ width: '100%', height: '100%' }} />
                            </div>
                        </label>
                        <span className='txt'>Cover picture</span>
                    </>

                    {/* first Name and lastname */}
                    <div className="details-user">
                        <div className="registration-form">
                            <span className='txt'>First name</span>
                            <br />
                            <input id="firstName"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                type="text" className="firstname" />
                        </div>

                        <div className="registration-form">
                            <span className='txt'>Last name</span>
                            <br />
                            <input id="lastName"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                                type="text" className="firstname" />
                        </div>
                    </div>

                    <div className="order-form">
                        {/* email */}
                        <div className="margin-top">
                            <span className='txt'>Email</span>
                            <br />
                            <input
                                value={user?.email}
                                type="email" className="classctl" disabled />
                        </div>

                        {/* phone number */}
                        <div className="margin-top">
                            <span className='txt'>Phone Number</span>
                            <br />
                            <input id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                                type="tel" className="classctl" />

                            <div className="system" style={{ marginTop: 0 }}>
                                <b>Use as contact number</b>
                                <input id="phoneNumberAsContactNo"
                                    value={phoneNumberAsContactNo}
                                    onChange={(e) => { setPhoneNumberAsContactNo(e.target.value) }}
                                    type="checkbox" checked="checked" />
                            </div>
                        </div>

                        {/* birthday */}
                        <div className="margin-top">
                            <span className='txt'>Birthday</span>
                            <br />
                            <input id="dob"
                                value={dob}
                                onChange={(e) => { setDob(e.target.value) }}
                                type="date" className="classctl" />
                        </div>

                        {/* gender */}
                        <div className="selection">
                            <span className='txt'>Gender</span>
                            <div className="selector">
                                <input id="gender"
                                    value={gender}
                                    onChange={(e) => { setGender(e.target.value) }}
                                    type="text" placeholder="---" />
                                <div id="selecticon">&#10094;</div>
                            </div>
                            <div className="options">
                                <ul>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </ul>
                            </div>
                        </div>

                        <Business
                            userName={userName} setUserName={setUserName} aboutBusiness={aboutBusiness} setAboutBusiness={setAboutBusiness} website={website} setWebsite={setWebsite} services={services} setServices={setServices}
                        />

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
                                    onChange={(e) => { setToggleAnalystics(!toggleAnalystics) }}
                                    type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <h2>Location</h2>

                        {/* country */}
                        <div className="selection">
                            <span className='txt'>Country</span>
                            <div className="selector">
                                <input id="country"
                                    value={country}
                                    onChange={(e) => { setCountry(e.target.value) }}
                                    type="text" placeholder="---" />
                                <div id="selecticon">&#10094;</div>
                            </div>
                            <div className="options">
                                <ul>
                                    <option value="1">Germany</option>
                                    <option value="2">Ghana</option>
                                    <option value="3">Usa</option>
                                    <option value="4">Nigeria</option>
                                    <option value="5">Korea</option>
                                    <option value="6">China</option>
                                    <option value="7">Japan</option>
                                    <option value="8">Italy</option>
                                </ul>
                            </div>
                        </div>

                        {/* location */}
                        <div className="selection">
                            <span className='txt'>Location</span>
                            <div className="selector">
                                <input id="location"
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value) }}
                                    type="text" placeholder="---" />
                                <div id="selecticon">&#10094;</div>
                            </div>
                            <div className="options">
                                <ul>
                                    <option value="1">Abia</option>
                                    <option value="2">Adamawa</option>
                                    <option value="3">Akwa ibom</option>
                                    <option value="4">Anambra</option>
                                    <option value="5">Bauchi</option>
                                    <option value="6">Bayelsa</option>
                                    <option value="7">Benue</option>
                                    <option value="8">Bornu</option>
                                </ul>
                            </div>
                        </div>

                        {/* address */}
                        <div className="margin-top">
                            <span className='txt'>Address</span>
                            <br />
                            <input
                                id="address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                type="text" className="classctl" />
                        </div>

                        <h2>Notification</h2>
                        <>
                            {/* push notification */}
                            <div className="knobstxt">
                                <span><span className='txt'>Push Notifications</span></span>
                                <label className="switch">
                                    <input
                                        value={pushNotifications}
                                        onChange={(e) => { setPushNotifications(e.target.value) }}
                                        type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* email notification */}
                            <div className="knobstxt">
                                <span><span className='txt'>Email Notifications</span></span>
                                <label className="switch">
                                    <input
                                        value={emailNotifications}
                                        onChange={(e) => { setEmailNotifications(e.target.value) }}
                                        type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* message notification */}
                            <div className="knobstxt">
                                <span><span className='txt'>Message Notifications</span></span>
                                <label className="switch">
                                    <input
                                        value={messageNotifications}
                                        onChange={(e) => { setMessageNotifications(e.target.value) }}
                                        type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </>

                        <span><h2>App</h2></span>

                        {/* Auto app update */}
                        <div className="knobstxt">
                            <span><span className='txt'>Auto app update</span></span>
                            <label className="switch">
                                <input
                                    value={appAutoUpdate}
                                    onChange={(e) => { setAppAutoUpdate(e.target.value) }}
                                    type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <h2>Password</h2>

                        {/* Current Password */}
                        <div className="margin-top">
                            <span className='txt'>Current password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>

                        {/* New Password */}
                        <div className="margin-top">
                            <span className='txt'>New password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>

                        {/* Confirm Password */}
                        <div className="margin-top">
                            <span className='txt'>Confirm password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>


                        {user && <VerifyAccount user={user} />}

                        <h2>Delete account</h2>

                        <>
                            <p>Account will be deactivated and <span>deleted after 10days</span> if delete request is not cancelled.</p>
                            <p><span>Note:all account informations will be lost after account is deleted</span></p>
                            <div className="margins-top" style={{ marginTop: '-40px' }} />
                            <div className="requestdoc">
                                {!user?.requestedDeleteAcc ?
                                    <button onClick={deleteAccount}>Request delete</button> :
                                    <div className="d-flex align-items-center">
                                        <span style={{ color: 'red', marginRight: '10px' }}>Your request is under process</span>
                                        <button className="btnSolid" style={{ cursor: 'pointer' }} onClick={cancilRequestedDeleteAcc}>Cancil</button>
                                    </div>
                                }
                            </div>
                        </>
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
