import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../../firebase'
import { formatAMPM } from '../../../fuctions'
import Chat from '../../Chat'
// import UserProfile from '../../UserProfile/UserProfile'

function Messages() {
    // const user = UserProfile.getUser();

    const [openMessages, setOpenMessages] = useState(false)
    const [messageNofication, setMessageNofication] = useState([])
    const [totalMessageNofication, setTotalMessageNofication] = useState(0)
    const [openChat, setOpenChat] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                db.collection('users').doc(authUser?.uid).collection('history')
                    .where('type', '==', 'message')
                    .onSnapshot(snapshot => {
                        let length = snapshot.docs.length;
                        let result = snapshot.docs.map(doc => ({ list: doc.data(), id: doc.id }))
                        setTotalMessageNofication(length)
                        setMessageNofication(result)
                    })
            }
        })

        return () => { unsubscribe() }
    }, []);

    // const markMessageRead = (id) => {
    //     db.collection('users').doc(user?.uid).collection('history').doc(id).delete()
    // }


    return (
        <div className="icon2 j">
            <div onClick={() => { setOpenMessages(true) }}>
                <img src="/images/msg-header.svg" alt="saveicon" className="saveicon" />
                <span className="tooltiptext">Messages</span>
                <div className="notifier">{totalMessageNofication}</div>
            </div>

            {openMessages && <div className="message-popup">
                <div className="msg-header">
                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Messages</span>
                        <span><i className="fa fa-times-circle" aria-hidden="true"
                            onClick={() => { setOpenMessages(false) }}
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
                    <ul className="MsgFeatures">
                        <Link to={'/products'}>Products</Link>
                        <Link to={'/jobs'}>Job vacancies</Link>
                        <Link to={'/articles'}>Articles</Link>
                        <Link to={'/businesses'}>Businesses</Link>
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

                        {messageNofication && messageNofication.map(({ id, list }) => (
                            <div key={id}>
                                {list?.type === 'message' && <div className="people">
                                    {openChat && <Chat toggle={setOpenChat} msgId={id} userId={list?.receiverId} />}

                                    <div className="shielder" style={{ cursor: 'pointer' }} onClick={() => { setOpenChat(true) }}>
                                        <div className="img">
                                            <img src={list?.userPhotoURL} alt="hairrrs logo" className="imagy" />
                                        </div>
                                        <div className="user0">
                                            <span className="user"><span>{list?.userName}</span></span>
                                            <br />
                                            <div className="infos-1">
                                                <div className="text">
                                                    <span className="txt">{list?.text}</span>
                                                </div>
                                                <div className="time-time">
                                                    <time>{list?.createdAt && formatAMPM(list?.createdAt)}</time>
                                                </div>
                                                <div className="notificator">{list?.msgCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            }        </div>

    )
}

export default Messages
