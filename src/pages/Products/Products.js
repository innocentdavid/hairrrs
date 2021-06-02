import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { auth, db } from '../../firebase';

function Products() {
    var category;
    const params = new URLSearchParams(window.location.search);
    if (!params.has('category')) {
        category = 'all';
    } else {
        if (params.get('category') === '') {
            category = 'all';
        } else {
            let r = params.get('category');
            category = r.toLowerCase()
        }
    }

    const [products, setProducts] = useState([]);

    // getCatgProducts
    useEffect(() => {
        const getCatgProducts = () => {
            if (category === 'all') {
                db.collection('products').onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => ({ id: doc.id, product: doc.data() })));
                    setProducts(result)
                })
            } else {
                db.collection('products').where('category', '==', category).onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => ({ id: doc.id, product: doc.data() })));
                    setProducts(result)
                })
            }
        }
        getCatgProducts()
    }, [category])

    function addProduct() {
        let title = 'Classical Wig everlly style2';
        let id = title.replace(/\s+/g, '-');

        const data = {
            title,
            id,
            seller: auth.currentUser?.displayName,
            sellerId: auth.currentUser?.uid,
            price: 'N10, 000',
            type: 'Afro',
            category,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: auth.currentUser?.photoURL,
            promotion: 'Gold promotion',
            country: 'Nigeria',
            region: 'Lagos',
            details: 'Quality luxury hair with silky texture, Tangle free and shedding free, natural color, texture color, washable, and easy to maintain, Quality luxury hair with silky texture, Tangle free and shedding free, natural color, texture color, washable, and easy to maintain',
            address: 'Lagos Island(Eko), Lagos Nigeria',
            phone: '+234 811 265 904',
        }
        db.collection('products').doc(id).set(data);
        console.log('Added');
    }

    // insert ads
    useEffect(() => {
        if (products) {
            const insertAfter = referenceNode => {
                if (referenceNode) {
                    // let adsCont = document.querySelectorAll('.google-ads-product');
                    // if(adsCont){
                    //     adsCont.forEach(element => {
                    //         element.remove()
                    //     });
                    // }

                    var el = document.createElement("div");
                    el.classList.add('google-ads-product');
                    var google_ads_containment = document.createElement('div');
                    google_ads_containment.classList.add('google-ads-containment');
                    el.appendChild(google_ads_containment);

                    setTimeout(() => {
                        if(!referenceNode.nextSibling?.classList.contains('google-ads-product')){   
                            referenceNode.parentNode?.insertBefore(el, referenceNode.nextSibling);
                        }
                    }, 100);
                }
            }

            var div1 = document.querySelector('.productsCont').childNodes[2];
            var div2 = document.querySelector('.productsCont').childNodes[8];
            var div3 = document.querySelector('.productsCont').childNodes[17];
            var div4 = document.querySelector('.productsCont').childNodes[20];
            var div5 = document.querySelector('.productsCont').childNodes[26];
            var div6 = document.querySelector('.productsCont').childNodes[35];
            var div7 = document.querySelector('.productsCont').childNodes[38];
            var div8 = document.querySelector('.productsCont').childNodes[44];
            var div9 = document.querySelector('.productsCont').childNodes[53];

            if (div1) { setTimeout(() => { insertAfter(div1) }, 1000) }
            if (div2) { setTimeout(() => { insertAfter(div2) }, 1000) }
            if (div3) { setTimeout(() => { insertAfter(div3) }, 1000) }
            if (div4) { setTimeout(() => { insertAfter(div4) }, 1000) }
            if (div5) { setTimeout(() => { insertAfter(div5) }, 1000) }
            if (div6) { setTimeout(() => { insertAfter(div6) }, 1000) }
            if (div7) { setTimeout(() => { insertAfter(div7) }, 1000) }
            if (div8) { setTimeout(() => { insertAfter(div8) }, 1000) }
            if (div9) { setTimeout(() => { insertAfter(div9) }, 1000) }
        }
    }, [products])

    return (
        <>
            <Helmet>
                <title>{`${category} - Hairrrs`}</title>
                <meta name="description" content="Everything Hair" />
                <meta property="og:title" content={category} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/products?category=${category}`} />
                <meta property="og:type" content="product list" />
                <meta property="og:description" content="Everything Hair" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>
            
            {/* mainPage */}
            <div className="layout2a">
                <div className="pages-timeline-auto">
                    <span className="pages" style={{ textTransform: 'capitalize' }}><Link to="/">Home</Link> {`>`} Products {`>`} {category}</span>
                    <div style={{ position: 'fixed' }}><button onClick={() => { addProduct() }}>Add Product to this category</button></div>
                    <div className="errorMsg"></div>
                </div>

                <div className="productsCont">
                    {/* singleProduct */}
                    {products?.map(({ id, product }) => (
                        <div key={id} className="singleProduct">
                            <div className="p1">
                                <Link to={`/product?title=${id}`}>
                                    <img alt="" src="/images/wigs-braids-1.jpeg" />
                                </Link>
                                <div className="informations">
                                    <div className="details-1">
                                        <Link to={`/product?title=${id}`} >
                                            <h2>{product.title}</h2>
                                        </Link>
                                        <span className="price">{product.price}</span>
                                        <div className="categories-filter">
                                            <span className="seller">seller:</span><h4>{product.seller}</h4>
                                        </div>
                                        <div className="star">
                                            <div className="ratings-001">
                                                <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                            </div>
                                        </div>
                                        <div className="promo-validity">
                                            <div className="goldpromotion">{product.promotion}</div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                    {/* singleProduct */}
                    <div className="google-ads-product">
                        <div className="google-ads-containment"></div>
                    </div>
                </div>

                <div className="seemore-class">
                    <div className="seemore">see more</div>
                </div>
            </div>
            {/* mainPage */}

            <div className="layout5">
                <div className="filter">
                    <div className="type-roof">category</div>
                    <div className="select">
                        <ul>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link> <Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                        </ul>
                    </div>

                </div>
                <div className="filter">
                    <div className="type">Location <form><input title="Can't change country" disabled type="text" value="Nigeria" className="country-filter" /></form></div>
                    <div className="select">
                        <ul>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link> <Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="filter1">
                    <div className="type1">Price Range</div>
                    <div className="filter--holder">
                        <form><input type="text" placeholder="min" className="min-range" /></form>
                        <form><input type="text" placeholder="max" className="max-range" /></form>
                    </div>
                </div>
                <Link to="#" ><div className="filterBtn">Filter</div></Link>
            </div>

        </>
    )
}

export default Products
