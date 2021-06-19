import React from 'react'

function FollowingTab({ setShowFollowingTab }) {
  return (
    <div className="following-tab">
      <div className="closeevery" onClick={() => { setShowFollowingTab(false) }}>&times;</div>
      <div className="container">
        <div className="header">
          <div className="title">
            <txt>Following</txt>
          </div>
          <hr style={{ marginTop: '-30px' }} />
        </div>
        <div className="pad">
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
          <div className="people">
            <div className="info">
              <div className="img1"></div>
              <div className="user-id">
                <div className="fullname">User full name</div>
                <div className="username-1">Username</div>
              </div>
            </div>
            <div className="action">
              <img src="images/comment-white-Group 472.svg" alt="ohyanga comment icon" />
              <div className="exclude">&times;</div>
            </div>
          </div>
          <hr style={{ border: '1px solid #f9f9f9' }} />
        </div>
      </div>
    </div>

  )
}

export default FollowingTab
