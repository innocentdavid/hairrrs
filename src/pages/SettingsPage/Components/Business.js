import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { UrlSlug } from '../../../fuctions';

function Business({ user }) {
    const [userName, setUserName] = useState('')
    const [aboutBusiness, setAboutBusiness] = useState('')
    const [website, setWebsite] = useState('')
    const [services, setServices] = useState([]) // list of services
    const [hasChanged, setHasChanged] = useState(false)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (user.uid) {
            setUserName(user.userName)
            setAboutBusiness(user.aboutBusiness)
            setWebsite(user.website)
            setServices(user.services)
        }
    }, [user])

    const handleUpdateBusiness = async () => {
        setUpdating(true)
        if (user) {
            let data = {
                userName: getFormattedUserName(userName), aboutBusiness, website, services
            }
            await db.collection('users').doc(user.uid).update(data)
            setHasChanged(false)
            setUpdating(false)
        }
    }

    const getFormattedUserName = (name) => {
        return UrlSlug(name, 'encode')
    }

    return (
        <div>
            <h2>Business</h2>

            {/* usename */}
            <div className="margin-top">
                <span className='txt'>Username:</span>
                &nbsp; &nbsp;
                <span>https://www.ntutu-fdb00.web.app/{getFormattedUserName(userName)}</span>
                <br />
                <input id="userName"
                    value={getFormattedUserName(userName)}
                    onChange={(e) => { setUserName(e.target.value); setHasChanged(true) }}
                    type="text" className="classctl" />
            </div>

            {/* About business */}
            <div className="margin-top">
                <span className='txt'>About business</span>
                <br />
                <input id="aboutBusiness"
                    value={aboutBusiness}
                    onChange={(e) => { setAboutBusiness(e.target.value); setHasChanged(true) }}
                    type="text" className="classctl" />
            </div>

            {/* business website */}
            <div className="margin-top">
                <span className='txt'>Website</span>
                <br />
                <input id="website"
                    value={website}
                    onChange={(e) => { setWebsite(e.target.value); setHasChanged(true) }}
                    type="url" className="classctl" />
            </div>

            {/* services */}
            <div className="margin-top">
                <span className='txt'>Services</span>
                <br />
                <input id="services"
                    value={services}
                    onChange={(e) => { setServices(e.target.value); setHasChanged(true) }}
                    type="text" placeholder="Search service" className="classctl" />
            </div>

            <div className="catalogue" style={{ width: 'max-content' }}>
                <span className='h'>Blog<span>&times;</span></span>
            </div>

            <div className="d-flex align-items-center">
                {hasChanged && <button onClick={handleUpdateBusiness}>Update business details</button>}
                &nbsp; &nbsp;
                {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
            </div>
        </div>
    )
}

export default Business
