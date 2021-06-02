import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import TrendingArticles from '../../components/TrendingArticles';
import { db } from '../../firebase';

function Home() {
    const [productCategories, setProductCategories] = useState([]);

    // setProductCategories
    useEffect(() => {
        const sub = () => {
            db.collection('categories').onSnapshot((snapshot) => {
                let r = (snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
                setProductCategories(r);
            })
        }
        sub();
    }, [])

    // eslint-disable-next-line no-unused-vars
    const featuredCatg = ['wigs', 'Weavons', 'extras', 'gadgets']

    return (
        <>
            <Helmet>
                <title>Hairrrs</title>
                <meta name="description" content='Everything Hairs' />
                <meta property="og:title" content="short title of your website/webpage max 35" />
                <meta property="og:url" content="https://ntutu-fdb00.web.app" />
                <meta property="og:description" content="description of your website/webpage max 65" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
                {/*for og:type http://ogp.me/#types */}
                {/* <meta property="og:type" content="article" /> */}
            </Helmet>

            <div className="layout2" style={{ display: '' }}>
                <div className="adv-1">
                    <div className="billboard">
                        <div className="arrows">
                            <Link to="/" className="prev">&#10094;</Link>
                            <Link to="/" className="next">&#10095;</Link>
                        </div>
                        <div className="dotsParent dots">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                    <Link to="Contestants" >
                        <div className="faceOfhairrrs">
                            <img src="/images/Group 2.png" alt="face of hairrrs" />
                        </div>
                    </Link>
                </div>

                <div className="features">
                    {/* Products categories */}
                    <div className="boxCont"><div className="box">
                        <img src="/images/product-img.png" alt="hairdryer" />
                        <div className="text">Products</div>
                        <span className="tooltiptext">
                            <div className="overall">
                                <div className="title"><h2>Product categories</h2></div>
                                <div className="lists">
                                    <span className="cats">
                                        <img src="/images/9555bcdb781e5cf8ab9ef3504a952220.png" alt="model on afro hair" className="tooltip-image" />
                                        <div className="Catgs mt-1">
                                            {productCategories?.map(({ id, data }) => (
                                                <div key={id}><Link to={`/products/${data.category}`}>{data.category}</Link></div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                    </div>
                    {/* Businesses categories */}
                    <div className="boxCont"><div className="box">
                        <img src="/images/business-img.png" alt="hairdryer"
                            className="businessImg" />
                        <div className="text">Businesses</div>
                        <span className="tooltiptext tooltiptextBusiness">
                            <div className="overall">
                                <div className="title">Business category</div>
                                <div className="lists">
                                    <span className="cats">
                                        <img src="/images/businesses img .png" alt="model on afro hair" className="tooltip-image" />
                                        <div className="Catgs mt-1">
                                            {productCategories?.map(({ id, data }) => (
                                                <div key={id}><Link to={`/products/${data.category}`}>{data.category}</Link></div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                    </div>
                    {/* Job categories */}
                    <div className="boxCont"><div className="box">
                        <img src="/images/job-vacancy-img.png" alt="hairdryer" />
                        <div className="text">Job vacancies</div>
                        <span className="tooltiptext tooltiptextJv">
                            <div className="overall">
                                <div className="title">Job category</div>
                                <div className="lists">
                                    <span className="cats">
                                        <img src="/images/unnamed (2).png" alt="model on afro hair" className="tooltip-image" />
                                        <div className="Catgs mt-1">
                                            {productCategories?.map(({ id, data }) => (
                                                <div key={id}><Link to={`/products/${data.category}`}>{data.category}</Link></div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                    </div>
                    {/* Articles categories */}
                    <div className="boxCont"><div className="box">
                        <img src="/images/article-img.png" alt="hairdryer" />
                        <div className="text">Articles</div>
                        <span className="tooltiptext tooltiptextAt">
                            <div className="overall">
                                <div className="title">Articles category</div>
                                <div className="lists">
                                    <span className="cats">
                                        <img src="/images/Articles img.png" alt="model on afro hair" className="tooltip-image" />
                                        <div className="Catgs mt-1">
                                            {productCategories?.map(({ id, data }) => (
                                                <div key={id}><Link to={`/products/${data.category}`}>{data.category}</Link></div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                    </div>
                </div>
            </div>

            {/* Products per catg */}
            <div className="layout3">

                {/* catgs_01 */}
                <div className="subcategories">
                    <div className="trenz">
                        <h1>Wigs</h1>
                    </div>
                    <div className="prodCont">

                        {/* product base on catg01 */}
                        <div className="products">
                            <Link to={`products?category=wigs`} >
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
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* product base on catg01 end */}

                    </div>

                    <div className="seemore-class">
                        <Link to="products" ><div className="seemore">see more</div></Link>
                    </div>

                </div>
                {/* catgs_01 end */}

                {/* catgs_02 */}
                <div className="subcategories">
                    <div className="trenz">
                        <h1>Weavons</h1>
                    </div>

                    <div className="prodCont">

                        {/* product base on catg02 */}
                        <div className="products">
                            <Link to={`products?category=Weavons`} >
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
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* product base on catg02 end */}

                    </div>

                    <div className="seemore-class">
                        <Link to="products" ><div className="seemore">see more</div></Link>
                    </div>

                </div>
                {/* catgs_02 end */}

                {/* catgs_03 */}
                <div className="subcategories">
                    <div className="trenz">
                        <h1>Gadgets</h1>
                    </div>

                    <div className="prodCont">

                        {/* product base on catg02 */}
                        <div className="products">
                        <Link to={`products?category=gadgets`} >
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
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* product base on catg02 end */}

                    </div>

                    <div className="seemore-class">
                        <Link to="products" ><div className="seemore">see more</div></Link>
                    </div>

                </div>
                {/* catgs_03 end */}

                {/* catgs_04 */}
                <div className="subcategories">
                    <div className="trenz">
                        <h1>Extras</h1>
                    </div>

                    <div className="prodCont">

                        {/* product base on catg02 */}
                        <div className="products">
                        <Link to={`products?category=extras`} >
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
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* product base on catg02 end */}

                    </div>

                    <div className="seemore-class">
                        <Link to="products" ><div className="seemore">see more</div></Link>
                    </div>

                </div>
                {/* catgs_04 end */}

            </div>
            {/* Products per catg end */}

            {/* Articles per catg */}
            <TrendingArticles />
            {/* Articles per catg end */}

            {/* Job vacancy per catg */}
            <div className="layout3">
                <div className="subcategories9">
                    <div className="trenz">
                        <h1>Job vacancies</h1>
                    </div>

                    <div className="shelf-jv">
                        {/* jv */}
                        <div className="jv">
                            <Link to="jobvacancies-application" >
                                <div className="shopper-jv">
                                    <div className="imgbox">
                                        <div className="view-image-2">
                                            <img src="/images/signin img.png" alt="" className="images" />
                                            <div className="verified">&#10004;</div>
                                        </div>
                                        <div className="details-00">
                                            <h2>Hairstylists and braids</h2>
                                            <span className="info"><i>A hairstylist is needed for immediate
                                                employment at Ntu...</i></span>

                                            <div className="time-location">
                                                <img src="/images/Icon material-access-time.png" alt="" className="time" />Full time
                                                    <img src="/images/Icon material-location-searching.png" alt="" className="Location" />Lagos, Nigeria
                                                </div>
                                            <div className="promo-validity">
                                                <div className="goldpromotion">Gold promotion</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* jv */}
                    </div>

                    <div className="seemore-class">
                        <Link to="jobvacancies" ><div className="seemore">see more</div></Link>
                    </div>
                </div>
            </div>
            {/* Job vacancy per catg end */}
        </>
    )
}

export default Home
