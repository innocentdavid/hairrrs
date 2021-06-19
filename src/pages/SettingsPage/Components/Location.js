import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'

function Location({ user }) {
  const [country, setCountry] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [hasChanged, setHasChanged] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setCountry(user.country)
      setLocation(user.location)
      setAddress(user.address)
    }
  }, [user])

  const handleUpdateLocation = async () => {
    setUpdating(true)
    if (user) {
      let data = {
        country, location, address
      }
      await db.collection('users').doc(user.uid).update(data)
      setHasChanged(false)
      setUpdating(false)
    }
  }

  return (
    <>
      <h2>Location</h2>

      {/* country */}
      <div className="selection">
        <span className='txt'>Country</span>
        <div className="selector">
          <input id="country"
            value={country}
            onChange={(e) => { setCountry(e.target.value); setHasChanged(true) }}
            type="text" placeholder="---" />
          <div id="selecticon">&#10094;</div>
        </div>
        <div className="options">
          <ul>
            <option value="1">Germany</option>
            <option value="2">Ghana</option>
            <option value="3">Usa</option>
            <option value="4">Nigeria</option>
            <option value="5">Korea</option>
            <option value="6">China</option>
            <option value="7">Japan</option>
            <option value="8">Italy</option>
          </ul>
        </div>
      </div>

      {/* location */}
      <div className="selection">
        <span className='txt'>Location</span>
        <div className="selector">
          <input id="location"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setHasChanged(true) }}
            type="text" placeholder="---" />
          <div id="selecticon">&#10094;</div>
        </div>
        <div className="options">
          <ul>
            <option value="1">Abia</option>
            <option value="2">Adamawa</option>
            <option value="3">Akwa ibom</option>
            <option value="4">Anambra</option>
            <option value="5">Bauchi</option>
            <option value="6">Bayelsa</option>
            <option value="7">Benue</option>
            <option value="8">Bornu</option>
          </ul>
        </div>
      </div>

      {/* address */}
      <div className="margin-top">
        <span className='txt'>Address</span>
        <br />
        <input
          id="address"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setHasChanged(true) }}
          type="text" className="classctl" />
      </div>

      <div className="d-flex align-items-center">
        {hasChanged && <button onClick={handleUpdateLocation}>update location details</button>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>
    </>
  )
}

export default Location
