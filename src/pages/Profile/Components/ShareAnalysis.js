import React from 'react'

function ShareAnalysis({ setShowShareAnalysis }) {
  return (
    <div className="Share-Analysis">
      <div className="container">
        <div className="header">
          <div className="title">
            <txt>Share analystics</txt>
            <span onClick={() =>{ setShowShareAnalysis(false) }}>&times;</span>
          </div>
          <hr style={{ marginTop: '-30px' }} />
        </div>
        <div className="pad">
          <form>
            <input type="text" placeholder="https://" value="https://" className="input-text" />
            <button>Copy link</button>
          </form>
        </div>
        <hr style={{ marginTop: '20px' }} />
        <div className="pad">
          <info>You can approve and disapprove users request to view your analystics,
            you can also dissapprove already approved users.
          </info>
        </div>
        <div className="requests">
          <div className="box-request">
            <div className="title-1">
              <txt>Requests</txt>
            </div>
            <hr />
            <div className="contents">
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="accept">&#10004;</div>
                  <div className="cancel">&times;</div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="accept">&#10004;</div>
                  <div className="cancel">&times;</div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="accept">&#10004;</div>
                  <div className="cancel">&times;</div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="accept">&#10004;</div>
                  <div className="cancel">&times;</div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-request">
            <div className="title-1">
              <txt>Approved</txt>
            </div>
            <hr />
            <div className="contents">
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="cancel-1">
                    <div className="icon-ex">&times;</div>
                  </div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="cancel-1">
                    <div className="icon-ex">&times;</div>
                  </div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="cancel-1">
                    <div className="icon-ex">&times;</div>
                  </div>
                </div>
              </div>
              <div className="people">
                <div className="user-details">
                  <div className="img1">
                    <img src="images/nutless braid.png" alt="ohyanga logo" className="imagy" />
                  </div>
                  <div className="user0">
                    <user>Username</user>
                  </div>
                </div>
                <div className="action">
                  <div className="cancel-1">
                    <div className="icon-ex">&times;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ShareAnalysis
