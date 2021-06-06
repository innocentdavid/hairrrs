import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function ProductCard({ catg }) {
    
    return (
        <Link to={`product?title=Classical-Wig-everlly-style`} className="products" >
            <div className="shopper">
                <div className="imgbox">
                    <img src="/images/nutless braid.png" alt="images" className="images" />
                    <div className="details">
                        <h2>Classical Wig, everlly style</h2>
                        <span>N17,500</span>
                        <div className="seller">hairrrs</div>
                        <div className="likes--save">
                            <div className="promo-validity">
                                <div className="goldpromotion">Gold promotion</div>
                            </div>
                            <div className="save--icon" onClick={(e)=>{e.preventDefault(); }}>
                                <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
