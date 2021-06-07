import React from 'react'
import { Link } from 'react-router-dom'

function Messages() {
    return (
        <div className="icon2">
        <div onClick={() => { document.querySelector('.message-popup').style.display = "block" }}>
            <img src="/images/msg-header.svg" alt="saveicon" className="saveicon" />
            <span className="tooltiptext">Messages</span>
            <div className="notifier">7</div>
        </div>

        <div className="message-popup">
            <div className="msg-header">
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Messages</span>
                    <span><i className="fa fa-times-circle" aria-hidden="true"
                        onClick={() => { document.querySelector('.message-popup').style.display = "none" }}
                        style={{ fontSize: '1.5rem' }}></i></span>
                </div>
                <div className="Caps">
                    <form>
                        <button type="submit">
                            <div className="searchicon">
                                <img src="/images/search.png" alt="" />
                            </div>
                        </button>
                        <input type="text" placeholder="search" className="search-hub"></input>
                    </form>
                </div>
                <hr className="customHr" />
                <ul>
                    <li>Products</li>
                    <li>Job vacancies</li>
                    <li>Articles</li>
                    <li>Businesses</li>
                </ul>
                <div className="queen">
                    <div className="rack">
                        <div className="accord-rack">
                            <div className="img3">
                                <div className="img4">
                                    <div className="content-1">
                                        <img src="/images/info-icon.svg" alt="hairrrs info icon" />
                                        <span className="txt">info</span>
                                    </div>
                                    <div className="rack-info">
                                        <h2>Lounge users</h2>
                                        <p>
                                            We provide maximum visibility to every account that made it
                                            to the lounge dashboard. This dashboard is shown worldwide.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                        <div className="accord-rack">
                            <Link to="businesses-profile.html"><div className="img1">
                                <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                        </div>
                    </div>
                </div>
                <div className="users">
                    <div className="people">
                        <div className="shielder">
                            <div className="img">
                                <img src="/images/logo black.svg" alt="hairrrs logo" className="imagy" />
                            </div>
                            <div className="user0">
                                <span className="user"><span>customer support</span></span>
                                <br />
                                <div className="infos-1">
                                    <div className="text">
                                        <span className="txt">Lorem ipsum dolor sit amet con...</span>
                                    </div>
                                    <div className="time-time">
                                        <time>12:00am</time>
                                    </div>
                                    <div className="notificator">4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default Messages
