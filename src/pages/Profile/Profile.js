import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase';
import Analystics from './Components/Analystics';
import ResumeTab from './Components/ResumeTab';
import ShareAnalysis from './Components/ShareAnalysis';
import FollowingTab from './Components/FollowingTab';
import TotalEngagement from './Components/TotalEngagement';
import LoungeUsers from './Components/LoungeUsers';
import FollowersTab from './Components/FollowersTab';

function Profile() {
    const history = useHistory();
    if (!auth.currentUser) { history.push('/') }

    const [user, setUser] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })

    useEffect(() => {
        if (currentUser) {
            var uid = currentUser.uid
            const params = new URLSearchParams(window.location.search);
            if (params.has('uid')) {
                if (params.get('uid') === '') { history.push('/') }
                uid = params.get('uid')
            }
            if (uid) {
                db.collection('users').doc(uid)
                    .onSnapshot(doc => {
                        let result = ({ ...doc.data(), id: doc.id });
                        setUser(result);
                    });
            }
        }
    }, [currentUser, history])



    const [totalFollowers, setTotalFollowers] = useState(0)
    const [totalFollowing, setTotalFollowing] = useState(0)

    // setTotalFollowers
    useEffect(() => {
        const unsubscribe = () => {
            if (user) {
                db.collection('users').doc(user.uid).collection('follower').onSnapshot((snapshot) => {
                    setTotalFollowers((snapshot.docs.map(doc => doc.data())).length)
                });
                db.collection('users').doc(user.uid).collection('following').onSnapshot((snapshot) => {
                    setTotalFollowing((snapshot.docs.map(doc => doc.data())).length)
                });
            }
        }
        unsubscribe();
    }, [user])

    const [showResumeTab, setShowResumeTab] = useState(false)
    const [showAnalystics, setShowAnalystics] = useState(false)
    const [showShareAnalysis, setShowShareAnalysis] = useState(false)
    const [showFollowingTab, setShowFollowingTab] = useState(false)
    const [showfollowersTab, setShowfollowersTab] = useState(false)


    return (
        <div className="layout" style={{ marginTop: 0 }}>
            <Helmet>
                <title>{`${user && (user.displayName)?.replace(/\b(\w)/g, s => s.toUpperCase())} - Hairrrs`}</title>
                <meta name="description" content="Everything Hairs" />
                <meta property="og:title" content={`${user && user.displayName} - Hairrrs`} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/profile`} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Everything Hairs" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>

            <div className="layout2" style={{ paddingBottom: '40px' }}>

                {/* cover image */}
                <div className="contnr" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    {!user?.coverPhotoURL &&
                        <div style={{ padding: '10px 20px', background: 'white'}}>complete your profile</div>
                    }

                    {user?.coverPhotoURL && <img id="trigger" src={user?.coverPhotoURL} alt="" onClick={() => { document.querySelector('#mymodal').style.display = 'block' }} />}

                    <div id="mymodal" className="modal" onClick={() => { document.querySelector('#mymodal').style.display = 'none' }}>
                        <img src={user?.coverPhotoURL} alt="" />
                        <span className="closeicon">&times;</span>
                    </div>
                </div>

                {/* profile details */}
                <div className="contnr-1">
                    {/* profile pics */}
                    <div className="b-photo">
                        {user && <img id="trigger-profile" src={user.photoURL} alt="" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'block' }} />}

                        <div id="mymodal-profile" className="modal" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'none' }}>
                            <img src={user.photoURL} alt="" />
                            <span className="closeprofile" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'none' }}>&times;</span>
                        </div>
                    </div>
                    <div className="verified">&#10004;</div>

                    {/* profile name, email, services, website, locate */}
                    <div className="data-info">
                        <div className="container">
                            <div className="business-name" style={{ textTransform: 'capitalize' }}>
                                {user?.displayName}
                            </div>
                            <div className="email-address">
                                {user?.email}
                            </div>
                            <br />
                        </div>

                        <div className="descriptive-infos" style={{ justifyContent: 'flex-start' }}>
                            {user?.bio && <p>
                                <strong>Bio:</strong>
                                {user?.bio}
                            </p>}

                            <div className="catalogue" style={{ width: '100%' }}>
                                <h>Beauty company</h>
                                <h>Blog</h>
                                
                                {user?.website && <><img src="images/Icon material-web.svg" alt="web" />
                                <span>{user?.website}</span></>}

                                <div className="locate-icon">
                                    <img src="images/location-icon.svg" alt="locate icon ohyanga" />
                                </div><span>Locate</span>
                            </div>
                        </div>
                    </div>

                    <div className="control-class" style={{ marginTop: '3rem' }}>
                        <div className="container-2">
                            <div className="btn-msg">
                                <Link to="/go-premium" ><div className="message">Go premium</div></Link>
                            </div>
                            <div className="btn-flw">
                                <Link to="/promotion-manager" ><div className="userbtn">Promotions</div></Link>
                            </div>
                            <div className="btn-folowers">
                                <Link to="/contest-reg" ><div className="userbtn">Become a Contestant</div></Link>
                            </div>
                            <div className="btn-folowers">
                                <Link to="/settings" >
                                    <div className="userbtn-1">
                                        <img src="images/Icon-settings.png" alt="setting icon" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <LoungeUsers />

                <div className="business-statistics">
                    <div className="stats-0">
                        <Link to="/add-product" ><div className="box-3">
                            <img src="images/icon-add-product.png" alt="" className="" /><h2>sell product</h2>
                        </div></Link>
                        <Link to="/add-job"><div className="box-3">
                            <img src="images/icon-add-job.png" alt="" className="" /><h2>upload job vacancy</h2>
                        </div></Link>
                        <Link to="/create-article"><div className="box-3">
                            <img src="images/icon-add-article.png" alt="" className="" /><h2>Write an article</h2>
                        </div></Link>
                    </div>

                    <div className="stats-0">
                        <div className="box-1" onClick={() => { setShowfollowersTab(!showfollowersTab) }}>
                            <h3>{totalFollowers}</h3><h2>followers</h2>
                        </div>
                        <div className="box-1" onClick={() => { setShowFollowingTab(!showFollowingTab) }}>
                            <h3>{totalFollowing}</h3><h2>following</h2>
                        </div>
                        <div className="box-1">
                            <h3>2.6</h3><h2>total rating</h2>
                        </div>
                    </div>

                    <div className="stats-0">
                        <div className="box-5">
                            <Link to="#" ><h3>{user?.totalProducts ? user.totalProducts : 0}</h3><h2>products</h2></Link>
                        </div>
                        <span><div className="box-5">
                            <Link to='#'><h3>{user?.totalJobs ? user.totalJobs : 0}</h3><h2>job vacancies</h2></Link>
                        </div></span>
                        <div className="box-5">
                            <Link to='#'><h3>{user?.totalArticles ? user.totalArticles : 0}</h3><h2>articles</h2></Link>
                        </div>
                    </div>
                </div>
                <div className="stats-2">
                    <div id="resumebtn" className="box-00" onClick={() => { setShowResumeTab(!showResumeTab) }}>
                        {/* <img src="images/resume-img.svg" alt="resume image" /> */}
                        <img src="images/resume-img.svg" alt="resume" />
                        <h2>View resume</h2>
                    </div>
                </div>
            </div>

            <TotalEngagement />
            {showShareAnalysis && <ShareAnalysis setShowShareAnalysis={setShowShareAnalysis} />}
            {showfollowersTab && <FollowersTab setShowfollowersTab={setShowfollowersTab} />}
            {showFollowingTab && <FollowingTab setShowFollowingTab={setShowFollowingTab} />}
            {showResumeTab && <ResumeTab setShowResumeTab={setShowResumeTab} />}
            {showAnalystics && <Analystics setShowAnalystics={setShowAnalystics} />}
        </div>
    )
}

export default Profile
