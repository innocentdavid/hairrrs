import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../../../contexts/GlobalStore'
import { db } from '../../../firebase'
import Chat from '../../Chat'
import UserProfile from '../../UserProfile/UserProfile'

function Notification() {
    const user = UserProfile.getUser()
    const [notificationList] = useContext(NotificationContext)
    const [notificationListTotal, setNotificationListTotal] = useState(0)

    let tnl = notificationList.map(({ totalNotificationList }) => totalNotificationList)[0]
    useEffect(() => {
        if (tnl) { setNotificationListTotal(tnl) } else { setNotificationListTotal(0) }
    }, [tnl])

    const deleteList = (id) => {
        db.collection('users').doc(user?.uid).collection('history').doc(id).delete()
    }

    const [openChat, setOpenChat] = useState(false)

    return (
        <div className="icon2">
            <div onClick={() => { document.querySelector('.message-popup-1').style.display = "block" }}>
                <img src="/images/notification-header.svg" alt="saveicon" className="saveicon" />
                <span className="tooltiptext">Notification</span>
                <div className="notifier">{notificationListTotal}</div>
            </div>

            <div className="message-popup-1">
                <div className="msg-header">
                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Notification</span>
                        <span><i className="fa fa-times-circle" aria-hidden="true"
                            onClick={() => { document.querySelector('.message-popup-1').style.display = "none" }}
                            style={{ fontSize: '1.5rem' }}></i></span>
                    </div>
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
                <div className="users">
                    {notificationList?.map(({ id, list }) => (
                        <div key={id} className="people" style={{ marginLeft: '20px' }}>
                            {list.type !== 'message' && 
                            <Link to={list.link ? list.link : '/'} className="shielder" style={{ display: 'flex', color: 'black' }}>
                                <div className="img">
                                    <img src={list.userPhotoURL} alt="hairrrs logo" className="" />
                                </div>
                                <div className="user0">
                                    <br />
                                    <div className="infos">
                                        <div className="text-1">
                                            <span className="txt"><strong>{list.userName}</strong> requested for a call on <strong>{list.productTitle}</strong></span>
                                        </div>
                                        <div
                                            onClick={(e) => { e.preventDefault(); deleteList(id) }}
                                            className="delete-icon">
                                            <img src="/images/saturday-delete-icon.png" alt="delete icon" />
                                        </div>
                                    </div>
                                </div>
                            </Link>}

                            {list.type === 'message' && 
                            <div className="shielder" key={list.receiverId} style={{ display: 'flex', color: 'black', margin: '10px 0' }}>
                                {openChat && <Chat toggle={setOpenChat} userId={list.receiverId} />}
                                <div className="img">
                                    <img src={list.userPhotoURL} alt="hairrrs logo" className="" />
                                </div>
                                <div className="user0">
                                    <br />
                                    <div className="infos">
                                        <div className="text-1" onClick={() => {setOpenChat(true)}}>
                                            <span className="txt">{list.text}<span style={{ marginLeft: 10, padding: 5, width: '40px', height: '40px', border: '1px solid #fd0f5f' }}>{list.msgCount}</span></span>
                                        </div>
                                        <div
                                            onClick={(e) => { e.preventDefault(); deleteList(id) }}
                                            className="delete-icon">
                                            <img src="/images/saturday-delete-icon.png" alt="delete icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notification
