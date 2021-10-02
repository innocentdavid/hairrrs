import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LatestJobVacancy from '../../components/LatestJobVacancy';
import MyImage from '../../components/MyImage';
import ProductCard from '../../components/ProductCard';
import TrendingArticles from '../../components/TrendingArticles/TrendingArticles';
import { db } from '../../firebase';
import { UrlSlug } from '../../fuctions';

function Home() {
    // setProductCategories
    const [productCategories, setProductCategories] = useState([]);
    useEffect(() => {
        const sub = () => {
            const storedObj = localStorage.getItem('productCategories')
            if (storedObj) {
                const data = JSON.parse(storedObj)
                setProductCategories(data)
            }
            db.collection('productCategories').onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    let r = (snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
                    localStorage.setItem('productCategories', JSON.stringify(r));
                    setProductCategories(r);
                }
            })
        }
        sub();
    }, [])

    // setJobCategories
    const [jobCategories, setJobCategories] = useState([]);
    useEffect(() => {
        const sub = () => {
            const storedObj = localStorage.getItem('jobCategories')
            if (storedObj) {
                const data = JSON.parse(storedObj)
                setJobCategories(data)
            }
            db.collection('jobCategories').onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    let r = (snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
                    localStorage.setItem('jobCategories', JSON.stringify(r));
                    setJobCategories(r);
                }
            })
        }
        sub();
    }, [])

    // setArticleCategories
    const [articleCategories, setArticleCategories] = useState([])
    useEffect(() => {
        const sub = () => {
            const storedObj = localStorage.getItem('articleCategories')
            if (storedObj) {
                const data = JSON.parse(storedObj)
                setArticleCategories(data)
            }
            db.collection('articleCategories').onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    let r = (snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
                    localStorage.setItem('articleCategories', JSON.stringify(r));
                    setArticleCategories(r);
                }
            })
        }
        sub();
    }, [])

    // eslint-disable-next-line no-unused-vars
    const featuredCatg = ['Wig', 'Weavon', 'Gadgets', 'Extras']


    return (<>
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
                    <MyImage
                        src={"/images/product-img.png"}
                        alt="hairdryer"
                    />
                    <div className="text">Products</div>
                    <span className="tooltiptext">
                        <div className="overall">
                            <div className="title"><h2>Product categories</h2></div>
                            <div className="lists">
                                <span className="cats">
                                    <MyImage
                                        src={"/images/9555bcdb781e5cf8ab9ef3504a952220.png"}
                                        className="tooltip-image"
                                        alt="model on afro hair"
                                    />
                                    <div className="Catgs mt-1">
                                        {productCategories?.map(({ id, data }) => (
                                            <div key={id}>
                                                {data?.value !== 'All' && <Link to={`/products?category=${UrlSlug(data?.value, 'encode')}`}>{data?.value}</Link>}
                                            </div>
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
                    <MyImage
                        src={"/images/business-img.png"}
                        className="businessImg"
                        alt="hairdryer"
                    />
                    <div className="text">Businesses</div>
                    <span className="tooltiptext tooltiptextBusiness">
                        <div className="overall">
                            <div className="title">Business category</div>
                            <div className="lists">
                                <span className="cats">
                                    <MyImage
                                        src={"/images/businesses img .png"}
                                        className="tooltip-image"
                                        alt="model on afro hair"
                                    />
                                    <div className="Catgs mt-1">
                                        {productCategories?.map(({ id, data }) => (
                                            <div key={id}>
                                                {data?.value !== 'All' && <Link to={`/businesses?category=${UrlSlug(data?.value, 'encode')}`}>{data?.value}</Link>}
                                            </div>
                                        ))}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </span>
                </div>
                </div>

                {/* Job categories */}
                <div className="boxCont">
                    <div className="box">
                        <MyImage
                            src={"/images/job-vacancy-img.png"}
                            alt="Job vacancies"
                        />
                        <div className="text">Job vacancies</div>
                        <span className="tooltiptext tooltiptextJv">
                            <div className="overall">
                                <div className="title">Job category</div>
                                <div className="lists">
                                    <span className="cats">
                                        <MyImage
                                            src={"/images/unnamed (2).png"}
                                            className="tooltip-image"
                                            alt="model on afro hair"
                                        />
                                        <div className="Catgs mt-1">
                                            {jobCategories?.map(({ id, data }) => (
                                                <div key={id}>
                                                    {data?.value !== 'All' && <Link to={`/jobs?category=${UrlSlug(data?.value, 'encode')}`}>{data?.value}</Link>}
                                                </div>
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
                    <MyImage
                        src={"/images/article-img.png"}
                        alt="hairdryer"
                    />
                    <div className="text">Articles</div>
                    <span className="tooltiptext tooltiptextAt">
                        <div className="overall">
                            <div className="title">Articles category</div>
                            <div className="lists">
                                <span className="cats">
                                    <MyImage
                                        src={"/images/Articles img.png"}
                                        className="tooltip-image"
                                        alt="model on afro hair"
                                    />
                                    <div className="Catgs mt-1">
                                        {articleCategories?.map(({ id, data }) => (
                                            <div key={id}>
                                                {data?.value !== 'All' && <Link to={`/articles?category=${UrlSlug(data?.value, 'encode')}`}>{data?.value}</Link>}
                                            </div>
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

        <div className="layout3" style={{ paddingLeft: 15 }}>
            {featuredCatg.map(catg => (
                <div key={catg} className="subcategories">
                    <div className="trenz">
                        <h1>{catg}</h1>
                    </div>
                    <div className="prodCont">
                        <ProductCard catg={catg} />
                    </div>

                    <div className="seemore-class">
                        <Link to={`products?category=${catg}`} >
                            <div className="seemore">see more</div>
                        </Link>
                    </div>

                </div>
            ))}
        </div>

        <TrendingArticles limit={3} />

        {/* Job vacancy per catg */}
        <LatestJobVacancy />
        {/* Job vacancy per catg end */}
    </>)
}

export default Home
