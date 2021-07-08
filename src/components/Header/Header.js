import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Messages from './Component/Messages';
import Notification from './Component/Notification';
import SaveList from './Component/SaveList';
import Search from './Component/Search';
import UpArticles from './Component/UpArticles';
import UpBusiness from './Component/UpBusiness';
import UpJobVacancies from './Component/UpJobVacancies';
import UpProducts from './Component/UpProducts';
import { auth, db } from '../../firebase';

function Header() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                db.collection('users').doc(authUser.uid)
                    .onSnapshot(user => {
                      setUser(user.data())
                    });
            }
        })  
        return () => { unsubscribe() }
      }, []);

    return (
        <>
            <div className="headerAd">
                <img src="/images/headerad.gif" alt="" className="" />
            </div>

            <header>
                <nav>
                    {/* logos */}
                    <div className="logo">
                        <Link to="/"><img src="/images/hairrrs-Logo.png" alt="logo" /></Link>
                    </div>
                    <div className="logo--mobile">
                        <Link to="/"><img src="/images/logo 2.png" alt="logo" /></Link>
                    </div>

                    {/* search */}
                    <Search />

                    {user?.uid ? <div className="icons-class">
                        <Messages /> <Notification /> <SaveList />

                        <div className="strtsales">
                            <div className="startselling" onClick={() => { document.querySelector('.addboard').style.display = "block" }}>Start selling</div>
                        </div>
                    </div>
                    : <div></div>}
                    {/* : <div>signup/login</div>} */}
                </nav>
            </header>

            {/* start selling modal */}
            <div className="addboard">
                <div className="close" onClick={() => { document.querySelector('.addboard').style.display = "none" }}>&times;</div>
                <div className="accord-030">
                    <span>Start selling</span>

                    <div className="business-statistics">
                        <div className="stats-0">
                            <Link to="add-product" onClick={() => { document.querySelector('.addboard').style.display = "none" }}>
                                <div className="box-3">
                                    <img src="/images/icon-add-product.png" alt="" className="" /><h2>sell product</h2>
                                </div>
                            </Link>
                            <Link to="add-job" onClick={() => { document.querySelector('.addboard').style.display = "none" }}>
                                <div className="box-3">
                                    <img src="/images/icon-add-job.png" alt="" className="" /><h2>upload job vacancy</h2>
                                </div>
                            </Link>
                            <Link to="create-article" onClick={() => { document.querySelector('.addboard').style.display = "none" }}>
                                <div className="box-3">
                                    <img src="/images/icon-add-article.png" alt="" className="" /><h2>Write an article</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header2">
                <UpProducts /> <UpBusiness /> <UpJobVacancies /> <UpArticles />
            </div>

            {/* mobile bottom navigator */}
            <div className="navigation--icons">
                <div><Link to="/">
                    <img src="/images/Icon material-person.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Icon material-home.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/create-article">
                    <img src="/images/Add plus-icon-black.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Notification-black-icon.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Messages-mobile-icon-black.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
            </div>
        </>
    )
}

export default Header
