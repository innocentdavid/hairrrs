import React from 'react'
import { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase'

function FollowersTab({ setShowfollowersTab }) {
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        const UnSub = () => {
            db.collection('users').doc(auth.currentUser?.uid).collection('followers')
                .onSnapshot(doc => {
                    if (!doc.empty) {
                        let r = doc.docs.map(doc => ({ data: doc.data(), id: doc.id }))
                        setFollowers(r)
                    }
                })
        }
        return UnSub()
    }, [])

    return (
        <div className="followers-tab">
            <div className="closeevery" onClick={() => { setShowfollowersTab(false) }}>&times;</div>
            <div className="container">
                <div className="header">
                    <div className="title">
                        <txt>Followers</txt>
                    </div>
                    <hr style={{ marginTop: '-30px' }} />
                </div>
                <div className="pad">

                    {followers?.map(({ id, data }) => (<>
                        <div key={id} className="people">
                            <div className="info">
                                <div className="img1">
                                    
                                </div>
                                <div className="user-id">
                                    <div className="fullname">User full name</div>
                                    <div className="username-1">Username</div>
                                </div>
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

export default FollowersTab
