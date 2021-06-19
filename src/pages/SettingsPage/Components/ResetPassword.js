import React from 'react'

function ResetPassword() {
  return (
    <>
      <h2>Password</h2>

      {/* Current Password */}
      <div className="margin-top">
        <span className='txt'>Current password</span>
        <br />
        <input type="password" className="classctl" />
      </div>

      {/* New Password */}
      <div className="margin-top">
        <span className='txt'>New password</span>
        <br />
        <input type="password" className="classctl" />
      </div>

      {/* Confirm Password */}
      <div className="margin-top">
        <span className='txt'>Confirm password</span>
        <br />
        <input type="password" className="classctl" />
      </div>
    </>
  )
}

export default ResetPassword
