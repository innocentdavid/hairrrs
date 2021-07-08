import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase'
import TrendingArticles from '../../TrendingArticles/TrendingArticles'

function UpProducts() {
    const [mostEngagedProduct, setMostEngagedProduct] = useState([])
    const [categories, setCategories] = useState([])

    // setProductCategories from cache
    const storedProductCategories = localStorage.getItem('productCategories')
    useEffect(() => {
        const unsub = () => {
            if (storedProductCategories) {
                const data = JSON.parse(storedProductCategories)
                setCategories(data)
            }
        }
        return () => { unsub() }
    }, [storedProductCategories])
    
    useEffect(() => {
        const unsub = () => {
            db.collection('productCategories').get()
                .then((doc) => {
                    if (!doc.empty) {
                        let r = doc.docs.map(doc => ({ category: doc.data(), id: doc.id }))
                        setCategories(r)
                        localStorage.setItem('productCategories', JSON.stringify(r));
                    }
                })
        }
        return () => { unsub() }
    }, [])



    useEffect(() => {
        db.collection('products')
            // .orderBy('totalEngagement', 'desc')
            .limit(1)
            .onSnapshot(snapshot => {
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
                            {categories && categories.map(({ id, category }) => (
                                <Link key={id} to={`/products?category=${category?.value}`}><li>{category?.value}</li></Link>
                            ))}
                        </ul>
                    </span>
                </div>

                <div className="top-display align-content">
                    <div className="according-00">

                        {/* mostEngagedProduct advert-billboard */}
                        {mostEngagedProduct && mostEngagedProduct.map((product) => (
                            <div key={product?.id} className="advert-billboard">
                                <img src={product?.productImages[0]?.src} alt="hairrrs product" />
                                <div className="free-shopper">
                                    <Link to={`/product?title=${product.id}`}>
                                        <div className="shopper">
                                            <div className="imgbox">
                                                <div className="details">
                                                    <h2>{product?.title}</h2>
                                                    <span className="price">{product?.price}</span>
                                                    <div className="seller">{product?.seller?.displayName}</div>
                                                    <div className="likes--save">
                                                        <div className="promo-validity">
                                                            <div className="goldpromotion">{product?.promotion}</div>
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
                        ))}

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
