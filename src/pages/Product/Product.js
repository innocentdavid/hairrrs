import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { auth, db } from '../../firebase';
import { getDesc, getFormattedValue, getMonthDateYearHour_minute, hasSaved, save, Unsave, UrlSlug } from '../../fuctions';
import { Helmet } from 'react-helmet';
import { NotificationContext, SaveListContext } from '../../contexts/GlobalStore';
import SocialMediaButtons from '../../components/SocialMediaButtons';
import UserProfile from '../../components/UserProfile';
import ItemOwner from '../../components/ItemOwner';
import Chat from '../../components/Chat';
import MyImage from '../../components/MyImage';

function Product() {
    var user = UserProfile.getUser();
    // console.log(user)

    var titleSlug;
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    if (!params.has('title')) {
        history.push('/products')
    } else {
        if (params.get('title') === '') {
            history.push('/products')
        } else {
            titleSlug = UrlSlug(params.get('title'), 'decode');
        }
    }

    if (!titleSlug) { history.push('/products') }

    const [saveList] = useContext(SaveListContext)
    const [notificationList] = useContext(NotificationContext)
    const [showShare, setShowShare] = useState(false)

    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState([])

    // setProduct
    useEffect(() => {
        db.collection('products')
            .where('title', '==', titleSlug)
            .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    let id = snapshot.docs.map(doc => doc.id)
                    setProductId(id[0])

                    let product = snapshot.docs.map(doc => doc.data())
                    setProduct(product[0])
                } else {
                    history.push('/products')
                }
            })
    }, [history, titleSlug])

    const handleEditProduct = () => {
        history.push(`/add-product?edit=${productId}`)
    }

    const handleDeleteJob = async () => {
        if (productId && await window.confirm('Are you sure?')) {
            db.collection('products').doc(productId).delete()
            history.push('/products')
        }
    }

    const [hasRequestedCalled, setHasRequestedCalled] = useState(false);
    useEffect(() => {
        if (notificationList && product) {
            notificationList.forEach(item => {
                if (item.id === `${productId}_requestedCalls`) {
                    setHasRequestedCalled(true)
                }
            });
        }
    }, [notificationList, product, productId])


    // seller's totalFollowers
    useEffect(() => {
        if (product) {
            db.collection("users").doc(product?.seller?.uid).collection('followers').get().then(doc => {
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

    const requestcall = (id) => {
        if (product?.seller?.displayName !== auth.currentUser.displayName) {
            if (product?.seller?.id) {
                db.collection('users').doc(product?.seller?.id).collection('history').doc(`${id}_requestedCalls`).set({
                    userName: user.displayName,
                    userPhotoURL: user.photoURL,
                    productTitle: product?.title,
                    type: 'requestedCalls',
                    email: user.email,
                    phone: user.phoneNumber,
                    link: `/product?title=${productId}`,
                    name: user.displayName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })

                db.collection('users').doc(user?.uid).collection('requestedCalls').doc(id).set({
                    title: product?.title,
                    price: product?.price,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
        }
        setHasRequestedCalled(true)
    }
    const deleteRequestcall = (id) => {
        if (product?.seller?.displayName !== auth.currentUser.displayName) {
            if (product?.seller?.uid) {
                db.collection('users').doc(product?.seller?.uid).collection('history').doc(`${id}_requestedCalls`).delete()
                db.collection('users').doc(user?.uid).collection('requestedCalls').doc(id).delete()
            }
        }
        setHasRequestedCalled(false)
    }

    var productImages = document.querySelector('.productImagesI')
    var prevwPane = document.querySelector('#prevw-pane')
    useEffect(() => {
        if (productImages && prevwPane) { prevwPane.src = productImages.src }
    }, [prevwPane, productImages]);

    const [openChat, setOpenChat] = useState(false)

    var slideIndex = 1;
    setTimeout(() => {
        showSlides(slideIndex);
    }, 1000);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        // var dots = document.getElementsByClassName("demo");
        // var captionText = document.getElementById("caption");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        // for (i = 0; i < dots.length; i++) {
        //   dots[i].className = dots[i].className.replace(" active", "");
        // }
        var slidesR = slides[slideIndex - 1]
        if (slidesR) { slidesR.style.display = "block" }
        // var dotsR = dots[slideIndex-1];
        // if(dotsR){ dotsR.className += " active" }
        // if(captionText){ captionText.innerHTML = dots[slideIndex-1].alt }
    }


    // set page viewed
    useEffect(() => {
        const setPageViewed = async () => {
            const isAuthor = (a, b) => a === b ? true : false;

            let sellerId = product?.seller?.uid
            let cUserId = user?.uid

            if (sellerId && cUserId) {
                var totalPageView = await document.querySelector('#totalPageViewSection');
                var pageUrl = await window.location.href;
                var storedPages = await JSON.parse(localStorage.getItem(pageUrl));
                let UpdatedViewCount = parseInt(totalPageView?.textContent) + 1

                if (
                    storedPages === null
                    && !isAuthor(sellerId, cUserId)
                    && totalPageView?.textContent
                    && productId
                    && pageUrl
                ) {
                    localStorage.setItem(pageUrl, JSON.stringify(pageUrl));
                    document.querySelector('#totalPageViewSection').textContent = UpdatedViewCount
                    db.collection('products').doc(productId).update({ totalPageView: firebase.firestore.FieldValue.increment(1) })
                }
            }
        }

        return () => { setPageViewed() }
    }, [productId, product, user])
    // localStorage.removeItem(window.location.href)


    if (product?.title) {
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
                        <div>
                            {openChat && <Chat toggle={setOpenChat} userId={user?.uid} />}
                            <div className="layout2a">
                                <div className="according">
                                    <div className="pages-timeline">
                                        <span className="pages"><Link to="/">Home</Link> {`>`} <Link to={`/products?category=${product?.category}`}>products</Link> {`>`} {product?.category}</span>
                                    </div>

                                    <div className="productImages">
                                        <div className="image-view">
                                            {product?.productImages?.map(({ src }) => (
                                                //     <MyImage
                                                //     src={src}
                                                //     key={src}
                                                //     width='510px'
                                                //     height='458px'
                                                //     alt=""
                                                //     className="mySlides"
                                                //   />
                                                <img
                                                    className="mySlides"
                                                    key={src}
                                                    src={src}
                                                    style={{ height: '458px', width: '510px' }}
                                                    alt="" />
                                            ))}
                                        </div>

                                        <div className="arrows">
                                            <span className="prev" onClick={() => { plusSlides(-1) }}>&#10094;</span>
                                            <span className="next" onClick={() => { plusSlides(1) }}>&#10095;</span>
                                        </div>
                                        <div className="p-10px"></div>
                                        <div className="images-view-1">
                                            {product?.productImages?.map((data, index) => (
                                                <img
                                                    onClick={(e) => {
                                                        // showSlides(index);
                                                        document.querySelector('.mySlides').src = e.target.src;
                                                    }}
                                                    key={data.src}
                                                    src={data.src}
                                                    style={{ width: 60, height: 60 }}
                                                    alt="" />
                                            ))}
                                        </div>
                                    </div>


                                    <br />
                                    <div className="reviews">
                                        <div className="views-container">
                                            <img src="/images/views.png" alt="" />
                                            {/* <span className="views">{product?.totalPageView ? product?.totalPageView : 0} <span>views</span></span> */}
                                            <span className="views"><span id='totalPageViewSection'>{product?.totalPageView ? product.totalPageView : 0}</span> <span>views</span></span>
                                        </div>
                                        <div className="report-1">
                                            <div className="dids-3" onClick={() => { setShowShare(!showShare) }}>
                                                <div className="icon">
                                                    <img src="/images/Sharebtn.png" alt="" />
                                                </div>
                                                <div className="reach" style={{ position: 'relative' }}>
                                                    <div className={`show_share show_share_${showShare}`} style={{ position: 'absolute', bottom: '35px' }}>
                                                        <SocialMediaButtons url={`ntutu-fdb00.web.app/product?title=${productId}`} text={getDesc(product?.details, 65)} />
                                                    </div>
                                                    <div className="text">share</div>
                                                </div>
                                                {/* <div className="text">share</div> */}
                                            </div>
                                            {hasSaved(saveList, productId) ?
                                                <div className="dids-4" onClick={() => { Unsave(productId) }}>
                                                    <div className="icon">
                                                        <img src="/images/savebtn.png" alt="" />
                                                    </div>
                                                    <div className="text">&nbsp;saved</div>
                                                </div>
                                                : <div className="dids-4"
                                                    onClick={() => { save(productId, product?.productImages[0]?.src, product?.title, `/product?title=${productId}`, 'product') }}>
                                                    <div className="icon">
                                                        <img src="/images/saturday save icon.svg" alt="" />
                                                    </div>
                                                    <div className="text">save</div>
                                                </div>}
                                            {product?.seller?.uid !== auth.currentUser.uid ?
                                                <div className="report-product">
                                                    <div className="icon">
                                                        <img src="/images/reportwt.png" alt="" />
                                                    </div>
                                                    <div className="text">report this product</div>
                                                </div> :

                                                <div className="action-buttons" style={{ marginLeft: 5 }}>
                                                    <div className="stocksout">Out of stock</div>
                                                    <div
                                                        onClick={handleEditProduct}
                                                        className="trash" style={{ marginRight: '5px' }}>Edit</div>
                                                    <div
                                                        onClick={handleDeleteJob}
                                                        className="trash">Trash</div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="ratings-1">
                                        <div className="details">
                                            <h2>{product?.title}</h2>
                                            <span className={"price"}>{product?.price && getFormattedValue(product?.price, product?.currency)}</span>
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

                                    {auth.currentUser?.uid !== product?.seller?.uid && <>
                                        <div className="Contact-user">
                                            <div className="chat" onClick={() => { setOpenChat(true) }}>Chat</div>
                                            {hasRequestedCalled ? <div style={{ cursor: 'pointer' }} onClick={() => { deleteRequestcall(productId) }} className="Requestcall">Unrequest Call</div>
                                                : <div style={{ cursor: 'pointer' }} onClick={() => { requestcall(productId) }} className="Requestcall">Request Call</div>}
                                        </div>
                                        <div className="call-class">
                                            <Link to={`/tel:${product?.phone?.toString().slice(1).replace(/ /g, '')}`}><div className="call">Call {product?.phone}</div></Link>
                                        </div>
                                    </>}
                                </div>
                            </div>

                            <div className="layout2a">
                                <div className="related">
                                    {/* Related products */}
                                    {/* <RelatedProduct category={product?.category} title={product?.title} /> */}

                                    {/* Trending products */}
                                    {/* <Trendingproducts /> */}
                                </div>
                            </div>
                        </div>

                        <ItemOwner userId={product?.seller?.uid} />
                    </>
                }
            </>
        )
    } else {
        return (<div style={{
            width: '100%',
            height: '100vh',
            marging: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '100px',
        }}>
            Loading...
        </div>)
    }
}

export default Product
