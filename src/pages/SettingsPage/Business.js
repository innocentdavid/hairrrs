import React from 'react'

function Business({ userName, setUserName, aboutBusiness, setAboutBusiness, website, setWebsite, services, setServices }) {
  return (
    <div>
      <h2>Business</h2>

{/* usename */}
<div className="margin-top">
    <span className='txt'>Username</span> http://www.Ohyanga.com/username
    <br />
    <input id="userName"
        value={userName}
        onChange={(e) => { setUserName(e.target.value) }}
        type="text" className="classctl" />
</div>

{/* About business */}
<div className="margin-top">
    <span className='txt'>About business</span>
    <br />
    <input id="aboutBusiness"
        value={aboutBusiness}
        onChange={(e) => { setAboutBusiness(e.target.value) }}
        type="text" className="classctl" />
</div>

{/* business website */}
<div className="margin-top">
    <span className='txt'>Website</span>
    <br />
    <input id="website"
        value={website}
        onChange={(e) => { setWebsite(e.target.value) }}
        type="url" className="classctl" />
</div>

{/* services */}
<div className="margin-top">
    <span className='txt'>Services</span>
    <br />
    <input id="services"
        value={services}
        onChange={(e) => { setServices(e.target.value) }}
        type="text" placeholder="Search service" className="classctl" />
</div>

<div className="catalogue" style={{ width: 'max-content' }}>
    <span className='h'>Blog<span>&times;</span></span>
</div>
    </div>
  )
}

export default Business
