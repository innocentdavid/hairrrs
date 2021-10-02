import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMetaData from '../../components/HeaderMetaData';
import Loading from '../../components/Loading';
import { SaveListContext } from '../../contexts/GlobalStore';
import { db } from '../../firebase';
import { hasSaved, save, Unsave, UrlSlug } from '../../myFunctions';
import { capitalize } from '../../myFunctions';

function Products() {
    var category;
    const params = new URLSearchParams(window.location.search);
    if (!params.has('category')) {
        category = 'All';
    } else {
        if (params.get('category') === '') {
            category = 'All';
        } else {
            let r = UrlSlug(params.get('category'), 'decode');
            category = r.toLowerCase()
        }
    }

    const [products, setProducts] = useState(null);


    // getCatgProducts
    useEffect(() => {
        const getCatgProducts = () => {
            if (category === 'All' || category === 'all') {
                db.collection('products').onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => ({ id: doc.id, product: doc.data() })));
                    setProducts(result)
                })
            } else {
                db.collection('products').where('category', '==', capitalize(category)).onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => ({ id: doc.id, product: doc.data() })));
                    setProducts(result)
                })
            }
        }
        getCatgProducts();
    }, [category])

    const [categories, setCategories] = useState()
    useEffect(() => {
        db.collection('productCategories').orderBy('value', 'asc').get()
            .then((doc) => {
                setCategories(doc.docs.map(doc => ({ category: doc.data(), id: doc.id })))
            })
    }, [])

    // insert ads
    let productsCont = document.querySelector('.productsCont')
    var div1 = productsCont?.childNodes[2];
    var div2 = productsCont?.childNodes[8];
    var div3 = productsCont?.childNodes[17];
    var div4 = productsCont?.childNodes[20];
    var div5 = productsCont?.childNodes[26];
    var div6 = productsCont?.childNodes[35];
    var div7 = productsCont?.childNodes[38];
    var div8 = productsCont?.childNodes[44];
    var div9 = productsCont?.childNodes[53];

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
                        if (!referenceNode.nextSibling?.classList.contains('google-ads-product')) {
                            referenceNode.parentNode?.insertBefore(el, referenceNode.nextSibling);
                        }
                    }, 100);

                    if (referenceNode.nextSibling?.classList.contains('google-ads-product')) {
                        referenceNode.remove()
                    }
                }
            }

            if (div1) { setTimeout(() => { insertAfter(div1) }, 1000) }
            if (div2) { setTimeout(() => { insertAfter(div2) }, 1100) }
            if (div3) { setTimeout(() => { insertAfter(div3) }, 1200) }
            if (div4) { setTimeout(() => { insertAfter(div4) }, 1300) }
            if (div5) { setTimeout(() => { insertAfter(div5) }, 1400) }
            if (div6) { setTimeout(() => { insertAfter(div6) }, 1500) }
            if (div7) { setTimeout(() => { insertAfter(div7) }, 1600) }
            if (div8) { setTimeout(() => { insertAfter(div8) }, 1700) }
            if (div9) { setTimeout(() => { insertAfter(div9) }, 1800) }
        }
    }, [div1, div2, div3, div4, div5, div6, div7, div8, div9, products])

    let g = document.querySelectorAll('.google-ads-product')
    useEffect(() => {
        g.forEach(el => {
            if (el.nextSibling?.classList.contains('google-ads-product')) {
                el.remove()
            }
        })
    }, [g])

    const [openFilter, setOpenFilter] = useState(false)

    const [saveList] = useContext(SaveListContext)

    return (
        <>
            <HeaderMetaData title={category} description="Everything Hair" />

            {products ? <>
                {/* mainPage */}
                <div className="layout2a">
                    <div className="pages-timeline-auto">
                        <div className="d-flex justify-between align-items-center w-100">
                            <span className="pages" style={{ textTransform: 'capitalize' }}><Link to="/">Home</Link> {`>`} Products {`>`} {category}</span>
                            <button onClick={() => { setOpenFilter(!openFilter) }} className={`fa fa-filter rotate-${openFilter}`}></button>
                        </div>
                        <div className="errorMsg"></div>
                    </div>

                    <div className="productsCont">
                        {/* singleProduct */}
                        {products && products?.map(({ id, product }) => {
                            console.log(product)

                            return (
                                <div key={id} className="singleProduct">
                                    <div className="p1">
                                        <Link to={`/product?title=${UrlSlug(product?.title, 'encode')}`}>
                                            <img alt="" src="/images/wigs-braids-1.jpeg" />
                                        </Link>
                                        <div className="informations">
                                            <div className="details-1">
                                                <Link to={`/product?title=${UrlSlug(product?.title, 'encode')}`} >
                                                    <h2>{product?.title}</h2>
                                                </Link>
                                                <span className="price">{product?.price}</span>
                                                <div className="categories-filter">
                                                    <span className="seller">seller:</span><h4>{product?.seller?.displayName}</h4>
                                                </div>
                                                <div className="star">
                                                    <div className="ratings-001">
                                                        <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                                                    </div>
                                                </div>
                                                <div className="promo-validity">
                                                    <div className="goldpromotion">{product?.promotion}</div>
                                                    {/* <div className="save--icon">
                            <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                        </div> */}
                                                    {hasSaved(saveList, id) ?
                                                        <div style={{ cursor: 'pointer' }} onClick={() => { Unsave(id) }}>
                                                            <div className="save--icon">
                                                                <img src="/images/savebtn.png" className="group84" alt="" />
                                                            </div>
                                                        </div>
                                                        : <div style={{ cursor: 'pointer' }} onClick={() => { save(id, product?.productImages[0]?.src, product?.title, `/product?title=${UrlSlug(product?.title, 'encode')}`, 'product') }}>
                                                            <div className="save--icon">
                                                                <img src="/images/saturday save icon.svg" className="group84" alt="" />
                                                            </div>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}

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

                {/* <div className="layout5"> */}
                {openFilter && <div className="filterCont">
                    <div className="filter">
                        <div className="type-roof">category</div>
                        <div className="select">
                            <ul>
                                {categories && categories.map(({ id, category }) => (
                                    <Link key={id} to={`/products?category=${(category?.value).toString()}`}><li>{category.value}</li></Link>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className="filter">
                        <div className="type">Location <form><input title="Can't change country" disabled type="text" value="Nigeria" className="country-filter" /></form></div>
                        <div className="select">
                            <ul>
                                <li>location base on country</li>
                                <li>location base on country</li>
                                <li>location base on country</li>
                                <li>location base on country</li>
                                <li>location base on country</li>
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
                    <div className="filterBtn">Filter</div>
                </div>}
            </> : <>
                <Loading />
            </>}
        </>
    )
}

export default Products
