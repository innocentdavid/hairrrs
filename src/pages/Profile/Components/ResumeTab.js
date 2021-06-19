import React from 'react'
import { Link } from 'react-router-dom'

function ResumeTab({ setShowResumeTab }) {
    return (
        <div id="resumetab" className="resume-cv">
            <div className="closeevery" onClick={() => { setShowResumeTab(false) }}>&times;</div>
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
                        {/* <img src="images/rieledowns-20210420-0006.jpg" alt="profile image resume" /> */}
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

    )
}

export default ResumeTab
