import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TrendingArticles from '../../components/TrendingArticles';
import { auth, db } from '../../firebase';
import firebase from "firebase";
import { deleteArticle, getDesc, getMonthDate, hasSaved, save, Unsave, UrlSlug } from '../../fuctions';
import SocialMediaButtons from '../../components/SocialMediaButtons';
import ArticleComments from './Components/comments/ArticleComments';
import { Helmet } from 'react-helmet';
import { SaveListContext } from '../../contexts/GlobalStore';
import ItemOwner from '../../components/ItemOwner';

function Article() {
    var authUser = auth.currentUser

    const [saveList] = useContext(SaveListContext)
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    if (!params.has('title')) {
        history.push('/')
    }
    var articleUrlSlug = params.get('title')

    const [showShare, setShowShare] = useState(false)


    // Get Article
    var [article, setArticle] = useState([]);
    const [articleId, setArticleId] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const response = db.collection('articles').where('UrlSlug', '==', articleUrlSlug);
            const data = await response.get();

            if (data.empty) {
                history.push('/')
            } else {
                data.docs.forEach(item => {
                    setArticleId(item.id)
                    setArticle(item.data())
                })
            }
        }
        fetchArticle();
    }, [articleUrlSlug, history])
    // Get Article end


    // Article setLiked setDisLiked
    useEffect(() => {
        let unsubscribe = () => {
            if (articleId && auth.currentUser) {
                var uid = auth.currentUser?.uid

                unsubscribe = db.collection('articles').doc(articleId).collection('likes').doc(uid).get()
                    .then(doc => {
                        setLiked(doc.exists);
                    }).catch(error => console.log(`setLiked`, error))

                unsubscribe = db.collection('articles').doc(articleId).collection('disLikes').doc(uid).get()
                    .then(doc => {
                        setDisLiked(doc.exists)
                    }).catch(error => console.log(`setLiked`, error))
            }
        }
        unsubscribe();
    }, [articleId])


    // comments_likes_dislikes_views
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalDisLikes, setTotalDisLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    // get total likes and unlikes
    useEffect(() => {
        const unsubscribe = () => {
            if (articleId) {
                // setTotalLikes
                db.collection('articles').doc(articleId).collection('likes').onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map(doc => doc.data()));
                    setTotalLikes(result.length)
                })

                // setTotalDisLikes
                db.collection('articles').doc(articleId).collection('disLikes').onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => doc.data()));
                    setTotalDisLikes(result.length)
                })

                // setTotalComments
                db.collection('articles').doc(articleId).collection('comments').onSnapshot((snapshot) => {
                    let result = (snapshot.docs.map((doc) => doc.data()));
                    setTotalComments(result.length)
                })
            }
        }
        unsubscribe()
    }, [articleId])

    // comments_likes_dislikes_views end


    // ReactToArticle
    const [liked, setLiked] = useState(false);
    const [disLiked, setDisLiked] = useState(false);

    const ReactToArticle = (reaction) => {
        if (auth.currentUser) {
            const uid = auth.currentUser.uid;
            if (articleId) {
                if (reaction === 'likes') {
                    if (disLiked) {
                        db.collection('articles').doc(articleId).collection('disLikes').doc(uid).delete();
                        db.collection('articles').doc(articleId).update({ totalDisLikes: firebase.firestore.FieldValue.increment(-1) });
                        setDisLiked(false)
                    }
                    if (liked) {
                        db.collection('articles').doc(articleId).collection('likes').doc(uid).delete();
                        db.collection('articles').doc(articleId).update({ totalLikes: firebase.firestore.FieldValue.increment(-1) });
                        setLiked(false)
                    } else {
                        db.collection('articles').doc(articleId).collection('likes').doc(uid).set({ userName: auth.currentUser.displayName, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                        db.collection('articles').doc(articleId).update({ totalLikes: firebase.firestore.FieldValue.increment(1) });
                        setLiked(true)
                    }
                }

                if (reaction === 'disLikes') {
                    if (liked) {
                        db.collection('articles').doc(articleId).collection('likes').doc(uid).delete();
                        db.collection('articles').doc(articleId).update({ totalLikes: firebase.firestore.FieldValue.increment(-1) });
                        setLiked(false)
                    }
                    if (disLiked) {
                        db.collection('articles').doc(articleId).collection('disLikes').doc(uid).delete();
                        db.collection('articles').doc(articleId).update({ totalDisLikes: firebase.firestore.FieldValue.increment(-1) });
                        setDisLiked(false)
                    } else {
                        db.collection('articles').doc(articleId).collection(reaction).doc(uid).set({ userName: auth.currentUser.displayName, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                        db.collection('articles').doc(articleId).update({ totalDisLikes: firebase.firestore.FieldValue.increment(1) });
                        setDisLiked(true)
                    }
                }

            }
        } else {
            alert('sorry you have to login')
        }
    }
    // ReactToArticle ends

    // set page viewed
    useEffect(() => {
        var pageUrl = window.location.href;
        if (articleId && article.userId !== authUser.uid && pageUrl) {
            var storedPages = JSON.parse(localStorage.getItem(pageUrl));
            if (!storedPages) {
                localStorage.setItem(pageUrl, JSON.stringify(pageUrl));
                db.collection('articles').doc(articleId).update({ totalPageView: firebase.firestore.FieldValue.increment(1) })
            }
        }
    }, [articleId, article])
    // localStorage.clear()

    return (
        <>
            <Helmet>
                <title>{`${article && article.title} - Hairrrs`}</title>
                <meta name="description" content={article && getDesc(article?.article, 65)} />
                <meta property="og:title" content={article && getDesc(article?.title, 35)} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/article?title=${articleUrlSlug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={article && getDesc(article?.article, 65)} />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />

            </Helmet>

            {article ?
                <div className="otherPageMainCont">
                    <div className="middleMain">
                        {/* <ReportBoard /> */}
                        <div style={{ background: 'white' }}>
                            <div className="layout2a">
                                <div className="artc-1">
                                    <h1>{article?.title}</h1>

                                    <div className="install-alert">
                                        <div className="website">trytune.com/about</div>
                                        <div className="install">install app</div>
                                    </div>
                                    <div style={{ position: 'relative', margin: '10px 0' }}>
                                        <div>
                                            {article?.category ? <Link to={`/articles?category=${UrlSlug(article.category, 'encode')}`} className="category">{article?.category}</Link> : <span>...</span>}
                                                &nbsp;&nbsp;&nbsp;
                                                <span>{getMonthDate(article?.createdAt)}</span>
                                        </div>
                                        {auth.currentUser?.uid === article?.userId &&
                                            <>
                                                <button style={{ position: 'absolute', top: -15, right: 50 }}>
                                                    <Link style={{ color: 'inherit' }} to={`/create-article?update=${articleId}`}>Edit</Link>
                                                </button>
                                                <button onClick={() => { alert(deleteArticle(articleId)); setTimeout(() => { window.location = '/' }, 4000); }} style={{ position: 'absolute', top: -15, right: 0 }}>
                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>

                                <div className="hr-control">
                                    <hr className='articlehr' />
                                </div>

                                <div className="comments_likes_dislikes_views">
                                    <div className="comments_likes_dislikes">
                                        <div className="likes">
                                            {totalLikes} Likes
                                        </div>
                                        &nbsp;&nbsp;

                                        <div className="dislikes">
                                            {totalDisLikes} Dislikes
                                        </div>
                                        &nbsp;&nbsp;

                                        <div className="comments">
                                            {totalComments} Comments
                                        </div>
                                    </div>
                                    <div className="viewsCont">
                                        <div><img src="/images/views.png" alt="" /></div>
                                        <div className="v">{article?.totalPageView ? article.totalPageView : 0} views</div>
                                    </div>
                                </div>

                                <div className="artc-img">
                                    <img src={article?.articleCover} alt={article?.title} />
                                </div>

                                <div className="artc-1">
                                    {/* main article */}
                                    <div className="Article-story">
                                        <article id="mainArticle"><div dangerouslySetInnerHTML={{ __html: article?.article }} /></article>
                                    </div>
                                    {/* react to article */}
                                    {auth.currentUser &&
                                        <>
                                            {/* ReactToArticle */}
                                            <div className="comments-thumbs-save">
                                                <div onClick={() => { ReactToArticle('likes') }}>
                                                    <div className="reach">
                                                        <img src="/images/saturday feather-thumbs-up.svg" alt="thumbs up" />
                                                        <span className='views'>{totalLikes}</span>
                                                    </div>
                                                    <div className={`underLine_${liked}`}></div>
                                                </div>

                                                <div onClick={() => { ReactToArticle('disLikes') }}>
                                                    <div className="reach">
                                                        <img src="/images/saturday feather-thumbs-down.svg" alt="thumbs down" />
                                                        <span className='views'>{totalDisLikes}</span>
                                                    </div>
                                                    <div className={`underLine_${disLiked}`}></div>
                                                </div>

                                                <div className="reach">
                                                    <img src="/images/saturday awesome-comment.svg" alt="comment icon" />
                                                    <span className='views'>{totalComments}</span>
                                                </div>
                                                <div className="reach">{hasSaved(saveList, articleId) ?
                                                    <div onClick={() => { Unsave(articleId) }} style={{ display: 'flex' }}>
                                                        <div className="icon">
                                                            <img src="/images/circle-arrow-down-color.svg" alt="" />
                                                        </div>
                                                        <div className="text">&nbsp;saved</div>
                                                    </div>
                                                    : <div onClick={() => { save(articleId, article.articleCover, article.title, `/article?title=${article.title}`, 'article') }} style={{ display: 'flex' }}>
                                                        <div className="icon">
                                                            <img src="/images/saturday save icon.svg" alt="" />
                                                        </div>
                                                        <div className="text">save</div>
                                                    </div>}</div>

                                                <div className="reach" style={{ position: 'relative' }}>
                                                    <div className={`show_share show_share_${showShare}`} style={{ position: 'absolute', bottom: '35px' }}>
                                                        <SocialMediaButtons url={`ntutu-fdb00.web.app/article?title=${articleUrlSlug}`} text={getDesc(article?.article, 65)} />
                                                    </div>
                                                    <img src="/images/saturday feather-share-2.svg" alt="share icon" onClick={() => { setShowShare(!showShare) }} />
                                                </div>

                                                <div className="reach">
                                                    <img src="/images/Group 1192.svg" alt="elipsis icon" />
                                                    <div className="elipsis--info-comment">
                                                        <ul>
                                                            <li>Report</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ReactToArticle end */}

                                            {articleId && <ArticleComments key={articleUrlSlug} articleId={articleId} />}
                                        </>
                                    }
                                </div>
                            </div>

                            {/* Trending Articles */}
                            <TrendingArticles key={articleUrlSlug} />
                        </div>
                    </div>

                    {article && <ItemOwner userId={article.userId} />}
                </div>
                : <h1>loading ...</h1>}
        </>
    )
}

export default Article
