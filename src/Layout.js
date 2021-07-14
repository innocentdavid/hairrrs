import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import SideProfileSection from './SideProfileSection';
import { topFunction } from './fuctions';
import MyImage from './components/MyImage';

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
        if (locationN === '/add-product') { return false }
        if (locationN === '/add-job') { return false }
        if (locationN === '/settings') { return false }
        return true
    }

    const [openAuthModal, setOpenAuthModal] = useState(false)
    const [openLogInOrReg, setOpenLogInOrReg] = useState(false)


    return (
        <>
            {openLogInOrReg && <div className="login" style={{
                position: 'fixed',
                top: "175px",
                left: 30,
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
                    onClick={() => { setOpenAuthModal(true) }}
                    className="signin"
                    style={{ margin: "20px 0", cursor: 'pointer' }}
                >login / reg</button>
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

                                        {!openLogInOrReg && <SideProfileSection
                                            setOpenLogInOrReg={setOpenLogInOrReg}
                                            setOpenAuthModal={setOpenAuthModal}
                                        />}

                                        <div className={openLogInOrReg ? "layout1a mt-130" : "layout1a"}>
                                            <Link to="#" ><div className="shopper9">
                                                <div className="user-display">
                                                    <MyImage
                                                        src={"/images/user?.png"}
                                                        width=''
                                                        height=''
                                                        alt=""
                                                        className=""
                                                    />
                                                    <span className="tooltiptext">Chizzyfix</span>
                                                </div>
                                                <div className="imgbox1">
                                                    <MyImage
                                                        src={"/images/0_NEgmVl2J_RRzI9Sr.jpg"}
                                                        width=''
                                                        height=''
                                                        alt=""
                                                        className=""
                                                    />
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
                        <MyImage
                            src={"/images/support-icon.svg"}
                            width=''
                            height=''
                            alt="hairrrs comment icon"
                            className=""
                        />
                    </div>
                    <div className="scrolltotop" onClick={() => { topFunction() }}>
                        <MyImage
                            src={"/images/Icon feather-chevron-down.svg"}
                            width=''
                            height=''
                            alt="hairrrs comment icon"
                            className=""
                        />
                    </div>
                </div>
                {/* modals */}
            </div>
        </>
    )
}

export default Layout
