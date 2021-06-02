import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

function Articles() {
    const [category, setCategory] = useState('all')

    const params = new URLSearchParams(window.location.search);

    if (params.has('category')) {
        let r = params.get('category');
        setCategory(r.toLowerCase())
    }

    const [articles, setArticles] = useState([])
    useEffect(() => {
        const getCatgArticles = (category) => {
            if (category === 'all') {
                db.collection('articles').onSnapshot((snapshot) => {
                    let r = (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    setArticles(r)
                })
            } else {
                db.collection('products').where('category', '==', category).onSnapshot((snapshot) => {
                    let r = (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    setArticles(r)
                })
            }
        }
        if (category === '') {
            getCatgArticles('all')
        } else {
            getCatgArticles(category)
        }
    }, [category])

    useEffect(() => {
        console.log(articles);
    }, [articles])

    return (
        <>
            <div className="layout2a" style={{ paddingBottom: '40px' }}>
                <div className="pages-timeline-auto">
                    <span className="page"><Link to="/">Home</Link> {`>`} Articles {`>`} {category}</span>
                </div>
                <div className="subcategories11">
                    <div className="shelf">
                        <Link to="/article?title=sample">
                            <div className="shopper5">
                                <div className="user-display">
                                    <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                    <span className="tooltiptext">Chizzyfix</span>
                                </div>
                                <div className="imgbox1">
                                    <img src="/images/nutless braid.png" alt="" />
                                    <div className="details1">
                                        <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                        <div className="informations">
                                            <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                            <div className="artc-2">
                                                <div className="categories-filter">
                                                    <i><info>Hair and beauty</info>
                                                        <h3>February 10</h3></i>
                                                </div>
                                            </div>
                                            <div className="likes--save">
                                                <div className="comments-thumbs">
                                                    <views>423</views>
                                                    <h2>Likes</h2>
                                                    <views>18</views>
                                                    <h2>Dislikes</h2>
                                                    <views>675</views>
                                                    <h2>Comments</h2>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/article?title=sample">
                            <div className="shopper8">
                                <div className="user-display">
                                    <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                    <span className="tooltiptext">Chizzyfix</span>
                                </div>
                                <div className="imgbox1">
                                    <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="" />
                                    <div className="learnmore">
                                        <div className="website">trytune.com/about</div>
                                        <div className="learn-more">Learn more</div>
                                    </div>
                                    <div className="details1">
                                        <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                        <div className="informations">
                                            <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                            <div className="likes--save">
                                                <div className="comments-thumbs">
                                                    <views>423</views>
                                                    <h2>Likes</h2>
                                                    <views>18</views>
                                                    <h2>Dislikes</h2>
                                                    <views>675</views>
                                                    <h2>Comments</h2>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="shelf">
                        <Link to="/article?title=sample">
                            <div className="shopper7">
                                <div className="user-display">
                                    <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                    <span className="tooltiptext">Chizzyfix</span>
                                </div>
                                <div className="imgbox1">
                                    <img src="/images/nutless braid.png" alt="" />
                                    <div className="details1">
                                        <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                        <div className="informations">
                                            <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                            <div className="artc-2">
                                                <div className="categories-filter">
                                                    <i><info>Hair and beauty</info>
                                                        <h3>February 10</h3></i>
                                                </div>
                                            </div>
                                            <div className="likes--save">
                                                <div className="comments-thumbs">
                                                    <views>423</views>
                                                    <h2>Likes</h2>
                                                    <views>18</views>
                                                    <h2>Dislikes</h2>
                                                    <views>675</views>
                                                    <h2>Comments</h2>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="google-ads"></div>
                <div className="subcategories11">
                    <div className="shelf">
                        <Link to="/article?title=sample">
                            <div className="shopper5">
                                <div className="user-display">
                                    <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                    <span className="tooltiptext">Chizzyfix</span>
                                </div>
                                <div className="imgbox1">
                                    <img src="/images/nutless braid.png" alt="" />
                                    <div className="details1">
                                        <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                        <div className="informations">
                                            <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                            <div className="artc-2">
                                                <div className="categories-filter">
                                                    <i><info>Hair and beauty</info>
                                                        <h3>February 10</h3></i>
                                                </div>
                                            </div>
                                            <div className="likes--save">
                                                <div className="comments-thumbs">
                                                    <views>423</views>
                                                    <h2>Likes</h2>
                                                    <views>18</views>
                                                    <h2>Dislikes</h2>
                                                    <views>675</views>
                                                    <h2>Comments</h2>
                                                </div>
                                                <div className="save--icon">
                                                    <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/article?title=sample"><div className="shopper7">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                    <div className="shelf">
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper8">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="" />
                                <div className="learnmore">
                                    <div className="website">trytune.com/about</div>
                                    <div className="learn-more">Learn more</div>
                                </div>
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                </div>
                <div className="google-ads"></div>
                <div className="subcategories11">
                    <div className="shelf">
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper8">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="" />
                                <div className="learnmore">
                                    <div className="website">trytune.com/about</div>
                                    <div className="learn-more">Learn more</div>
                                </div>
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                    <div className="shelf">
                        <Link to="/article?title=sample"><div className="shopper7">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                </div>
                <div className="google-ads"></div>
                <div className="subcategories11">
                    <div className="shelf">
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper7">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                    <div className="shelf">
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper8">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/0_NEgmVl2J_RRzI9Sr.jpg" alt="" />
                                <div className="learnmore">
                                    <div className="website">trytune.com/about</div>
                                    <div className="learn-more">Learn more</div>
                                </div>
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                        <Link to="/article?title=sample"><div className="shopper5">
                            <div className="user-display">
                                <img src={process.env.REACT_APP_DEFAULT_USER_PHOTO_URL} alt="" />
                                <span className="tooltiptext">Chizzyfix</span>
                            </div>
                            <div className="imgbox1">
                                <img src="/images/nutless braid.png" alt="" />
                                <div className="details1">
                                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                                    <div className="informations">
                                        <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                                        <div className="artc-2">
                                            <div className="categories-filter">
                                                <i><info>Hair and beauty</info>
                                                    <h3>February 10</h3></i>
                                            </div>
                                        </div>
                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <views>423</views>
                                                <h2>Likes</h2>
                                                <views>18</views>
                                                <h2>Dislikes</h2>
                                                <views>675</views>
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="save--icon">
                                                <img src="/images/circle-arrow-down-color.svg" className="group84" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                </div>
                <div className="google-ads"></div>
                <div className="seemore-class">
                    <div className="seemore" style={{ marginLeft: '50px' }}>see more</div>
                </div>
            </div>
            <div className="layout5">
                <div className="filter-article">
                    <div className="type-roof">Category</div>
                    <div className="select">
                        <ul>
                            <Link to=""><li>Hairs and beauty</li></Link><Link to=""><li>Studio</li></Link><Link to=""><li>Vlogging tutorials</li></Link><Link to=""><li>Dermatology</li></Link>
                            <Link to=""><li>Educational</li></Link> <Link to=""><li>Blogging</li></Link><Link to=""><li>Hairstyling</li></Link><Link to=""><li>Entertainment</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                            <Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link><Link to=""><li>cap</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Articles
