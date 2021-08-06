import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SaveListContext } from '../../contexts/GlobalStore';
import { db } from '../../firebase';
import { getDesc, save, Unsave, hasSaved, topFunction, UrlSlug, getMonthDate } from '../../fuctions'
import MyImage from '../MyImage';

function TrendingArticles({ limit = "18" }) {
    const [saveList] = useContext(SaveListContext)

    const [articles, setArticles] = useState([]);

    const storedArticles = localStorage.getItem('trendingArticles')
    useEffect(() => {
        if (storedArticles) {
            const data = JSON.parse(storedArticles)
            setArticles(data)
        }
    }, [storedArticles])

    // trending articles
    useEffect(() => {
        const articleRef = db.collection('articles');
        const query = articleRef.orderBy("createdAt", "desc").limit(limit);
        query.onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                let data = (snapshot.docs.map((doc) => {
                    return { id: doc.id, article: doc.data() };
                }));
                localStorage.setItem('trendingArticles', JSON.stringify(data));
                // setCachedAticles(data)
                setArticles(data);
            }
        })
    }, [limit])


    return (
        <>
            <div className="layout2a article">
                <div className="subcategories">
                    <div className="trenz">
                        <h1>Trending Articles</h1>
                    </div>

                    <div className="articleCont">

                        {/* article */}
                        {articles?.map(({ id, article }) => (
                            <div key={id} className="article">
                                <div className="shopper5">
                                    <div className="imgbox1">
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <Link to={`/profile?u=${article?.author?.userName}`}
                                                    onClick={() => { topFunction() }}
                                                    style={{ margin: 10, position: 'absolute' }}
                                                    className="authorAndName" >
                                                    <MyImage
                                                        src={article?.author?.photoURL}
                                                        alt="images"
                                                        className="AuthorPhotoURL"
                                                    />
                                                    <span className="tooltiptext AuthorName">{article?.author?.displayName}</span>
                                                </Link>
                                                <Link to={`/article?title=${article?.UrlSlug}`}
                                                    onClick={() => { topFunction() }}>
                                                    <MyImage src={article?.articleCover} />
                                                </Link>
                                            </div>

                                            <div className="details1">
                                                <Link to={`/article?title=${article?.UrlSlug}`} onClick={() => { topFunction() }}>
                                                    <h2>{article?.title}</h2>
                                                </Link>
                                                <div className="informations">
                                                    <span>{getDesc(article?.article)}</span>

                                                    <div className="artc-2">
                                                        <div className="categories-filter">
                                                            <Link style={{ display: 'block' }} to={`/articles?title=${UrlSlug(article?.category, 'encode')}`}>
                                                                {article?.category}
                                                            </Link>
                                                            <h3>{getMonthDate(article?.createdAt)}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="likes--save">
                                            <div className="comments-thumbs">
                                                <span className="views">
                                                    {article?.totalLikes}&nbsp;
                                                    <span>Likes</span>
                                                </span>
                                                <span className="views">
                                                    {article?.totalDisLikes}&nbsp;
                                                    <span>Dislikes</span>
                                                </span>
                                                <span className="views">
                                                    {article?.totalComments}&nbsp;
                                                    <span>Comments</span>
                                                </span>
                                            </div>
                                            <div className="save--icon">
                                                {hasSaved(saveList, id) ?
                                                    <img onClick={() => { Unsave(id) }} src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                    : <img onClick={() => { save(id, article?.articleCover, article?.title, `/article?title=${article?.title}`, 'article') }} src="/images/saturday save icon.svg" alt="" className="group84" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* article */}

                    </div>

                    <div className="seemore-class">
                        <Link to="/articles" ><div className="seemore">see more</div></Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default TrendingArticles
