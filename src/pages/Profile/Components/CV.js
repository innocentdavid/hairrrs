import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import UserProfile from '../../../components/UserProfile/UserProfile';
import { db } from '../../../firebase';
import Attachment from './Attachment';
import { openLoading } from '../../../myFunctions'

function CV({ userName, setEditModeR }) {
  const currentUser = UserProfile.getUser();
  const history = useHistory();
  const [editMode, setEditMode] = useState(false)

  const [name, setName] = useState('')
  const [owner, setOwner] = useState([])
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState([/*{ id: 0, content: '' }*/])
  const [interests, setInterests] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [contactInformation, setContactInformation] = useState([])
  const location = useLocation()

  useEffect(() => {
    if(setEditModeR === true){
      setEditMode(true)
    }
    if(setEditModeR === false){
      setEditMode(false)
    }
  }, [setEditModeR])

  useEffect(() => {
    if(userName){
      openLoading('open')
      db.collection('resume')
      .where('userName', '==', userName)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let d = snapshot.docs.map(doc => doc.data())
          console.log(d)
            if (d) {
              let r = d[0]
              setName(r?.name)
              setOwner(r?.user)
              setAbout(r?.about)
              setSkills(r?.skills)
              setInterests(r?.interests)
              setExperience(r?.experience)
              setEducation(r?.education)
              setContactInformation(r?.contactInformation)
            }
          }
          // else { history.goBack() }
        })
        openLoading('close')
    }
  }, [currentUser, history, userName])

  return (
    // <div className="container resume-cv-edit">
    <div className={`container ${editMode ? '' : 'resume-cv-edit' }`}>
      <div className="header">
        <div className="logo">
          <Link to="/"><img src="/images/hairrrs-Logo.png" alt="Hairrrs" /></Link>
        </div>
        <div className="shareclass">
          <div className="share">
            <img src="images/Icon material-print-icon ohyanga" alt="" />
          </div>
          <div className="share">
            <img src="images/Icon awesome-share-icon ohyanga" alt="" />
          </div>
        </div>
      </div>
      <div className="title">Resume</div>
      <div className="accord-inline">
        <div className="b-photo-1" style={{
          marginRight: '50px'
        }}>
          {owner && <img src={owner ? owner.photoURL : owner.photoURLmax} alt={owner?.userName} />}
        </div>
        {/* <div className="watermark">
                        from Hairrrs
                    </div> */}
        <div className="details">
          <div className="CV-INFO">
            <txt>Name</txt>
            <br />
            <input
              value={name}
              onChange={(e) => { editMode && setName(e.target.value) }}
              type="text"
              style={{ width: '100%' }}
              className="TEXTAREA1" />
          </div>
          <div className="CV-INFO">
            <txt>About</txt>
            <br />
            <div className="ADDTEXT">
              <textarea
                value={about}
                onChange={(e) => { editMode && setAbout(e.target.value) }}
                type="text" style={{
                  height: '125px',
                  width: '100%',
                  border: '1px solid #c5c5c56e',
                  resize: 'none',
                  padding: 15,
                  fontSize: '1rem',
                  fontFamily: 'sans-serif'
                }}></textarea>
            </div>
          </div>
          <div className="CV-INFO">
            <txt>Skills</txt>
            <br />
            <div className="texthub">
              <Attachment
                editMode={editMode}
                questions={skills} setQuestions={setSkills}
              />
            </div>
          </div>

          <div className="CV-INFO">
            <txt>Interests</txt>
            <br />
            <div className="texthub">
              <Attachment
                editMode={editMode}
                questions={interests} setQuestions={setInterests}
              />
            </div>
          </div>

          <div className="CV-INFO">
            <txt>Experience</txt>
            <br />
            <div className="texthub">
              <Attachment
                editMode={editMode}
                questions={experience} setQuestions={setExperience}
              />
            </div>
          </div>

          <div className="CV-INFO">
            <txt>Education</txt>
            <br />
            <div className="texthub">
              <Attachment
                editMode={editMode}
                questions={education} setQuestions={setEducation}
              />
            </div>
          </div>

          <div className="CV-INFO">
            <txt>Contact information</txt>
            <br />
            <div className="texthub">
              <Attachment
                editMode={editMode}
                questions={contactInformation} setQuestions={setContactInformation}
              />
            </div>
          </div>
          <br />
          <br />
          <br />

          {/* {editMode && <div className="downloadParent">
                            <center>
                                <span onClick={handleSubmit} style={{
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    cursor: 'pointer'
                                }}>save</span>

                                <span onClick={prevCV} style={{
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    cursor: 'pointer'
                                }}>prev cv</span>
                            </center>

                            <br />
                            <br />
                            <br />
                        </div>} */}

          {userName === currentUser.userName && location.pathname !== '/apply' &&
            <center>
              <span onClick={() => { history.push('/editCV') }} style={{
                border: '1px solid red',
                padding: '10px 15px',
                cursor: 'pointer'
              }}>Edit</span>
              <br />
              <br />
            </center>
          }

        </div>
      </div>
    </div>

  )
}

export default CV
