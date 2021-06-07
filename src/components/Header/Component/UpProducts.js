import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase'
import TrendingArticles from '../../TrendingArticles'

function UpProducts() {
    const [mostEngagedProduct, setMostEngagedProduct] = useState([])
    useEffect(() => {
        db.collection('products').orderBy('totalEngagement', 'desc').limit(1).get().then(snapshot => {
            let r = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setMostEngagedProduct(r)
        })
    }, [])

    return (
        <div className="up-products">Products
        <span className="tooltiptext1">
            <div className="categories-class">
                <span className="cats">
                    <ul>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                        <Link to="products"><li>product category</li></Link>
                    </ul>
                </span>
            </div>

            <div className="top-display align-content">
                <div className="according-00">

                    {/* mostEngagedProduct advert-billboard */}
                    <div className="advert-billboard">
                        <img src={mostEngagedProduct[0]?.imageUrl} alt="hairrrs product" />
                        <div className="free-shopper">
                            <Link to={`/product?title=${mostEngagedProduct[0]?.id}`}>
                                <div className="shopper">
                                    <div className="imgbox">
                                        <div className="details">
                                            <h2>{mostEngagedProduct[0]?.title}</h2>
                                            <span className="price">{mostEngagedProduct[0]?.price}</span>
                                            <div className="seller">{mostEngagedProduct[0]?.seller}</div>
                                            <div className="likes--save">
                                                <div className="promo-validity">
                                                    <div className="goldpromotion">{mostEngagedProduct[0]?.promotion}</div>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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

export default UpProducts
