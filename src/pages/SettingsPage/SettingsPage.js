import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase'

function SettingsPage() {
    var authUser;
    auth.onAuthStateChanged(aUser => {
        authUser = aUser
    })

    const [user, setUser] = useState([])

    let uid = auth.currentUser?.uid
    useEffect(() => {
        console.log(uid)
        if(uid){
            db.collection('users').doc(uid).get().then(doc => {
                let result = ({ ...doc.data(), id: doc.id });
                setUser({...result});
            });
        }
    }, [uid])

    console.log(user?.displayName)

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
    const [docForVerification, setDocForVerification] = useState(null)
    const [reqToDelAcc, setReqToDelAcc] = useState('')
    // list of settings like pushNotification, emailNot..., messageNot..., showAnalystics, appAutoUpdate, usePhNumbAsCNumb
    const [settings, setSettings] = useState([])

    const updateAccount = () => {
        var coverPhotoURL = document.querySelector('#profilePics').src
        var photoURL = document.querySelector('#profilePics').src
        var firstName = document.querySelector('#firstName').src
        var lastName = document.querySelector('#lastName').src
        var phoneNumber = document.querySelector('#phoneNumber').src
        var dob = document.querySelector('#dob').src
        var gender = document.querySelector('#gender').src
        var userName = document.querySelector('#userName').src
        var aboutBusiness = document.querySelector('#aboutBusiness').src
        var website = document.querySelector('#website').src
        var services = document.querySelector('#services').src
        var country = document.querySelector('#country').src
        var location = document.querySelector('#location').src
        var address = document.querySelector('#address').src
        var fullName = document.querySelector('#fullName').src
        var docForVerification = document.querySelector('.docForVerification').src
        var reqToDelAcc = document.querySelector('#reqToDelAcc').src
        var settings = document.querySelector('#settings').src

        var data = {
            firstName,lastName,phoneNumber,dob,gender,userName,aboutBusiness,website,services,country,location,address,fullName,docForVerification,reqToDelAcc,settings,photoURL,coverPhotoURL
        }
        console.log({data})
        
        // if(auth.currentUser && user?.email){
        //     db.collection('users').doc(auth.currentUser.uid).update(data)
        //     console.log('updated')
        // }else{ console.log('error') }
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

                    <div className="display-picture">
                        <div className="d-photo">
                            <img id="profilePics" src={user?.photoURL ? user.photoURL : process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        </div>
                        <span className='txt'>Profile picture</span>
                    </div>

                    <div className="cover">
                        <img id="coverPics" src={user?.coverPhotoURL} alt="" style={{ width: '100%', height: '100%' }}/>
                    </div>
                    <span className='txt'>Cover picture</span>

                    <div className="details-user">
                        <div className="registration-form">
                            <span className='txt'>First name</span>
                            <br />
                            <input id="firstName"
                                value={user?.firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                type="text" className="firstname" />
                        </div>

                        <div className="registration-form">
                            <span className='txt'>Last name</span>
                            <br />
                            <input id="lastName"
                                value={user?.lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                                type="text" className="firstname" />
                        </div>
                    </div>

                    <div className="order-form">

                        <div className="margin-top">
                            <span className='txt'>Email</span>
                            <br />
                            <input
                                value={user?.email}
                                type="email" className="classctl" disabled />
                        </div>

                        <div className="margin-top">
                            <span className='txt'>Phone Number</span>
                            <br />
                            <input type="tel" className="classctl" />
                            <div className="system" style={{ marginTop: 0 }}>
                                <b>Use as contact number</b>
                                <input
                                id="phoneNumber"
                                    value={user?.phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                    type="checkbox" checked="checked" />
                            </div>
                        </div>

                        <div className="margin-top">
                            <span className='txt'>Birthday</span>
                            <br />
                            <input id="dob"
                                value={user?.dob}
                                onChange={(e) => { setDob(e.target.value) }}
                                type="date" className="classctl" />
                        </div>

                        <div className="selection">
                            <span className='txt'>Gender</span>
                            <div className="selector">
                                <input id="gender"
                                    value={user?.gender}
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



                        <h2>Business</h2>

                        <div className="margin-top">
                            <span className='txt'>Username</span> http://www.Ohyanga.com/username
                        <br />
                            <input id="userName"
                                value={user?.userName}
                                onChange={(e) => { setUserName(e.target.value) }}
                                type="text" className="classctl" />
                        </div>

                        <div className="margin-top">
                            <span className='txt'>About business</span>
                            <br />
                            <input id="aboutBusiness"
                                value={user?.aboutBusiness}
                                onChange={(e) => { setAboutBusiness(e.target.value) }}
                                type="text" className="classctl" />
                        </div>

                        <div className="margin-top">
                            <span className='txt'>Website</span>
                            <br />
                            <input id="website"
                                value={user?.website}
                                onChange={(e) => { setWebsite(e.target.value) }}
                                type="url" className="classctl" />
                        </div>

                        <div className="margin-top">
                            <span className='txt'>Services</span>
                            <br />
                            <input id="services"
                                value={user?.services}
                                onChange={(e) => { setServices(e.target.value) }}
                                type="text" placeholder="Search service" className="classctl" />
                        </div>

                        <div className="catalogue" style={{ width: 'max-content' }}>
                            <span className='h'>Blog<span>&times;</span></span>
                        </div>

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
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <h2>Location</h2>

                        <div className="selection">
                            <span className='txt'>Country</span>
                            <div className="selector">
                                <input id="country"
                                    value={user?.country}
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

                        <div className="selection">
                            <span className='txt'>Location</span>
                            <div className="selector">
                                <input id="location"
                                    value={user?.location}
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

                        <div className="margin-top">
                            <span className='txt'>Address</span>
                            <br />
                            <input
                            id="address"
                                value={user?.address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                type="text" className="classctl" />
                        </div>

                        <h2>Notification</h2>
                        <>
                            <div className="knobstxt">
                                <span><span className='txt'>Push Notifications</span></span>
                                <label className="switch">
                                    <input type="che ckbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="knobstxt">
                                <span><span className='txt'>Email Notifications</span></span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="knobstxt">
                                <span><span className='txt'>Message Notifications</span></span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="knobstxt">
                                <span className='txt'>Push Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </>
                        
                        <span><h2>App</h2></span>
                        <div className="knobstxt">
                            <span><span className='txt'>Auto app update</span></span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <h2>Password</h2>
                        <div className="margin-top">
                            <span className='txt'>Current password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>
                        <div className="margin-top">
                            <span className='txt'>New password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>
                        <div className="margin-top">
                            <span className='txt'>Confirm password</span>
                            <br />
                            <input type="password" className="classctl" />
                        </div>

                        <h2>Verify Account</h2>
                        <div className="margin-top">
                            <span className='txt'>Full name</span>
                            <br />
                            <input id="fullName"
                            value={user?.fullName}
                            onChange={(e) => { setFullName(e.target.value) }}
                            type="text" className="classctl" />
                        </div>
                        <div className="margins-top">
                            <span className='txt'>Upload document</span>
                            <p>you have upload the jkf ocut ioi and scorf fodfg so let
                        us verify you well via documents uploads</p>
                            <br />

                            <form>
                                <input className="docForVerification"
                                value={user?.docForVerification}
                                onChange={(e) => { setDocForVerification(e.target.value) }}
                                type="file" id="fileupload" />
                                <label>Upload file</label>
                            </form>
                            <div className="requestdoc">
                                <label>Request</label>
                            </div>
                        </div>
                        <h2>Delete account</h2>
                        <p>Account will be deactivated and <span>deleted after 10days</span> if delete request is not cancelled.</p>
                        <p><span>Note:all account informations will be lost after account is deleted</span></p>
                        <div className="margins-top" style={{ marginTop: '-40px' }} />
                        <div className="requestdoc">
                            <label>Request</label>
                            <button>Delete</button>
                        </div>
                    </div>

                    <h2>About</h2>
                    <div className="logo-2">
                        <Link to="index.html" ><img src="images/hairrrs-Logo.png" alt="logo" style={{ width: '180px' }} /></Link>
                        <p>Ohyanga - Everything hair...</p>
                    </div>

                    <div className="marginx-top" style={{ fontWeight: '300px' }}>
                        <p>Why Ohyanga 'ispx' a platform designed to.shs and make things ejejheejkr</p>
                    </div>

                    <div className="marginx-top" style={{ fontWeight: '300' }}>
                        <p>Contact - <Link to="support@Ohyanga.com" ><span>support@Ohyanga.com</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage
