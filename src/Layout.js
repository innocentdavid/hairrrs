import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import SideProfileSection from './SideProfileSection';
import { topFunction } from './fuctions';
import { auth } from './firebase';

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
    const locationCheck = () => {
        let locationN = (location.pathname).toLowerCase()
        if (locationN === '/create-article') { return false }
        if (locationN === '/settings') { return false }
        return true
    }

    const [openAuthModal, setOpenAuthModal] = useState(false)
    const [openLogInOrReg, setOpenLogInOrReg] = useState(false)
    const [openLoading, setOpenLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if (authUser) {
                setOpenLogInOrReg(false)
                setOpenLoading(false)
            }else{
                setOpenLogInOrReg(true)
            }
        })      
        return () => { unsubscribe() }
      }, []);


    return (
        <>
            {openLogInOrReg && <div style={{
                position: 'fixed',
                top: "160px",
                left: 5,
                width: '250px',
                background: "white",
                marginRight: "10px",
                paddingTop: "20px",
                paddingBottom: "40px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                zIndex: 21
            }}>
                <button
                    onClick={() => { setOpenAuthModal(true); setOpenLoading(true) }}
                    className="signin"
                    style={{ margin: "20px 0", cursor: 'pointer' }}
                >login / reg</button>
                
                {openLoading && <img src="/images/kloader.gif" alt="" style={{ position: 'fixed', zIndex: '26', width: '100px', height: '100px' }} />}
            </div>}

            {openAuthModal && <Auth setOpenAuthModal={setOpenAuthModal} setOpenLogInOrReg={setOpenLogInOrReg} />}

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

                                        {!openLogInOrReg && <SideProfileSection setOpenLogInOrReg={setOpenLogInOrReg} />}

                                        <div className={openLogInOrReg ? "layout1a mt-130" : "layout1a" }>
                                            <Link to="#" ><div className="shopper9">
                                                <div className="user-display">
                                                    <img src="/images/user?.png" alt="" />
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
                    {/* main page */}
                    <div className="div2">
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
