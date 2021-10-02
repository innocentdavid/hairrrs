import React from 'react'
import { Link } from 'react-router-dom'
import Filter from '../Jobs/Components/Filter'

function Businesses() {

    return (
        <div className="layout" style={{ marginTop: 0, paddingTop: '20px', overflow: 'hidden' }}>

            <div className="layout2a">
                <div className="pages-timeline-auto">
                    <pages>home {`>`} Businesses {`>`}</pages>
                </div>

                <div className="subcategories8">
                    <div className="shelf">
                        <Link to="businesses-profile.html"><div className="shopper">
                            <div className="imgbox">
                                <div className="view-image-1">
                                    <img src="images/signin img.png" className="images" alt="" />
                                    <div className="verified">&#10004;</div>
                                </div>
                                <div className="info-deck">
                                    <div className="details-0">
                                        <h2>ClassNameical Wig..</h2>
                                        <div className="star">
                                            <div className="ratings-001">
                                                <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                            </div>
                                        </div>
                                        <div className="follows-data">
                                            <Link to="#"><button className="followers">2.6k</button></Link>
                                            <button className="follow">follow</button>
                                        </div>
                                    </div>
                                    <div className="promo-validity">
                                        <div className="goldpromotion">Gold promotion</div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>

                        <Link to="businesses-profile.html"><div className="shopper">
                            <div className="imgbox">
                                <div className="view-image-1">
                                    <img src="images/signin img.png" className="images" alt="" />
                                    <div className="verified">&#10004;</div>
                                </div>
                                <div className="info-deck">
                                    <div className="details-0">
                                        <h2>ClassNameical Wig..</h2>
                                        <div className="star">
                                            <div className="ratings-001">
                                                <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                            </div>
                                        </div>
                                        <div className="follows-data">
                                            <Link to="#"><button className="followers">2.6k</button></Link>
                                            <button className="follow">follow</button>
                                        </div>
                                    </div>
                                    <div className="promo-validity">
                                        <div className="goldpromotion">Gold promotion</div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>

                    <div className="shelf">
                        <Link to="businesses-profile.html"><div className="shopper">
                            <div className="imgbox">
                                <div className="view-image-1">
                                    <img src="images/signin img.png" className="images" alt="" />
                                    <div className="verified">&#10004;</div>
                                </div>
                                <div className="info-deck">
                                    <div className="details-0">
                                        <h2>ClassNameical Wig..</h2>
                                        <div className="star">
                                            <div className="ratings-001">
                                                <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                            </div>
                                        </div>
                                        <div className="follows-data">
                                            <Link to="#"><button className="followers">2.6k</button></Link>
                                            <button className="follow">follow</button>
                                        </div>
                                    </div>
                                    <div className="promo-validity">
                                        <div className="goldpromotion">Gold promotion</div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>

                        <Link to="businesses-profile.html"><div className="shopper">
                            <div className="imgbox">
                                <div className="view-image-1">
                                    <img src="images/signin img.png" className="images" alt="" />
                                    <div className="verified">&#10004;</div>
                                </div>
                                <div className="info-deck">
                                    <div className="details-0">
                                        <h2>ClassNameical Wig..</h2>
                                        <div className="star">
                                            <div className="ratings-001">
                                                <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                            </div>
                                        </div>
                                        <div className="follows-data">
                                            <Link to="#"><button className="followers">2.6k</button></Link>
                                            <button className="follow">follow</button>
                                        </div>
                                    </div>
                                    <div className="promo-validity">
                                        <div className="goldpromotion">Gold promotion</div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                </div>
            </div>




            <div className="layout5">
                <Filter />
            </div>

        </div>
    )
}

export default Businesses
