import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SaveListContext } from '../contexts/GlobalStore';
import { auth, db } from '../firebase';
import TrendingArticles from './TrendingArticles';

function Header() {
    const [saveList] = useContext(SaveListContext)
    const [saveListTotal, setSaveListTotal] = useState(0)
    // let r = saveList.map(({ totalSaveList }) => totalSaveList )
    let tsl = saveList.map(({ totalSaveList }) => totalSaveList )[0]
    useEffect(() => {
        if(tsl){ setSaveListTotal(tsl) }else{ setSaveListTotal(0) }
    }, [tsl])

    const deleteList = (id) => {
        db.collection('users').doc(auth.currentUser.uid).collection('saveList').doc(id).delete()
    }

    const [mostEngagedProduct, setMostEngagedProduct] = useState([])
    useEffect(() => {
        db.collection('products').orderBy('totalEngagement', 'desc').limit(1).get().then(snapshot => {
            let r = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setMostEngagedProduct(r)
        })
    }, [])

    const [, setMostEngagedArticle] = useState([])
    useEffect(() => {
        db.collection('articles').orderBy('totalEngagement', 'desc').limit(1).get().then(snapshot => {
            let r = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setMostEngagedArticle(r)
        })
    }, [])

    return (
        <>
            <div className="headerAd">
                <img src="/images/headerad.gif" alt="" className="" />
            </div>

            <header>
                <nav>
                    {/* logs */}
                    <div className="logo">
                        <Link to="/"><img src="/images/hairrrs-Logo.png" alt="logo" /></Link>
                    </div>
                    <div className="logo--mobile">
                        <Link to="/"><img src="/images/logo 2.png" alt="logo" /></Link>
                    </div>

                    {/* search */}
                    <form>
                        <div className="search--holder0">
                            <input type="text" placeholder="search for Products, Services, or Articles"></input>
                        </div>
                        <button type="button" style={{ backgroung: 'black' }}>
                            <img src="/images/search-header.svg" alt="" />
                        </button>

                        <div className="search-ads">
                            <div className="search-tab">
                                <div className="accord-text">
                                    <div className="sub">
                                        <span>Product</span>
                                        <div className="onflex">
                                            <Link to="product"><li>Alkaline wig</li></Link>
                                            <div className="promo-validity">
                                                <div className="goldpromotion">Gold promotion</div>
                                            </div>
                                        </div>
                                        <div className="onflex">
                                            <Link to="product"><li>Blonde D-jon weavon</li></Link>
                                            <div className="promo-validity">
                                                <div className="goldpromotion">Gold promotion</div>
                                            </div>
                                        </div>
                                        <div className="onflex">
                                            <Link to="product"><li>saisho Hair dryer</li></Link>
                                            <div className="promo-validity">
                                                <div className="goldpromotion">Gold promotion</div>
                                            </div>
                                        </div>
                                        <div className="onflex">
                                            <Link to="product"><li>LG hair stretcher</li></Link>
                                            <div className="promo-validity">
                                                <div className="goldpromotion">Gold promotion</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sub">Job Vacancies</div>

                                    <div className="onflex">
                                        <Link to="jobvacancies-application.html"><li>Sales girl needed</li></Link>
                                        <div className="promo-validity">
                                            <div className="goldpromotion">Gold promotion</div>
                                        </div>
                                    </div>

                                    <div className="onflex">
                                        <Link to="jobvacancies-application.html"><li>Hair stylist needed</li></Link>
                                        <div className="promo-validity">
                                            <div className="goldpromotion">Gold promotion</div>
                                        </div>
                                    </div>

                                    <div className="onflex">
                                        <Link to="jobvacancies-application.html"><li>Barber needed</li></Link>
                                        <div className="promo-validity">
                                            <div className="goldpromotion">Gold promotion</div>
                                        </div>
                                    </div>

                                    <div className="onflex">
                                        <Link to="jobvacancies-application.html"><li>hair doctor needed</li></Link>
                                        <div className="promo-validity">
                                            <div className="rubypromotion">Ruby promotion</div>
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <div className="sub">Articles</div>

                                    <div className="onflex">
                                        <Link to="Articles-post.html"><li>How to make good money with...</li></Link>
                                        <div className="promo-validity">
                                            <div className="silverpromotion">Promoted</div>
                                        </div>
                                    </div>
                                    <div className="onflex">
                                        <Link to="Articles-post.html"><li>How to gain engagement...</li></Link>
                                        <div className="promo-validity">
                                            <div className="silverpromotion">Promoted</div>
                                        </div>
                                    </div>
                                    <div className="onflex">
                                        <Link to="Articles-post.html"><li>How to wash hair</li></Link>
                                        <div className="promo-validity">
                                            <div className="silverpromotion">Promoted</div>
                                        </div>
                                    </div>
                                    <div className="onflex">
                                        <Link to="Articles-post.html"><li>3 Maintenance hair cream you...</li></Link>
                                        <div className="promo-validity">
                                            <div className="silverpromotion">Promoted</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="icons-class">

                        {/* Messages */}
                        <div className="icon2">
                            <div onClick={() => { document.querySelector('.message-popup').style.display = "block" }}>
                                <img src="/images/msg-header.svg" alt="saveicon" className="saveicon" />
                                <span className="tooltiptext">Messages</span>
                                <div className="notifier">7</div>
                            </div>

                            <div className="message-popup">
                                <div className="msg-header">
                                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span>Messages</span>
                                        <span><i className="fa fa-times-circle" aria-hidden="true"
                                            onClick={() => { document.querySelector('.message-popup').style.display = "none" }}
                                            style={{ fontSize: '1.5rem' }}></i></span>
                                    </div>
                                    <div className="Caps">
                                        <form>
                                            <button type="submit">
                                                <div className="searchicon">
                                                    <img src="/images/search.png" alt="" />
                                                </div>
                                            </button>
                                            <input type="text" placeholder="search" className="search-hub"></input>
                                        </form>
                                    </div>
                                    <hr className="customHr" />
                                    <ul>
                                        <li>Products</li>
                                        <li>Job vacancies</li>
                                        <li>Articles</li>
                                        <li>Businesses</li>
                                    </ul>
                                    <div className="queen">
                                        <div className="rack">
                                            <div className="accord-rack">
                                                <div className="img3">
                                                    <div className="img4">
                                                        <div className="content-1">
                                                            <img src="/images/info-icon.svg" alt="hairrrs info icon" />
                                                            <span className="txt">info</span>
                                                        </div>
                                                        <div className="rack-info">
                                                            <h2>Lounge users</h2>
                                                            <p>
                                                                We provide maximum visibility to every account that made it
                                                                to the lounge dashboard. This dashboard is shown worldwide.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                            <div className="accord-rack">
                                                <Link to="businesses-profile.html"><div className="img1">
                                                    <div className="img2"></div></div></Link><span className="txt">Blogger</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="users">
                                        <div className="people">
                                            <div className="shielder">
                                                <div className="img">
                                                    <img src="/images/logo black.svg" alt="hairrrs logo" className="imagy" />
                                                </div>
                                                <div className="user0">
                                                    <span className="user"><span>customer support</span></span>
                                                    <br />
                                                    <div className="infos-1">
                                                        <div className="text">
                                                            <span className="txt">Lorem ipsum dolor sit amet con...</span>
                                                        </div>
                                                        <div className="time-time">
                                                            <time>12:00am</time>
                                                        </div>
                                                        <div className="notificator">4</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notification */}
                        <div className="icon2">
                            <div onClick={() => { document.querySelector('.message-popup-1').style.display = "block" }}>
                                <img src="/images/notification-header.svg" alt="saveicon" className="saveicon" />
                                <span className="tooltiptext">Notification</span>
                                <div className="notifier">7</div>
                            </div>

                            <div className="message-popup-1">
                                <div className="msg-header">
                                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span>Notification</span>
                                        <span><i className="fa fa-times-circle" aria-hidden="true"
                                            onClick={() => { document.querySelector('.message-popup-1').style.display = "none" }}
                                            style={{ fontSize: '1.5rem' }}></i></span>
                                    </div>
                                </div>
                                <div className="Caps">
                                    <form>
                                        <button type="submit">
                                            <div className="searchicon">
                                                <img src="/images/search.png" alt="" />
                                            </div>
                                        </button>
                                        <input type="text" placeholder="search" className="search-hub"></input>
                                    </form>
                                </div>
                                <hr className="customHr" />
                                <div className="users">
                                    <div className="people">
                                        <div className="shielder">
                                            <div className="img">
                                                <img src="/images/nutless braid.png" alt="hairrrs logo" className="imagy" />
                                            </div>
                                            <div className="user0">
                                                <br />
                                                <div className="infos">
                                                    <div className="text-1">
                                                        <span className="txt">Lorem ipsum dolor sit amet consectetur...</span>
                                                    </div>
                                                    <div className="time-time">
                                                        <time>12:00am</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Saved list */}
                        <div className="icon2">
                            <div onClick={() => { document.querySelector('.message-popup-2').style.display = "block" }}>
                                <img src="/images/saved-header.svg" alt="saveicon" className="saveicon" />
                                <img src="/images/savebtn.png" alt="saveicon" className="mobile--icon" />
                                <span className="tooltiptext">saved</span>
                                <div className="notifier">{saveListTotal}</div>
                            </div>

                            <div className="message-popup-2">
                                <div className="msg-header">
                                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span>Saved list</span>
                                        <span><i className="fa fa-times-circle" aria-hidden="true"
                                            onClick={() => { document.querySelector('.message-popup-2').style.display = "none" }}
                                            style={{ fontSize: '1.5rem' }}></i></span>
                                    </div>
                                </div>
                                <div className="Caps">
                                    <form>
                                        <button type="submit">
                                            <div className="searchicon">
                                                <img src="/images/search.png" alt="" />
                                            </div>
                                        </button>
                                        <input type="text" placeholder="search" className="search-hub"></input>
                                    </form>
                                </div>
                                <hr className="customHr" />
                                <div className="users">
                                    {saveList?.map(({ id, list }) => (
                                        <div key={id} className="people">
                                            <Link to={list.link} className="shielder" style={{ display: 'flex', color: 'black' }}>
                                                <div className="img">
                                                    <img src={list.photoURL} alt="hairrrs logo" className="imagy" />
                                                </div>
                                                <div className="user0">
                                                    <br />
                                                    <div className="infos">
                                                        <div className="text-1">
                                                            <span className="txt">{list.description} </span>
                                                        </div>
                                                        <div
                                                            onClick={(e) => { e.preventDefault(); deleteList(id) }}
                                                            className="delete-icon">
                                                            <img src="/images/saturday-delete-icon.png" alt="delete icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="strtsales">
                            <div className="startselling">Start selling</div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* mobile bottom navigator */}
            <div className="navigation--icons">
                <div><Link to="/">
                    <img src="/images/Icon material-person.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Icon material-home.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/create-article">
                    <img src="/images/Add plus-icon-black.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Notification-black-icon.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
                <div><Link to="/">
                    <img src="/images/Messages-mobile-icon-black.svg" alt="saveicon" className="mobile-nav-icon" />
                </Link></div>
            </div>

            <div className="addboard">
                <div className="close">&times;</div>
                <div className="accord-030">
                    <span>Start selling</span>

                    <div className="business-statistics">
                        <div className="stats-0">
                            <Link to="add-product"><div className="box-3">
                                <img src="/images/icon-add-product.png" alt="" className="" /><h2>sell product</h2>
                            </div></Link>
                            <Link to="add-jobvacancy.html"><div className="box-3">
                                <img src="/images/icon-add-job.png" alt="" className="" /><h2>upload job vacancy</h2>
                            </div></Link>
                            <Link to="add-article.html"><div className="box-3">
                                <img src="/images/icon-add-article.png" alt="" className="" /><h2>Write an article</h2>
                            </div></Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className="header2">
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

                <div className="up-business">Businesses
                    <span className="tooltiptext1">
                        <div className="categories-class">
                            <span className="cats">
                                <ul>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link> <Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link><Link to="businesses-page.html"><li>businesses category</li></Link>
                                    <Link to="businesses-page.html"><li>businesses category</li></Link>
                                </ul>
                            </span>
                        </div>

                        <div className="top-display align-content">
                            <div className="according-00">

                                {/* mostEngagedBusiness */}
                                <div className="advert-billboard">
                                    <img src="/images/Lm3D9Aex.jpg" alt="hairrrs business" />
                                    <div className="shopper-business">
                                        <div className="view-image-2"></div>
                                        <div className="verified">&#10004;</div>
                                        <div className="businessname">Darling hair</div>
                                    </div>
                                </div>

                                <div className="shelf-hover-00">
                                    <TrendingArticles limit={4} />
                                </div>


                            </div>
                        </div>
                    </span>
                </div>

                <div className="up-JobVacancies">Job Vacancies
                    <span className="tooltiptext1">
                        <div className="categories-class">
                            <span className="cats">
                                <ul>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                    <Link to="jobvacancies-page.html"><li>job category</li></Link><Link to="jobvacancies-page.html"><li>job category</li></Link>
                                </ul>
                            </span>
                        </div>

                        <div className="top-display align-content">
                            <div className="according-00">
                                <div className="advert-billboard">
                                    <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="hairrrs job vacancy" />
                                    <div className="free-shopper-2">
                                        <div className="shelf-jv">
                                            <Link to="jobvacancies-application.html"><div className="shopper-jv">
                                                <div className="imgbox">
                                                    <div className="view-image-2">
                                                        <img src="/images/signin img.png" alt="" className="/images" />
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
                                            </div></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="shelf-hover-00">
                                    <TrendingArticles limit={4} />
                                </div>


                            </div>
                        </div>
                    </span>
                </div>

                <div className="up-Articles">Articles
                    <span className="tooltiptext1">
                        <div className="categories-class">
                            <span className="cats">
                                <ul>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                    <Link to="Articles-page.html"><li>Articles category</li></Link>
                                </ul>
                            </span>
                        </div>

                        <div className="top-display align-content">
                            <div className="according-00">
                                <div className="advert-billboard">
                                    <img src="/images/21-long-black-and-white-braids-B04kshXAuWR.jpg" alt="hairrrs articles" />
                                    <div className="free-shopper">
                                        <Link to="Articles-post.html"><div className="shopper5">
                                            <div className="user-display">
                                                <img src="/images/user.png" alt="" />
                                                <span className="tooltiptext">Chizzyfix</span>
                                            </div>
                                            <div className="imgbox1">
                                                <div className="details1">
                                                    <h2>How to braid hair in 3 minutes. 6steps<span className="promo">- Promoted</span></h2>
                                                    <div className="informations">
                                                        <span className="info">Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</span>
                                                        <div className="artc-2">
                                                            <div className="categories-filter">
                                                                <i><span className="info">Hair and beauty</span>
                                                                    <h3>February 10</h3></i>
                                                            </div>
                                                        </div>
                                                        <div className="likes--save">
                                                            <div className="comments-thumbs">
                                                                <span className="views">423</span>
                                                                <h2>Likes</h2>
                                                                <span className="views">18</span>
                                                                <h2>Dislikes</h2>
                                                                <span className="views">675</span>
                                                                <h2>Comments</h2>
                                                            </div>
                                                            <div className="save--icon">
                                                                <img src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div></Link>
                                    </div>
                                </div>
                               
                                <div className="shelf-hover-00">
                                    <TrendingArticles limit={4} />
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header
