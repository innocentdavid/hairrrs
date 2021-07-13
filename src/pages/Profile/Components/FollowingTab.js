import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MyImage from '../../../components/MyImage'
import { auth, db } from '../../../firebase'

function FollowingTab({ setShowFollowingTab }) {
  
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const UnSub = () => {
      db.collection('users').doc(auth.currentUser?.uid).collection('following')
        .onSnapshot(doc => {
          if (!doc.empty) {
            let r = doc.docs.map(doc => ({ data: doc.data(), id: doc.id }))
            setFollowing(r)
          }
        })
    }
    return UnSub()
  }, [])

  return (
    <div className="following-tab">
      <div className="closeevery" onClick={() => {
        setShowFollowingTab(false)
      }}>&times;</div>
      <div className="container">
        <div className="header">
          <div className="title">
            <txt>Following</txt>
          </div>
          <hr style={{ marginTop: '-30px' }} />
        </div>
        <div className="pad">

          {following?.map(({ id, data }) => (<>
            <div key={id} className="people">
              <div className="info">
                <div className="img1">
                  <MyImage
                    src={data?.photoURL}
                    width='100%'
                    height='100%'
                    alt=""
                    className=""
                  />
                </div>
                <Link to={`/profile?uid=${data.uid}`} className="user-id">
                  <div className="fullname">{data?.displayName}</div>
                  <div className="username-1">{data?.userName}</div>
                </Link>
              </div>
              <div className="action">
                <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              </div>
            </div>
            <hr style={{ border: '1px solid #f9f9f9' }} />
          </>))}

        </div>
      </div>
    </div>

  )
}

export default FollowingTab
