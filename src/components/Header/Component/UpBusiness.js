import React from 'react'
import { Link } from 'react-router-dom'
import TrendingArticles from '../../TrendingArticles'

function UpBusiness() {
    return (
        <div className="up-business">Businesses
        <span className="tooltiptext1">
            <div className="categories-class">
                <span className="cats">
                    <ul>
                        <Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link> <Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                        <Link to="businesses-page.html"><li>businesses category</li></Link>
                    </ul>
                </span>
            </div>

            <div className="top-display align-content">
                <div className="according-00">

                    {/* mostEngagedBusiness */}
                    <div className="advert-billboard">
                        <img src="/images/Lm3D9Aex.jpg" alt="hairrrs business" />
                        <div className="shopper-business">
                            <div className="view-image-2"></div>
                            <div className="verified">&#10004;</div>
                            <div className="businessname">Darling hair</div>
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

export default UpBusiness
