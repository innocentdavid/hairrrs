import React, { useContext, useEffect, useState } from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SaveListContext } from '../contexts/GlobalStore';
import { db } from '../firebase';
import { hasSaved, save, topFunction, Unsave } from '../fuctions';

function RelatedProduct({ title, category }) {
    const [relProducts, setRelProducts] = useState([]);

    const relProductQuery = db.collection('products')
        .where('category', '==', category)
        .where('title', '!=', title);
    const [relatedProduct, loadingRelatedProduct, relatedProductError] = useCollectionOnce(
        relProductQuery, { idField: 'id' }
    );


    useEffect(() => {
        relatedProduct && setRelProducts(relatedProduct?.docs.map(doc => ({ id: doc.id, product: doc.data() })))
    }, [relatedProduct])

    const [saveList] = useContext(SaveListContext)

    if (relatedProductError) {
        return (
            <h3>Loading ...</h3>
        )
    }

    if (loadingRelatedProduct) {
        return (
            <h3>Loading ...</h3>
        )
    }

    return (
        <div className="products">
            <div className="trenz">
                <h1>Related products</h1>
            </div>
            <div className="shelf">
                {relProducts && relProducts.map(({ id, product }) => (
                    <Link key={id} to={`/product?title=${id}`} onClick={() => { topFunction() }}>
                        <div className="shopper">
                            <div className="imgbox">
                                <img src="/images/nutless braid.png" alt={product?.title} />
                                <div className="details">
                                    <h2>{product?.title}</h2>
                                    <span className="price">{product?.price}</span>
                                    <div className="seller">{product?.seller}</div>
                                    <div className="likes--save">
                                        <div className="promo-validity">
                                            <div className="goldpromotion">{product?.promotion}</div>
                                        </div>
                                        {hasSaved(saveList, id) ?
                                            <img onClick={(e) => { e.preventDefault(); Unsave(id) }} src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                            : <img onClick={(e) => { e.preventDefault(); save(id, product.featuredImage, product.title, `/product?title=${product.title}`, 'product') }} src="/images/saturday save icon.svg" alt="" className="group84" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="seemore-class">
                    <Link to="products-page.html"><div className="seemore">see more</div></Link>
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
