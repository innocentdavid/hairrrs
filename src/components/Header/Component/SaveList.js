import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SaveListContext } from '../../../contexts/GlobalStore';
import { auth, db } from '../../../firebase';

function SaveList() {
    const [saveList] = useContext(SaveListContext)
    const [saveListTotal, setSaveListTotal] = useState(0)

    let tsl = saveList.map(({ totalSaveList }) => totalSaveList)[0]
    useEffect(() => {
        if (tsl) { setSaveListTotal(tsl) } else { setSaveListTotal(0) }
    }, [tsl])

    const deleteList = (id) => {
        db.collection('users').doc(auth.currentUser.uid).collection('saveList').doc(id).delete()
    }

    return (
        <div className="icon2">
        <div onClick={() => { document.querySelector('.message-popup-2').style.display = "block" }}>
            <img src="/images/saved-header.svg" alt="saveicon" className="saveicon" />
            <img src="/images/savebtn.png" alt="saveicon" className="mobile--icon" />
            <span className="tooltiptext">saved</span>
            <div className="notifier">{saveListTotal}</div>
        </div>

        <div className="message-popup-2">
            <div className="msg-header">
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Saved list</span>
                    <span><i className="fa fa-times-circle" aria-hidden="true"
                        onClick={() => { document.querySelector('.message-popup-2').style.display = "none" }}
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
                {saveList?.map(({ id, list }) => (
                    <div key={id} className="people">
                        <Link to={list.link} className="shielder" style={{ display: 'flex', color: 'black' }}>
                            <div className="img">
                                <img src={list.photoURL} alt="hairrrs logo" className="imagy" />
                            </div>
                            <div className="user0">
                                <br />
                                <div className="infos">
                                    <div className="text-1">
                                        <span className="txt">{list.description} </span>
                                    </div>
                                    <div
                                        onClick={(e) => { e.preventDefault(); deleteList(id) }}
                                        className="delete-icon">
                                        <img src="/images/saturday-delete-icon.png" alt="delete icon" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>

    )
}

export default SaveList
