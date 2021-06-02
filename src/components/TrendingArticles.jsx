import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SaveListContext } from '../contexts/GlobalStore';
import { db } from '../firebase';
import { getDesc, getMonthDate, save, Unsave, hasSaved, topFunction } from '../fuctions'

function TrendingArticles({ limit="18" }) {
    const [saveList] = useContext(SaveListContext)
    
    const [articles, setArticles] = useState([]);

    // trending articles
    useEffect(() => {
        const articleRef = db.collection('articles');
        const query = articleRef.orderBy("createdAt", "desc").limit(limit);
        query.onSnapshot((snapshot) => {
            let data = (snapshot.docs.map((doc) => {
                return { id: doc.id, article: doc.data() };
            }));
            setArticles(data);
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
                                    <div className="user-display">
                                        <img src={article?.authorPhotoURL} alt="" className='AuthorPhotoURL' />
                                        <Link to={`/profile?uid=${article.userId}`} className="tooltiptext AuthorName">{article?.authorName}</Link>
                                    </div>
                                    <div className="imgbox1">
                                        <Link to={`/article?title=${article.UrlSlug}`} onClick={() => { topFunction() }}>
                                            <img src={article.articleCover} alt="" />
                                        </Link>
                                        <div className="details1">
                                            <Link to={`/article?title=${article.UrlSlug}`} onClick={() => { topFunction() }}>
                                                <h2>{article.title}</h2>
                                            </Link>
                                            <div className="informations">
                                                <span>{getDesc(article.article)}</span>
                                                <div className="artc-2">
                                                    <div className="categories-filter">
                                                        <i>
                                                            <div onClick={() => { window.location = `/articles?title=${article.category}` }}>
                                                                <Link to={`/articles?title=${article.category}`}>
                                                                    <span>{article.category}</span>
                                                                </Link>
                                                            </div>
                                                            <h3>{getMonthDate(article.createdAt)}</h3>
                                                        </i>
                                                    </div>
                                                </div>
                                                <div className="likes--save">
                                                    <div className="comments-thumbs">
                                                        <span className="views">{article.totalLikes}</span>
                                                        <h2>Likes</h2>
                                                        <span className="views">{article.totalDisLikes}</span>
                                                        <h2>Dislikes</h2>
                                                        <span className="views">{article.totalComments}</span>
                                                        <h2>Comments</h2>
                                                    </div>
                                                    <div className="save--icon">
                                                        {hasSaved(saveList, id) ?
                                                        <img onClick={() => { Unsave(id) }} src="/images/circle-arrow-down-color.svg" alt="" className="group84" />
                                                        : <img onClick={() => { save(id, article.articleCover, article.title, `/article?title=${article.title}`, 'article') }} src="/images/saturday save icon.svg" alt="" className="group84" />}
                                                    </div>
                                                </div>
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
