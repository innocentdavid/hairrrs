import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SaveListContext } from '../contexts/GlobalStore';
import { db } from '../firebase';
import { getFormattedValue, hasSaved, save, topFunction, Unsave, UrlSlug } from '../fuctions';
import MyImage from './MyImage';

function ProductCard({ catg }) {
    const [products, setProducts] = useState([])
    const [saveList] = useContext(SaveListContext)

    let a = `featuredCatgProducts_${catg}`;
    let storageId = a.toString()
    const storedArticles = localStorage.getItem(storageId)
    useEffect(() => {
        if (storedArticles) {
            const data = JSON.parse(storedArticles)
            setProducts(data)
        }
    }, [storedArticles])

    useEffect(() => {
        db.collection('products')
            .where('category', '==', catg)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                if(!snapshot.empty){
                    let r = snapshot.docs.map(doc => ({ product: doc.data(), id: doc.id }))
                    setProducts(r)
                    localStorage.setItem(storageId, JSON.stringify(r));
                }
            })
    }, [catg, storageId]);

    return (<>
        {products?.map(({ product, id }) => (
            <Link 
            key={id} 
            onClick={() => { topFunction() }}
            to={`product?title=${product?.title && UrlSlug(product?.title, 'encode')}`} 
            className="products" >
                <div className="shopper">
                    <div className="imgbox">
                        {product?.productImages[0]?.src &&
                            <MyImage
                            src={product?.productImages[0]?.src}
                            width= '119px'
                            height='100%'
                            alt="images"
                            className="images"
                            />
                        }
                        <div className="details">
                            <h2>{product?.title}</h2>
                            <span>{product?.price && getFormattedValue(product?.price, product?.currency) }</span>
                            <div className="seller">{product?.sellerName}</div>
                            <div className="likes--save">
                                <div className="promo-validity">
                                    <div className="goldpromotion">{product?.promotion}</div>
                                </div>
                                <div style={{}}>
                                    {hasSaved(saveList, id) ?
                                        <img
                                            onClick={(e) => { e.preventDefault(); Unsave(id) }}
                                            src="/images/circle-arrow-down-color.svg"
                                            alt=""
                                            className="group84"
                                        />
                                        : <img
                                            onClick={(e) => { e.preventDefault(); save(id, product?.productImages[0]?.src, product?.title, `/product?title=${product?.title}`, 'product') }}
                                            src="/images/saturday save icon.svg"
                                            alt=""
                                            className="group84"
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </>)
}

export default ProductCard
