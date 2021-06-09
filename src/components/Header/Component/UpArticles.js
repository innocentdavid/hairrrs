import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase'
import TrendingArticles from '../../TrendingArticles'

function UpArticles() {
    const [mostEngagedArticle, setMostEngagedArticle] = useState([])
    useEffect(() => {
        db.collection('articles')
        // .orderBy('totalEngagement', 'desc')
        .limit(1).get().then(snapshot => {
            let r = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setMostEngagedArticle(r)
        })
    }, [])

    return (
        <div className="up-Articles">Articles
        <span className="tooltiptext1">
            <div className="categories-class">
                <span className="cats">
                    <ul>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                        <Link to={`/articles?category=${'all'}`}><li>Articles category</li></Link>
                    </ul>
                </span>
            </div>

            <div className="top-display align-content">
                <div className="according-00">
                    
                    {/* mostEngagedArticle advert-billboard */}
                    <div className="advert-billboard">
                        <img src={mostEngagedArticle[0]?.articleCover} alt="hairrrs articles" />
                        <div className="free-shopper">
                            <Link to={`/article?title=${mostEngagedArticle[0]?.id}`}><div className="shopper5">
                                <div className="user-display">
                                    <img src="/images/user.png" alt="" />
                                    <span className="tooltiptext">Chizzyfix</span>
                                </div>
                                <div className="imgbox1">
                                    <div className="details1">
                                        <h2>How to braid hair in 3 minutes. 6steps<span className="promo">- Promoted</span></h2>
                                        <div className="informations">
                                            <span className="info">Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</span>
                                            <div className="artc-2">
                                                <div className="categories-filter">
                                                    <i><span className="info">Hair and beauty</span>
                                                        <h3>February 10</h3></i>
                                                </div>
                                            </div>
                                            <div className="likes--save">
                                                <div className="comments-thumbs">
                                                    <span className="views">423</span>
                                                    <h2>Likes</h2>
                                                    <span className="views">18</span>
                                                    <h2>Dislikes</h2>
                                                    <span className="views">675</span>
                                                    <h2>Comments</h2>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></Link>
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

export default UpArticles
