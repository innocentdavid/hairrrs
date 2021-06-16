import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './components/Auth';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getRandomInt, topFunction } from './fuctions';

function Layout({ children }) {
    const params = new URLSearchParams(window.location.search);
    var scrollTo = params.get('scrollTo')
    var el = document.querySelector(`#${scrollTo}`);

    useEffect(() => {
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [el]);

    const location = useLocation();
    const [user] = useAuthState(auth)

    const [signOutBox, setSignOutBox] = useState(false);

    const handleDisplay_signOutBox = () => { setSignOutBox(!signOutBox) }

    const locationCheck = () => {
        let locationN = (location.pathname).toLowerCase()
        if (locationN === '/create-article') { return false }
        if (locationN === '/settings') { return false }
        return true
    }

    const [cUserPhotoURL, setCUserPhotoURL] = useState(process.env.REACT_APP_DEFAULT_USER_PHOTO_URL)
    useEffect(() => {
        if(user && user.photoURL){
            setCUserPhotoURL(user.photoURL)
        }
    }, [user])



    return (
        <>
            <Header />
            <div className="layout">

                {/* SideBar */}
                <div className="mainLayoutCont">
                    <div className="div1">
                        {locationCheck() &&
                            <div className="ly0">
                                <div className="f-sidebar">
                                    <div className="f-child"></div>
                                    <div className="layout1">
                                        <div className="accord--profile">
                                            <div className="user--photo">
                                                {user &&
                                                    <>
                                                        <Link to='/profile'>
                                                            <img src={cUserPhotoURL} alt="" className="user" />
                                                        </Link>
                                                &nbsp;&nbsp;
                                                <div className="fullname">
                                                            <div className="d-flex justify-center align-items-center">{user.displayName}</div>
                                                            {signOutBox ? <i className="fa fa-angle-up" aria-hidden="true" onClick={handleDisplay_signOutBox} ></i>
                                                                : <i className="fa fa-angle-down" aria-hidden="true" onClick={handleDisplay_signOutBox} ></i>}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            {auth.currentUser &&
                                                <div className={`display_signOutBox slideOutLeftAnim_${signOutBox} display_signOutBox_${signOutBox}`}>
                                                    <div className="signOutBox">
                                                        <Auth key={user} />
                                                    </div>
                                                </div>
                                            }
                                            <div className="profile">
                                                <ul>
                                                    <Link to="/profile">Analystics</Link>
                                                    <Link to="/profile">Products</Link>
                                                    <Link to="/profile">Job Vacancies</Link>
                                                    <Link to="/profile">Articles</Link>
                                                </ul>
                                            </div>
                                            <div className="signclass">
                                                {!auth.currentUser && <Auth key={getRandomInt(10000000000)} />}
                                            </div>
                                        </div>
                                        <div className="layout1a">

                                            <Link to="#" ><div className="shopper9">
                                                <div className="user-display">
                                                    <img src="/images/user.png" alt="" />
                                                    <span className="tooltiptext">Chizzyfix</span>
                                                </div>
                                                <div className="imgbox1">
                                                    <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="" />
                                                    <div className="learnmore">
                                                        <div className="website">trytune.com/about</div>
                                                        <div className="learn-more">Learn more</div>
                                                    </div>
                                                    <div className="details1">
                                                        <h2>How to braid hair in 3 minutes. 6steps</h2>
                                                        <div className="informations">
                                                            <span className="info">Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="div2">
                        {/* main page */}
                        <div id="mainCont">{children}</div>
                    </div>
                </div>


                {/* modals */}

                <div className="floater">
                    <div className="support"><span>Support</span>
                        <img src="/images/support-icon.svg" alt="hairrrs comment icon" />
                    </div>
                    <div className="scrolltotop" onClick={() => { topFunction() }}>
                        <img src="/images/Icon feather-chevron-down.svg" alt="scroll up button" />
                    </div>
                </div>
                {/* modals */}
            </div>
        </>
    )
}

export default Layout
