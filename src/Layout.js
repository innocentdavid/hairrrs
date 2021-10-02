import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import SideProfileSection from './SideProfileSection';
import { topFunction } from './fuctions';
import MyImage from './components/MyImage';
import AuthUser from './components/AuthUser/AuthUser';

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

    return (<>
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
                                    <SideProfileSection />
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

            {/* AuthUser */}
            <div className="signinModal">
                <AuthUser />
            </div>

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
    </>)
}

export default Layout
