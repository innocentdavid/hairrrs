import React from 'react'
import { Link } from 'react-router-dom'

function Search() {
    return (
        <form>
        <div className="search--holder0">
            <input type="text" placeholder="search for Products, Services, or Articles"></input>
        </div>
        <button type="button" style={{ backgroung: 'black' }}>
            <img src="/images/search-header.svg" alt="" />
        </button>

        <div className="search-ads">
            <div className="search-tab">
                <div className="accord-text">
                    <div className="sub">
                        <span>Product</span>
                        <div className="onflex">
                            <Link to="product"><li>Alkaline wig</li></Link>
                            <div className="promo-validity">
                                <div className="goldpromotion">Gold promotion</div>
                            </div>
                        </div>
                        <div className="onflex">
                            <Link to="product"><li>Blonde D-jon weavon</li></Link>
                            <div className="promo-validity">
                                <div className="goldpromotion">Gold promotion</div>
                            </div>
                        </div>
                        <div className="onflex">
                            <Link to="product"><li>saisho Hair dryer</li></Link>
                            <div className="promo-validity">
                                <div className="goldpromotion">Gold promotion</div>
                            </div>
                        </div>
                        <div className="onflex">
                            <Link to="product"><li>LG hair stretcher</li></Link>
                            <div className="promo-validity">
                                <div className="goldpromotion">Gold promotion</div>
                            </div>
                        </div>
                    </div>

                    <div className="sub">Job Vacancies</div>

                    <div className="onflex">
                        <Link to="jobvacancies-application.html"><li>Sales girl needed</li></Link>
                        <div className="promo-validity">
                            <div className="goldpromotion">Gold promotion</div>
                        </div>
                    </div>

                    <div className="onflex">
                        <Link to="jobvacancies-application.html"><li>Hair stylist needed</li></Link>
                        <div className="promo-validity">
                            <div className="goldpromotion">Gold promotion</div>
                        </div>
                    </div>

                    <div className="onflex">
                        <Link to="jobvacancies-application.html"><li>Barber needed</li></Link>
                        <div className="promo-validity">
                            <div className="goldpromotion">Gold promotion</div>
                        </div>
                    </div>

                    <div className="onflex">
                        <Link to="jobvacancies-application.html"><li>hair doctor needed</li></Link>
                        <div className="promo-validity">
                            <div className="rubypromotion">Ruby promotion</div>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="sub">Articles</div>

                    <div className="onflex">
                        <Link to="Articles-post.html"><li>How to make good money with...</li></Link>
                        <div className="promo-validity">
                            <div className="silverpromotion">Promoted</div>
                        </div>
                    </div>
                    <div className="onflex">
                        <Link to="Articles-post.html"><li>How to gain engagement...</li></Link>
                        <div className="promo-validity">
                            <div className="silverpromotion">Promoted</div>
                        </div>
                    </div>
                    <div className="onflex">
                        <Link to="Articles-post.html"><li>How to wash hair</li></Link>
                        <div className="promo-validity">
                            <div className="silverpromotion">Promoted</div>
                        </div>
                    </div>
                    <div className="onflex">
                        <Link to="Articles-post.html"><li>3 Maintenance hair cream you...</li></Link>
                        <div className="promo-validity">
                            <div className="silverpromotion">Promoted</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    )
}

export default Search
