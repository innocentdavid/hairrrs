import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { topFunction } from '../../fuctions'

function BusinessProfile() {
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    if (!params.has('name')) {
        history.push('/')
    }
    var businessName = params.get('name')

    const [user, setUser] = useState([])
    auth.onAuthStateChanged(authUser => {
        setUser(authUser)
    })


    return (
        <div className="layout" style={{ marginTop: 0 }}>
            <Helmet>
                <title>{`${businessName} - Hairrrs`}</title>
                <meta name="description" content="Everything Hairs" />
                <meta property="og:title" content={`${businessName} - Hairrrs`} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/profile`} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Everything Hairs" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>
            <div id="resumetab" className="resume-cv" onClick={() => { document.querySelector('#resumetab').style.display = 'none' }}>
                <div className="closeevery">&times;</div>
                <div className="container">
                    <div className="header">
                        <div className="logo">
                            <Link to="index.html"><img src="images/hairrrs-Logo.png" alt="logo" /></Link>
                        </div>
                        <div className="shareclass">
                            <div className="share">
                                <img src="images/Icon material-print.icon ohyanga" alt="" />
                            </div>
                            <div className="share">
                                <img src="images/Icon awesome-share-alt.icon ohyanga" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="title">Resume</div>
                    <div className="accord-inline">
                        <div className="b-photo-1">
                            <img src="images/rieledowns-20210420-0006.jpg" alt="profile resume" />
                        </div>
                        <div className="watermark">
                            from Hairrrs
                </div>
                        <div className="details">
                            <div className="CV-INFO">
                                <txt>Name</txt>
                                <br />
                                <input type="text" className="TEXTAREA1" />
                            </div>
                            <div className="CV-INFO">
                                <txt>About</txt>
                                <br />
                                <div className="ADDTEXT">
                                    <textarea type="text"></textarea>
                                </div>
                            </div>
                            <div className="CV-INFO">
                                <txt>Skills</txt>
                                <br />
                                <div className="texthub">
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="Add">
                                        <input type="submit" className="Add-content" value="Add" />
                                    </div>
                                </div>
                            </div>
                            <div className="CV-INFO">
                                <txt>Interests</txt>
                                <br />
                                <div className="texthub">
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="Add">
                                        <input type="submit" className="Add-content" value="Add" />
                                    </div>
                                </div>
                            </div>
                            <div className="CV-INFO">
                                <txt>Experience</txt>
                                <br />
                                <div className="texthub">
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="Add">
                                        <input type="submit" className="Add-content" value="Add" />
                                    </div>
                                </div>
                            </div>
                            <div className="CV-INFO">
                                <txt>Education</txt>
                                <br />
                                <div className="texthub">
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="textcell">
                                        <div className="action">
                                            <cancel>&times;</cancel><place>&#10095;</place>
                                        </div>
                                        <input type="text" className="TEXTAREA" />
                                    </div>
                                    <div className="Add">
                                        <input type="submit" className="Add-content" value="Add" />
                                    </div>
                                </div>
                            </div>
                            <div className="CV-INFO">
                                <txt>Contact information</txt>
                                <br />
                                <div className="ADDTEXT">
                                    <textarea type="text"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <button>Save</button>
                    </div>
                </div>
            </div>

            <div className="Analystics">
                <div className="close">&times;</div>
                <div className="container">
                    <div className="title">Analystics - <date>January 2021</date></div>
                    <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
                    <div className="stats">
                        <div className="containment">
                            <div className="recent-month">
                                <ul>
                                    <div className="percentages-total">
                                        <div className="views">
                                            <li>views -</li><counts>239</counts>
                                        </div>
                                        <div className="total">
                                            <total>-88%</total>
                                        </div>
                                    </div>
                                    <div className="percentages">
                                        <li>Products -</li><counts>33%</counts>
                                    </div>
                                    <div className="percentages">
                                        <li>Businesses -</li><counts>24%</counts>
                                    </div>
                                    <div className="percentages">
                                        <li>Job vacancies -</li><counts>39%</counts>
                                    </div>
                                    <div className="percentages">
                                        <li>Articles -</li><counts>29%</counts>
                                    </div>
                                </ul>
                            </div>
                            <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
                            <div className="previous-month">
                                <h2>Previous month:</h2>
                                <ul>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>views -</li><counts>239</counts>
                                            </div>
                                            <div className="total">
                                                <total>+88%</total>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
                            <div className="title-stats">
                                <h1>Gender</h1>
                            </div>
                            <div className="percentages-total" style={{ padding: '20px', paddingTop: 0 }}>
                                <div className="holder-23">
                                    <div className="views">
                                        <graph>add graph here</graph>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="containment">
                            <div className="title-stats">
                                <h1>Gift bar</h1>
                            </div>
                            <div className="percentages-total" style={{ padding: '20px', paddingTop: 0, paddingBottom: 0 }}>
                                <div className="holder-23">
                                    <div className="views">
                                        <graph>add graph here</graph>
                                    </div>
                                </div>
                            </div>
                            <div className="recent-month">
                                <ul>
                                    <div className="percentages">
                                        <li>Progress -</li><counts>23.7%</counts>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="containment">
                            <div className="previous-month">
                                <ul>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>Follows -</li><counts>1275</counts>
                                            </div>
                                            <div className="total">
                                                <total>+65%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>Unfollows -</li><counts>11</counts>
                                            </div>
                                            <div className="total">
                                                <total>-688%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>Message requests -</li><counts>10</counts>
                                            </div>
                                            <div className="total">
                                                <total>-58%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>Shares -</li><counts>15</counts>
                                            </div>
                                            <div className="total">
                                                <total>+208%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-23">
                                            <div className="views">
                                                <li>Verified follows -</li><counts>5</counts>
                                            </div>
                                            <div className="total">
                                                <total>0%</total>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div className="ratingsbtn" style={{ width: '300px', margin: 'auto', marginBottom: '30px' }}>
                                <div className="middler">
                                    <div className="okstars">
                                        <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                    </div>
                                    <div className="rates">
                                        <views>2.6</views><h9>Ratings<rates>(13)</rates></h9>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="containment">
                            <div className="title-stats">
                                <h1>Locations</h1>
                            </div>
                            <div className="previous-month">
                                <ul>
                                    <div className="percentages-total">
                                        <div className="holder-22">
                                            <h1>Lagos</h1>
                                        </div>
                                        <div className="holder-23">
                                            <div className="views">
                                                <graph>add graph here</graph>
                                            </div>
                                            <div className="total">
                                                <total>55%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-22">
                                            <h1>Imo</h1>
                                        </div>
                                        <div className="holder-23">
                                            <div className="views">
                                                <graph>add graph here</graph>
                                            </div>
                                            <div className="total">
                                                <total>55%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-22">
                                            <h1>Anambra</h1>
                                        </div>
                                        <div className="holder-23">
                                            <div className="views">
                                                <graph>add graph here</graph>
                                            </div>
                                            <div className="total">
                                                <total>55%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-22">
                                            <h1>Kaduna</h1>
                                        </div>
                                        <div className="holder-23">
                                            <div className="views">
                                                <graph>add graph here</graph>
                                            </div>
                                            <div className="total">
                                                <total>55%</total>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="percentages-total">
                                        <div className="holder-22">
                                            <h1>Abuja</h1>
                                        </div>
                                        <div className="holder-23">
                                            <div className="views">
                                                <graph>add graph here</graph>
                                            </div>
                                            <div className="total">
                                                <total>55%</total>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Share-Analysis">
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <txt>Share analystics</txt>
                            <span>&times;</span>
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

            <div className="following-tab">
                <div className="closeevery" onClick={() => { document.querySelector('.following-tab').style.display = "none" }}>&times;</div>
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

            <div className="followers-tab">
                <div className="closeevery" onClick={() => { document.querySelector('.followers-tab').style.display = "none" }}>&times;</div>
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <txt>Followers</txt>
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
                            </div>
                        </div>
                        <hr style={{ border: '1px solid #f9f9f9' }} />
                    </div>
                </div>
            </div>

            <div className="layout2" style={{ paddingBottom: '40px' }}>
                <div className="contnr">
                    <img id="trigger" src="images/rieledowns-20210420-0003.jpg" alt="cover_image" onClick={() => { document.querySelector('#mymodal').style.display = 'block' }} />

                    <div id="mymodal" className="modal" onClick={() => { document.querySelector('#mymodal').style.display = 'none' }}>
                        <img src="images/rieledowns-20210420-0003.jpg" alt="cover_image" />
                        <span className="closeicon">&times;</span>
                    </div>
                </div>
                <div className="contnr-1">
                    <div className="b-photo">
                        {user && <img id="trigger-profile" src={user.photoURL} alt="profile_image" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'block' }} />}

                        <div id="mymodal-profile" className="modal" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'none' }}>
                            <img src={user.photoURL} alt="cover_image" />
                            <span className="closeprofile" onClick={() => { document.querySelector('#mymodal-profile').style.display = 'none' }}>&times;</span>
                        </div>
                    </div>
                    <div className="verified">&#10004;</div>
                    <div className="data-info">
                        <div className="container">
                            <div className="business-name">
                                Riele Downs
                            </div>
                            <div className="email-address">
                                @marketfame
                            </div>
                            <div className="star">
                                <div className="ratings-00" style={{ margin: 0 }}>
                                    <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                </div>
                                <rates>2.6 rating</rates>
                            </div>
                        </div>
                        <div className="descriptive-infos">
                            <p>Hi.. i'm Riele Downs and im gonna be educating you on how to make your hair look super
                            great like mine. and wooohooo!! i just got a unisex saloon in las vegas, feel free to come
                            visit and patronise us. get to us on hairrrs @rieletouch www.rieletouch.com. :)
                        </p>
                            <div className="catalogue">
                                <h>Beauty company</h>
                                <h>Blog</h>
                                <img src="images/Icon material-web.svg" alt="web" />
                                <span>rieletouch.com</span>
                                <div className="locate-icon">
                                    <img src="images/location-icon.svg" alt="locate icon ohyanga" />
                                </div><span>Locate</span>
                            </div>
                        </div>

                    </div>
                    <div className="control-class">
                        <div className="container-2" style={{ width: '270px' }}>
                            <div className="btn-msg">
                                <div className="message" style={{
                                    borderRadius: '0px',
                                    border: '1px solid #f40053', color: '#f40053'
                                }}>Message</div>
                            </div>
                            <div className="btn-flw">
                                <div className="userbtn">Follow</div>
                            </div>
                            <div className="btn-folowers">
                                <div className="userbtn">2.6k</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rack">
                    <div className="accord-rack">
                        <div className="img3">
                            <div className="img4">
                                <div className="content-1">
                                    <img src="images/info-icon.svg" alt="ohyanga info icon" />
                                    <txt>info</txt>
                                </div>
                                <div className="rack-info">
                                    <h2>Lounge users</h2>
                                    <p>
                                        We provide maximum visibility to every account that made it
                                        to the lounge dashboard. This dashboard is shown worldwide.
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                    <div className="accord-rack" onClick={() => { topFunction() }}>
                        <Link to="/business-profile?name=Riele-Down"><div className="img1">
                            <div className="img2"></div>
                        </div></Link><txt>Agent</txt>
                    </div>
                </div>

                <div className="business-statistics">
                    <div className="stats-0">
                        <Link to="/add-product" ><div className="box-3">
                            <img src="images/icon-add-product.png" alt="" className="" /><h2>sell product</h2>
                        </div></Link>
                        <Link to="/add-job"><div className="box-3">
                            <img src="images/icon-add-job.png" alt="" className="" /><h2>upload job vacancy</h2>
                        </div></Link>
                        <Link to="/create-article"><div className="box-3">
                            <img src="images/icon-add-article.png" alt="" className="" /><h2>Write an article</h2>
                        </div></Link>
                    </div>
                    <div className="stats-0">
                        <div className="box-1" onClick={() => { document.querySelector('.followers-tab').style.display = "block" }}>
                            <h3>2.6k</h3><h2>followers</h2>
                        </div>
                        <div className="box-1" onClick={() => { document.querySelector('.following-tab').style.display = "block" }}>
                            <h3>23</h3><h2>following</h2>
                        </div>
                        <div className="box-1">
                            <h3>2.6</h3><h2>total rating</h2>
                        </div>
                    </div>
                    <div className="stats-0">
                        <div className="box-5">
                            <Link to="#" ><h3>32</h3><h2>products</h2></Link>
                        </div>
                        <span><div className="box-5">
                            <Link to='#'><h3>23</h3><h2>job vacancies</h2></Link>
                        </div></span>
                        <div className="box-5">
                            <Link to='#'><h3>53</h3><h2>articles</h2></Link>
                        </div>
                    </div>
                </div>
                <div className="stats-2">
                    <div id="resumebtn" className="box-00" onClick={() => { document.querySelector('#resumetab').style.display = 'block' }}>
                        {/* <img src="images/resume-img.svg" alt="resume image" /> */}
                        <img src="images/resume-img.svg" alt="resume" />
                        <h2>Your resume</h2>
                    </div>
                </div>
            </div>
            <div className="layout3" style={{ paddingTop: '40px', paddingBottom: '150px' }}>
                <div className="business-statistics">
                    <div className="accord-analystics">
                        <div className="header-00">
                            <h>Total Engagements</h>
                            <div className="share">
                                <img src="images/Icon awesome-share-alt.icon ohyanga" alt="" />
                            </div>
                        </div>
                        <div className="gift" style={{ display: 'none' }}>
                            <div className="g1"><img src="images/Group 166.svg" alt="setting icon" /><txt>gift</txt>
                                <hr style={{ position: 'absolute', width: '780px', top: '12px', left: '47px' }} />
                                <h>&bull;</h>
                            </div>
                            <div className="g2"><img src="images/Group 166.svg" alt="setting icon" /><txt>gift</txt>
                                <hr style={{ position: 'absolute', width: '780px', top: '12px', left: '47px' }} />
                                <h>&bull;</h></div>
                            <div className="g3"><img src="images/Group 166.svg" alt="setting icon" /><txt>gift</txt>
                                <hr style={{ position: 'absolute', width: '780px', top: '12px', left: '47px' }} /><h>&bull;</h></div>
                        </div>
                        <div className="f4">
                            <div className="tabler">
                                <ul>
                                    <li>7k</li>
                                    <li>6k</li>
                                    <li>5k</li>
                                    <li>4k</li>
                                    <li>3k</li>
                                    <li>2k</li>
                                    <li>1k</li>
                                    <li>900</li>
                                </ul>
                            </div>
                            <hr />
                            <div className="f92">
                                <div className="f5">
                                    <div className="a1"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Jan</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a2"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Feb</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a3"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Mar</txt></div>
                            </div>

                            <div className="Total-revenue">
                                <div className="amount">728</div>
                                <div className="title">Total analystics</div>
                            </div>

                            <div className="f92">
                                <div className="f5">
                                    <div className="a4"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Apr</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a5"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>May</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a6"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Jun</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a7"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Jul</txt></div>
                            </div>
                            <div className="f92">
                                <div className="f5">
                                    <div className="a8"></div>
                                </div>
                                <div className="f6"><txt>&bull;</txt></div>
                                <div className="f7"><txt>Aug</txt></div>
                            </div>
                            <div className="hide-stats">
                                <div className="f92">
                                    <div className="f5">
                                        <div className="a1"></div>
                                    </div>
                                    <div className="f6"><txt>&bull;</txt></div>
                                    <div className="f7"><txt>Sep</txt></div>
                                </div>
                                <div className="f92">
                                    <div className="f5">
                                        <div className="a1"></div>
                                    </div>
                                    <div className="f6"><txt>&bull;</txt></div>
                                    <div className="f7"><txt>Oct</txt></div>
                                </div>
                                <div className="f92">
                                    <div className="f5">
                                        <div className="a1"></div>
                                    </div>
                                    <div className="f6"><txt>&bull;</txt></div>
                                    <div className="f7"><txt>Nov</txt></div>
                                </div>
                                <div className="f92">
                                    <div className="f5">
                                        <div className="a1"></div>
                                    </div>
                                    <div className="f6"><txt>&bull;</txt></div>
                                    <div className="f7"><txt>Dec</txt></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessProfile
