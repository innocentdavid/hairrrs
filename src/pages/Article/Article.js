import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TrendingArticles from '../../components/TrendingArticles/TrendingArticles';
import { auth, db } from '../../firebase';
import firebase from "firebase";
import { deleteArticle, getDesc, getMonthDate, hasSaved, save, Unsave, UrlSlug } from '../../fuctions';
import ArticleComments from './Components/comments/ArticleComments';
import { Helmet } from 'react-helmet';
import { SaveListContext } from '../../contexts/GlobalStore';
import ItemOwner from '../../components/ItemOwner';
import ReportBoard from '../../components/ReportBoard'
import WebShareApi from '../../components/WebShareApi';
import UserProfile from '../../components/UserProfile/UserProfile';
import { ReactToArticle } from '../../myFunctions';

function Article() {
  const [user, setUser] = useState(UserProfile.getUser());
  // setUser
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log(authUser);
      setUser(UserProfile.getUser())
      // if (authUser?.uid) {
      //   const fetch = () => {
      //     db.collection('users').doc(authUser?.uid).onSnapshot((snapshot => {
      //       if(snapshot.exists){
      //         setUser(snapshot.data())
      //       }
      //     }))
      //   }
      //   fetch();
      // }
    })
  }, [])

  const [showReportBoard, setShowReportBoard] = useState(false)
  const [elipsisInfoComment, setElipsisInfoComment] = useState(false)

  const [saveList] = useContext(SaveListContext)
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  if (!params.has('title')) {
    history.push('/articles')
  }
  var articleUrlSlug = params.get('title')

  // Get Article
  var [article, setArticle] = useState([]);
  const [articleId, setArticleId] = useState(null);

  // setArticle setArticleId
  useEffect(() => {
    const fetchArticle = async () => {
      const response = db.collection('articles')
        .where('UrlSlug', '==', articleUrlSlug);

      const data = await response.get();

      if (data.empty) {
        history.push('/articles')
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


  // Article initial setLiked setDisLiked
  useEffect(() => {
    let unsubscribe = () => {
      if (articleId && user) {
        var uid = user?.uid

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
  }, [articleId, user])


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


  // handleReactToArticle
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  const handleReactToArticle = (reaction) => {
    let articleAuthorUid = article?.uthor?.uid
    ReactToArticle({
      reaction,
      articleId,
      disLiked,
      setDisLiked,
      liked,
      articleAuthorUid,
      setLiked,
    })

    
  }
  // handleReactToArticle ends

  // set page viewed
  useEffect(() => {
    const setPageViewed = async () => {
      const isAuthor = (a, b) => a === b ? true : false;

      let authorId = article?.seller?.uid
      let cUserId = user?.uid

      if (authorId && cUserId) {
        var totalPageView = await document.querySelector('#totalPageViewSection');
        var pageUrl = await window.location.href;
        var storedPages = await JSON.parse(localStorage.getItem(pageUrl));
        let UpdatedViewCount = parseInt(totalPageView?.textContent) + 1

        if (
          storedPages === null
          && !isAuthor(authorId, cUserId)
          && totalPageView?.textContent
          && articleId
          && pageUrl
        ) {
          localStorage.setItem(pageUrl, JSON.stringify(pageUrl));
          document.querySelector('#totalPageViewSection').textContent = UpdatedViewCount
          db.collection('articles').doc(articleId).update({ totalPageView: firebase.firestore.FieldValue.increment(1) })

          db.collection('users').doc(article?.author?.uid).update({
            totalEngagement: firebase.firestore.FieldValue.increment(1)
          })
        }
      }
    }

    return () => { setPageViewed() }
  }, [articleId, article, user])
  // localStorage.removeItem(window.location.href)

  // get last five comments
  useEffect(() => {
    // if (articleId) {
    //   db.collection('articles').doc(articleId).collection('comments')
    //   .where('createdAt', '<', new Date(Date.now() + 10000))
    //   .limit(5)
    //   .onSnapshot((snapshot) => {
    //     if(!snapshot.empty){
    //       console.log(snapshot.docs.map(doc => ({ doc: doc.data() })))
    //     }
    //   })
    // }
  }, []);

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
            {showReportBoard && <ReportBoard
              type="article"
              id={articleId}
              setShowReportBoard={setShowReportBoard}
            />}

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
                      {article?.updatedAt ? 
                      <span>Last modified {getMonthDate(article?.updatedAt)}</span> :
                      <span>Published on {getMonthDate(article?.createdAt)}</span>
                      }
                    </div>
                    {user?.uid === article?.author?.uid &&
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
                    <div className="v" ><span id="totalPageViewSection">{article?.totalPageView ? article.totalPageView : 0}</span> views</div>
                  </div>
                </div>

                <div className="artc-img">
                  <img src={article?.mainImage} alt={article?.title} />
                </div>

                <div className="artc-1">
                  {/* main article */}
                  <div className="Article-story">
                    <article id="mainArticle"><div dangerouslySetInnerHTML={{ __html: article?.body }} /></article>
                  </div>
                  {/* react to article */}
                  {/* {user && */}
                    <>
                      <div className="comments-thumbs-save">
                        <div className="children">
                          <div onClick={() => { handleReactToArticle('likes') }}>
                            <div className="reach">
                              <img src="/images/saturday feather-thumbs-up.svg" alt="thumbs up" />
                              <span className='views'>{totalLikes}</span>
                            </div>
                            <div className={`underLine_${liked}`}></div>
                          </div>

                          <div onClick={() => { handleReactToArticle('disLikes') }}>
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
                        </div>

                        <div className="children">
                          {/* save */}
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
                            </div>}
                          </div>

                          {/* share */}
                          <div className="reach" style={{ position: 'relative' }}>
                            <WebShareApi url={`ntutu-fdb00.web.app/article?title=${articleUrlSlug}`} title={article?.title} text={`${article?.title} \n \n`} />
                          </div>

                          {user?.uid !== article?.author?.uid && <div className="reach" id={`${articleId}_reported`}>
                            <img src="/images/Group 1192.svg" alt="elipsis icon" onClick={() => { setElipsisInfoComment(!elipsisInfoComment) }} />
                            {elipsisInfoComment &&
                              <div className="elipsis--info-comment">
                                <ul style={{ display: 'flex' }}>
                                  <li style={{ margin: '5px' }} onClick={() => { setShowReportBoard(true) }}>Report</li>
                                </ul>
                              </div>
                            }
                          </div>}
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />

                      {articleId &&
                        <ArticleComments
                          key={articleUrlSlug}
                          totalComments={totalComments}
                          articleId={articleId} />}

                      {/* handleReactToArticle end */}
                    </>
                  {/* } */}
                </div>
              </div>

              {/* Trending Articles */}
              <TrendingArticles key={articleUrlSlug} />
            </div>
          </div>

          {article && <ItemOwner userId={article?.author?.uid} />}
        </div>
        : <h1>loading ...</h1>}
    </>
  )
}

export default Article
