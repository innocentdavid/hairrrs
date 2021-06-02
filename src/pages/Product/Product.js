import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCollectionOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { auth, db } from '../../firebase';
import { getDesc, getMonthDateYearHour_minute, getUserGeolocationDetails, hasSaved, save, topFunction, Unsave } from '../../fuctions';
import TrendingArticles from '../../components/TrendingArticles';
import { Helmet } from 'react-helmet';
import { SaveListContext } from '../../contexts/GlobalStore';
import SocialMediaButtons from '../../components/SocialMediaButtons';

function Product() {
    var titleSlug;
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    if (!params.has('title')) {
        history.push('/products')
    } else {
        if (params.get('title') === '') {
            history.push('/products')
        } else {
            titleSlug = params.get('title');
        }
    }

    if (!titleSlug) { history.push('/products') }

    const [saveList] = useContext(SaveListContext)
    const [showShare, setShowShare] = useState(false)

    const productRef = db.collection('products')
    const query = productRef.doc(titleSlug);
    const [product] = useDocumentData(query, { idField: 'id' });

    // seller's userName
    useEffect(() => {
        if (product) {
            db.collection("users").doc(product?.seller).collection('followers').get().then(doc => {
                if (!doc.empty) {
                    const totalFollowers = doc.docs.map((doc) => (doc.data())).length;
                    document.querySelector('.seller-followers').textContent = totalFollowers;
                }
            })
        }
    }, [product])

    // var activeTile = document.querySelector('.activeTile');
    // console.log({ activeTile });

    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            document.querySelector('#prevw-pane').src = e.target.attributes.src.value
        })
    })

    const [relProducts, setRelProducts] = useState([]);

    const relProductQuery = product ? db.collection('products').where('category', '==', product?.category) : db.collection('products');
    const [relatedProduct, loadingRelatedProduct, relatedProductError] = useCollectionOnce(
        relProductQuery, { idField: 'id' }
    );
    relatedProductError && console.log(relatedProductError);

    useEffect(() => {
        relatedProduct && setRelProducts(relatedProduct?.docs.map(doc => ({ id: doc.id, product: doc.data() })))
    }, [relatedProduct])

    const requestcall = (id) => {
        if (product?.seller !== auth.currentUser.displayName) {
            if (product?.sellerId) {
                db.collection('users').doc(product?.sellerId).collection('requestedCalls').doc(`${id}_${auth.currentUser.uid}`).set({
                    email: auth.currentUser.email,
                    phone: auth.currentUser.phoneNumber,
                    name: auth.currentUser.displayName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
        }
        alert("Your request has been sent to this seller")
    }


    // getUserGeolocationDetails to set page view
    useEffect(() => {
        const unsubscribe = () => {
            if (product?.id) {
                getUserGeolocationDetails().then(data => {
                    const docId = `${data.country_name}_${data.IPv4}`;

                    if (window.location.hostname !== 'localhost' && product?.sellerId !== auth.currentUser.uid) {
                        db.collection('products').doc(product?.id).collection('pageViews').doc(docId).set({
                            IPv4: data.IPv4,
                            city: data.city,
                            state: data.state,
                            country_code: data.country_code,
                            country_name: data.country_name,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).catch(error => { console.log('Error setting page view', error) })
                        db.collection('products').doc(product?.id).update({ totalPageView: firebase.firestore.FieldValue.increment(1) })
                    }
                })
            }
        }
        unsubscribe();
    }, [product])
    // getUserGeolocationDetails to set page view end


    return (
        <>
            <Helmet>
                <title>{`${product?.title} - Hairrrs`}</title>
                <meta name="description" content={getDesc(product?.details, 65)} />
                <meta property="og:title" content={product?.category} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/product?title=${getDesc(product?.title, 35)}`} />
                <meta property="og:type" content="product" />
                <meta property="og:description" content={getDesc(product?.details, 35)} />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>

            {product &&
                <>
                    {/* <ReportBoard /> */}

                    <div>
                        <div className="layout2a">
                            <div className="according">
                                <div className="pages-timeline">
                                    <span className="pages"><Link to="/">Home</Link> {`>`} <Link to={`/products?category=${product?.category}`}>products</Link> {`>`} {product?.category}</span>
                                </div>

                                <div className="productImages">
                                    <div className="image-view">
                                        <img id="prevw-pane" src="/images/wigs-braids.jpeg" alt="" />
                                    </div>

                                    <div className="arrows">
                                        <span className="prev">&#10094;</span>
                                        <span className="next">&#10095;</span>
                                    </div>
                                    <div className="p-10px"></div>
                                    <div className="images-view-1">
                                        <img className="tile activeTile" data-src="/images/wigs-braids.jpeg" src="/images/wigs-braids.jpeg" alt="" />
                                        <img className="tile" data-src="/images/wigs-braids-1.jpeg" src="/images/wigs-braids-1.jpeg" alt="" />
                                        <img className="tile" data-src="/images/wigs-braids.jpeg" src="/images/wigs-braids.jpeg" alt="" />
                                        <img className="tile" data-src="/images/wigs-braids-1.jpeg" src="/images/wigs-braids-1.jpeg" alt="" />
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <div className="stocksout">Out of stock</div>
                                    <div className="trash">Trash</div>
                                </div>

                                <br />
                                <div className="reviews">
                                    <div className="views-container">
                                        <img src="/images/views.png" alt="" />
                                        <span className="views">{product?.totalPageView ? product.totalPageView : 0} <span>views</span></span>
                                    </div>
                                    <div className="report-1">
                                        <div className="dids-3">
                                            <div className="icon">
                                                <img src="/images/Sharebtn.png" alt="" />
                                            </div>
                                            <div className="reach" style={{ position: 'relative' }}>
                                                <div className={`show_share show_share_${showShare}`} style={{ position: 'absolute', bottom: '35px' }}>
                                                    <SocialMediaButtons url={`ntutu-fdb00.web.app/product?title=${product?.id}`} text={getDesc(product?.details, 65)} />
                                                </div>
                                                <div className="text" onClick={() => { setShowShare(!showShare) }}>share</div>
                                            </div>
                                            {/* <div className="text">share</div> */}
                                        </div>
                                        <div className="dids-4">
                                            {hasSaved(saveList, product?.id) ?
                                                <>
                                                    <div className="icon">
                                                        <img src="/images/savebtn.png" alt="" />
                                                    </div>
                                                    <div onClick={() => { Unsave(product?.id) }} className="text">&nbsp;saved</div>
                                                </>
                                                : <>
                                                    <div className="icon">
                                                        <img src="/images/saturday save icon.svg" alt="" />
                                                    </div>
                                                    <div onClick={() => { save(product?.id, product.featuredImage, product.title, `/product?title=${product.id}`, 'product') }} className="text">save</div>
                                                </>}
                                        </div>
                                        <div className="report-product">
                                            <div className="icon">
                                                <img src="/images/reportwt.png" alt="" />
                                            </div>
                                            <div className="text">report this product</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ratings-1">
                                    <div className="details">
                                        <h2>{product?.title}</h2>
                                        <span className="price">{product?.price}</span>
                                    </div>
                                    <hr />
                                    <div className="details-1">
                                        <h3>Details</h3>
                                        <span className="info">{product?.details}
                                        </span>
                                        <div className="post-infos">
                                            <h2>Posted</h2><span className="info">{getMonthDateYearHour_minute(product?.createdAt)}</span>
                                            <h2>Category</h2><span className="info">{product?.category}</span>
                                            <h2>Type</h2><span className="info">{product?.type}</span>
                                            <h2>Location</h2><span className="info">{product?.rigion}</span>
                                            <h2>Address</h2><span className="info">{product?.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="Contact-user">
                                    <Link to="#"><div className="chat">Chat</div></Link>
                                    <div style={{ cursor: 'pointer' }} onClick={() => { requestcall(product?.id) }} className="Requestcall">Request Call</div>
                                </div>
                                <div className="call-class">
                                    <Link to={`/tel:${product?.phone.toString().slice(1).replace(/ /g, '')}`}><div className="call">Call {product?.phone}</div></Link>
                                </div>
                            </div>
                        </div>

                        <div className="layout2a">
                            <div className="related">
                                {/* Related products */}
                                <div className="products">
                                    <div className="trenz">
                                        <h1>Related products</h1>
                                    </div>
                                    <div className="shelf">

                                        {loadingRelatedProduct && <h3>Loading ...</h3>}
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
                                                                <div className="save--icon">
                                                                    <img src="/images/circle-arrow-down-color.svg" className="group84" alt={product?.title} />
                                                                </div>
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
                                {/* Trending Articles */}
                                <TrendingArticles />
                            </div>
                        </div>
                    </div>

                    <div className="layout6">
                        <div className="sellers-data">
                            <span>Posted by</span>
                            <div className="users-data">
                                <div className="images-data">
                                    <img src="/images/user.png" alt="" />
                                </div>
                                <div className="sellers-name">{product?.seller}</div>
                                <div className="clickables">
                                    <div className="message">Message</div>
                                    <div className="follow">Follow</div>
                                    <div className="followers seller-followers"></div>
                                </div>
                            </div>
                            <div className="report">
                                <img src="/images/Icon material-flag.png" className="flag" alt="" /> Report this Business</div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Product
