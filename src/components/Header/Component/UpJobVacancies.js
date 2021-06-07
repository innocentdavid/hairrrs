import React from 'react'
import { Link } from 'react-router-dom'
import TrendingArticles from '../../TrendingArticles'

function UpJobVacancies() {
    return (
        <div className="up-JobVacancies">Job Vacancies
        <span className="tooltiptext1">
            <div className="categories-class">
                <span className="cats">
                    <ul>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                        <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                    </ul>
                </span>
            </div>

            <div className="top-display align-content">
                <div className="according-00">
                    <div className="advert-billboard">
                        <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="hairrrs job vacancy" />
                        <div className="free-shopper-2">
                            <div className="shelf-jv">
                                <Link to="jobvacancies-application.html"><div className="shopper-jv">
                                    <div className="imgbox">
                                        <div className="view-image-2">
                                            <img src="/images/signin img.png" alt="" className="/images" />
                                            <div className="verified">&#10004;</div>
                                        </div>
                                        <div className="details-00">
                                            <h2>Hairstylists and braids</h2>
                                            <span className="info"><i>A hairstylist is needed for immediate
                                        employment at Ntu...</i></span>

                                            <div className="time-location">
                                                <img src="/images/Icon material-access-time.png" alt="" className="time" />Full time
                                            <img src="/images/Icon material-location-searching.png" alt="" className="Location" />Lagos, Nigeria
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

                    <div className="shelf-hover-00">
                        <TrendingArticles limit={4} />
                    </div>


                </div>
            </div>
        </span>
    </div>

    )
}

export default UpJobVacancies
