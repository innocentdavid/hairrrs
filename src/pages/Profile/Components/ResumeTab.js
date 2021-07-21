import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import UserProfile from '../../../components/UserProfile/UserProfile';
import { db } from '../../../firebase';
import { topFunction } from '../../../fuctions';
import Attachment from './Attachment'

function ResumeTab() {
    const [user, setUser] = useState([])
    const [editMode, setEditMode] = useState(false)
    const currentUser = UserProfile.getUser();
    var { userName } = useParams()
    const [openLoading, setOpenLoading] = useState(true)
    const [isOnline, setIsOnline] = useState(true)
    const history = useHistory();

    useEffect(() => {
        navigator.onLine ? setIsOnline(true) : setIsOnline(false)
    }, [])

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    function updateStatus(event) {
        if (navigator.onLine) {
            setIsOnline(true)
            alert('Your connection is back 😊')
        } else {
            setIsOnline(false)
            alert('You have lost your internet connection 😥')
        }
    }

    useEffect(() => {
        if (userName === currentUser?.userName) {
            setUser(currentUser)
            setEditMode(true)
        } else {
            setEditMode(false)
            db.collection('users')
                .where('userName', '==', userName)
                .onSnapshot((snapshot) => {
                    let r = snapshot.docs.map(doc => doc.data())
                    setUser(r)
                })
        }

        if (isOnline) {
            db.collection('resume').doc(user?.uid)
                .onSnapshot((snapshot) => {
                    if (!snapshot.empty) {
                        let r = snapshot.data()
                        if (r) {
                            setName(r?.name)
                            setOwner(r?.user)
                            setAbout(r?.about)
                            setSkills(r?.skills)
                            setInterests(r?.interests)
                            setExperience(r?.experience)
                            setEducation(r?.education)
                            setContactInformation(r?.contactInformation)
                        }
                        setOpenLoading(false)
                    }
                })
        } else { alert('Your have lost your internet connection 😥'); history.goBack() }
    }, [currentUser, history, isOnline, user, userName])

    const [name, setName] = useState('')
    const [owner, setOwner] = useState([])
    const [about, setAbout] = useState('')
    const [skills, setSkills] = useState([/*{ id: 0, content: '' }*/])
    const [interests, setInterests] = useState([])
    const [experience, setExperience] = useState([])
    const [education, setEducation] = useState([])
    const [contactInformation, setContactInformation] = useState([])

    const handleSubmit = async () => {
        setOpenLoading(true)
        let photoURL = user?.photoURLmax ? user?.photoURLmax : user?.photoURL;
        let data = {
            user: { uid: user?.uid, displayName: user?.displayName, userName: user?.userName, photoURL },
            name, about, skills, interests, experience, education, contactInformation
        }

        console.log(data)
        await db.collection('resume').doc(user?.uid).set(data)
        setEditMode(false)
        setOpenLoading(false)
    }

    useEffect(() => {
        topFunction()
    }, [])


    return (
        <div id="resumetab" className={`resume-cv ${!editMode ? 'resume-cv-edit' : ''}`}>
            {openLoading && <div className="loader" style={{ display: 'grid' }}>
                <img src="/images/loading.svg" alt="" />
            </div>}

            <Helmet>
                <title>{`${user && (user.displayName)?.replace(/\b(\w)/g, s => s.toUpperCase())} - Hairrrs`}</title>
                <meta name="description" content="Everything Hairs" />
                <meta property="og:title" content={`${user && user.displayName} - Hairrrs`} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/profile`} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Everything Hairs" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>

            <div className="container">
                <div className="header">
                    <div className="logo">
                        <Link to="/"><img src="/images/hairrrs-Logo.png" alt="Hairrrs" /></Link>
                    </div>
                    <div className="shareclass">
                        <div className="share">
                            <img src="images/Icon material-print.icon ohyanga" alt="" />
                        </div>
                        <div className="share">
                            <img src="images/Icon awesome-share-alt.icon ohyanga" alt="" />
                        </div>
                    </div>
                </div>
                <div className="title">Resume</div>
                <div className="accord-inline">
                    <div className="b-photo-1" style={{
                        marginRight: '50px'
                    }}>
                        {owner && <img src={owner?.photoURL} alt={owner?.userName} />}
                    </div>
                    {/* <div className="watermark">
                        from Hairrrs
                    </div> */}
                    <div className="details">
                        <div className="CV-INFO">
                            <txt>Name</txt>
                            <br />
                            <input
                                value={name}
                                onChange={(e) => { editMode && setName(e.target.value) }}
                                type="text"
                                style={{ width: '100%' }}
                                className="TEXTAREA1" />
                        </div>
                        <div className="CV-INFO">
                            <txt>About</txt>
                            <br />
                            <div className="ADDTEXT">
                                <textarea
                                    value={about}
                                    onChange={(e) => { editMode && setAbout(e.target.value) }}
                                    type="text" style={{
                                        height: '125px',
                                        width: '100%',
                                        border: '1px solid #c5c5c56e',
                                        resize: 'none',
                                        padding: 15,
                                        fontSize: '1rem',
                                        fontFamily: 'sans-serif'
                                    }}></textarea>
                            </div>
                        </div>
                        <div className="CV-INFO">
                            <txt>Skills</txt>
                            <br />
                            <div className="texthub">
                                <Attachment
                                    editMode={editMode}
                                    questions={skills} setQuestions={setSkills}
                                />
                            </div>
                        </div>

                        <div className="CV-INFO">
                            <txt>Interests</txt>
                            <br />
                            <div className="texthub">
                                <Attachment
                                    editMode={editMode}
                                    questions={interests} setQuestions={setInterests}
                                />
                            </div>
                        </div>

                        <div className="CV-INFO">
                            <txt>Experience</txt>
                            <br />
                            <div className="texthub">
                                <Attachment
                                    editMode={editMode}
                                    questions={experience} setQuestions={setExperience}
                                />
                            </div>
                        </div>

                        <div className="CV-INFO">
                            <txt>Education</txt>
                            <br />
                            <div className="texthub">
                                <Attachment
                                    editMode={editMode}
                                    questions={education} setQuestions={setEducation}
                                />
                            </div>
                        </div>

                        <div className="CV-INFO">
                            <txt>Contact information</txt>
                            <br />
                            <div className="texthub">
                                <Attachment
                                    editMode={editMode}
                                    questions={contactInformation} setQuestions={setContactInformation}
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />

                        {editMode && <>

                            <center><span onClick={handleSubmit} style={{
                                border: '1px solid red',
                                padding: '10px 15px',
                                cursor: 'pointer'
                            }}>save

                            </span></center>

                            <br />
                            <br />
                            <br />
                        </>}

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResumeTab
