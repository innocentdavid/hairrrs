import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'

function NotificationSettings({ user }) {
  const [pushNotifications, setPushNotifications] = useState(false)
  const [messageNotifications, setMessageNotifications] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [appAutoUpdate, setAppAutoUpdate] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      if (user.pushNotifications) { setPushNotifications(true) }
      if (user.messageNotifications) { setMessageNotifications(true) }
      if (user.emailNotifications) { setEmailNotifications(true) }
      if (user.appAutoUpdate) { setAppAutoUpdate(true) }
    }
  }, [user])

  const handleUpdateNotficationSettings = async () => {
    setUpdating(true)
    if (user.uid) {
      let data = {
        pushNotifications, messageNotifications, emailNotifications, appAutoUpdate
      }
      await db.collection('users').doc(user.uid).update(data)
        .catch(e => {
          setError('Unsuccessfull!, an error occured while updating your settings');
          console.log("Error updating notification settings:", e)
        })
      setHasChanged(false)
      setUpdating(false)
    } else { setUpdating(false); alert('You are not logged-in !') }
  }

  return (
    <>
      <h2>Notification</h2>
      <>
        {/* push notification */}
        <div className="knobstxt">
          <span><span className='txt'>Push Notifications</span></span>
          <label className="switch">
            <input
              checked={pushNotifications}
              onChange={(e) => { setPushNotifications(e.target.checked); setHasChanged(true) }}
              type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        {/* email notification */}
        <div className="knobstxt">
          <span><span className='txt'>Email Notifications</span></span>
          <label className="switch">
            <input
              checked={emailNotifications}
              onChange={(e) => { setEmailNotifications(e.target.checked); setHasChanged(true) }}
              type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        {/* message notification */}
        <div className="knobstxt">
          <span><span className='txt'>Message Notifications</span></span>
          <label className="switch">
            <input
              checked={messageNotifications}
              onChange={(e) => { setMessageNotifications(e.target.checked); setHasChanged(true) }}
              type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </>

      <span><h2>App</h2></span>

      {/* Auto app update */}
      <div className="knobstxt">
        <span><span className='txt'>Auto app update</span></span>
        <label className="switch">
          <input
            checked={appAutoUpdate}
            onChange={(e) => { setAppAutoUpdate(e.target.checked); setHasChanged(true) }}
            type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      {error && <span style={{ color: 'red' }}>{error}</span>}

      <div className="d-flex align-items-center">
        {hasChanged && <button onClick={handleUpdateNotficationSettings}>update</button>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>

    </>
  )
}

export default NotificationSettings
