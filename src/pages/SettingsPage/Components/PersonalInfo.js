import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'

function PersonalInfo({ user }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [dobError, setDobError] = useState('')
  const [genderError, setGenderError] = useState('')

  const [hasChanged, setHasChanged] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setPhoneNumber(user.phoneNumber)
      setDob(user.dob)
      setGender(user.gender)
    }
  }, [user])

  const [error, setError] = useState('')

  const handleUpdatePersonalProfile = async () => {
    check(firstName, setFirstNameError)
    check(lastName, setLastNameError)
    check(phoneNumber, setPhoneNumberError)
    check(dob, setDobError)
    await check(gender, setGenderError)
    if (
      !firstNameError &&
      !lastNameError &&
      !phoneNumberError &&
      !dobError &&
      !genderError
    ) {
      setUpdating(true)
      if (user.uid) {
        let data = {
          firstName, lastName, phoneNumber, dob, gender
        }
        await db.collection('users').doc(user.uid).update(data)
        setError('')
        setHasChanged(false)
        setUpdating(false)
      } else { setUpdating(false); setError('You are not logged-in!'); console.log('You are not logged-in!') }
    }else{ setError('please correct above error and try again') }
  }

  function check(field, setErrorSection) {
    if (field) { return true } else {
      // setError('please correct above error and try again')
      setErrorSection('please correct this error!')
      return false
    }
  }

  return (
    <>
      {/* first Name and lastname */}
      <div className="details-user">
        <div className="registration-form">
          <span className='txt'>First name</span>
          <br />
          <input id="firstName"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setHasChanged(true); setFirstNameError('') }}
            type="text" className={`firstname ${firstNameError && 'inputError'}`} />
          <br />
          <span style={{ color: 'red' }}>{firstNameError}</span>
        </div>

        <div className="registration-form">
          <span className='txt'>Last name</span>
          <br />
          <input id="lastName"
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); setHasChanged(true); setLastNameError('') }}
            type="text" className={`firstname ${lastNameError && 'inputError'}`} />
          <br />
          <span style={{ color: 'red' }}>{lastNameError}</span>
        </div>
      </div>

      {/* email */}
      <div className="margin-top">
        <span className='txt'>Email</span>
        <br />
        <input
          value={user?.email}
          type="email" className="classctl" disabled />
      </div>

      {/* phone number */}
      <div className="margin-top">
        <span className='txt'>Phone Number</span>
        <br />
        <input id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => { setPhoneNumber(e.target.value); setHasChanged(true); setPhoneNumberError('') }}
          type="tel" className={`classctl ${phoneNumberError && 'inputError'}`} />
        <br />
        <span style={{ color: 'red' }}>{phoneNumberError}</span>

        {/* <div className="system" style={{ marginTop: 0 }}>
          <b>Use as contact number</b>
          <input id="phoneNumberAsContactNo"
            value={phoneNumberAsContactNo}
            onChange={(e) => { setPhoneNumberAsContactNo(e.target.value) }}
            type="checkbox" checked="checked" />
        </div> */}
      </div>

      {/* birthday */}
      <div className="margin-top">
        <span className='txt'>Birthday</span>
        <br />
        <input id="dob"
          value={dob}
          onChange={(e) => { setDob(e.target.value); setHasChanged(true); setDobError('') }}
          type="date" className={`classctl ${dobError && 'inputError'}`} />
        <br />
        <span style={{ color: 'red' }}>{dobError}</span>
      </div>
      <br />

      {/* gender */}
      <div className="selection">
        <span className='txt'>Gender</span>
        <br />
        <br />

        <div className="dropdown">
          <div className={`dropbtn ${genderError && 'inputError'}`}>
            {gender ? gender : 'Select'}
            <span style={{ marginLeft: 30, transform: 'rotate(-90deg)' }}>❮</span>

          </div>
          <div className="dropdown-content">
            <span
              onClick={() => { setGender('Male'); setHasChanged(true); setGenderError('') }}
            >Male</span>
            <span
              onClick={() => { setGender('Female'); setHasChanged(true); setGenderError('') }}
            >Female</span>
          </div>
          <span style={{ color: 'red' }}>{genderError}</span>
        </div>


        {/* <div className="selector" style={{ flexDirection: 'column' }}>
          <input id="gender"
            value={gender}
            onChange={(e) => { setGender(e.target.value); setHasChanged(true); setGenderError('') }}
            type="text" placeholder="---" className={genderError && 'inputError'} />
          <br />
          <span style={{ color: 'red' }}>{genderError}sd</span>

          <div id="selecticon">&#10094;</div>
        </div>
        <div className="options">
          <ul>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </ul>
        </div> */}
      </div>

      <div className="d-flex align-items-center">
        {hasChanged && <>
          <button className="btnSolid" onClick={handleUpdatePersonalProfile}>update</button>
          &nbsp; &nbsp; &nbsp; <span style={{ color: 'red' }}>{error}</span>
        </>}
        &nbsp; &nbsp;
        {updating && <img src="/images/kloader.gif" width="30" height="30" alt="" />}
      </div>
    </>
  )
}

export default PersonalInfo
