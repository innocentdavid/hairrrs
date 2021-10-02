import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import firebase from 'firebase';
import './createArticle-scss/createArticle.css';
import { pasteHtmlAtCaret, triggerAuthUser, loading } from '../../myFunctions';
import { useHistory } from 'react-router-dom';
import ImageLib from '../../components/ImageLib';
import UserProfile from '../../components/UserProfile/UserProfile';

function CreateArticle() {
  const currentUser = UserProfile.getUser()
  var history = useHistory()

  useEffect(() => {
    if (!currentUser) {
      alert('You have to login to continue');
      triggerAuthUser(true)
    }
  }, [currentUser])

  const [mode, setMode] = useState('create')
  const [articleToEditId, setArticleToEditId] = useState('')
  // var mode = 'create';
  // var articleToEditId;
  const params = new URLSearchParams(window.location.search);
  if (params.has('update')) {
    setMode('update');
    setArticleToEditId(params.get('update'));
  }

  // const [currentUser] = useAuthState(auth)
  const [articleContent, setArticleContent] = useState({ title: '', category: '', body: '', mainImage: '' })
  const onChange = (e) => {
    const { value, name } = e.target;
    setArticleContent(prevState => ({ ...prevState, [name]: value }));
  }

  const [articleCategories, setArticleCategories] = useState([])
  useEffect(() => {
    const fetch = async () => {
      let res = await db.collection('articleCategories').get()
      !res.empty && setArticleCategories(res.docs.map(doc => ({ ...doc.data(), categoryId: doc.id })))
    }
    fetch()
  }, [])

  // setArticleToEdit
  useEffect(() => {
    async function action() {
      try {
        const articleToEditRef = await db.collection('articles').doc(articleToEditId).get();
        if (articleToEditRef.exists) {
          let { title, category, body, mainImage } = articleToEditRef.data()
          setArticleContent({ title, category, body, mainImage })
          return 'success'
        }
        return 'error'
      }
      catch {
        return 'error';
      }
    }

    mode === 'update' && loading('open'); action();
  }, [articleToEditId, mode])


  function createlink() {
    let url = prompt("Enter the link here: ", "https://");
    document.querySelector('.customArticleTextarea').focus();
    document.execCommand('createlink', false, url);
  }

  const insertHtml = () => {
    let url = prompt("Enter embed link here: ", "");
    document.querySelector('.customArticleTextarea').focus();
    document.execCommand('insertHtml', false, url);
  }

  const [insertImgCaller, setinsertImgCaller] = useState('')
  const [openImageLib, setOpenImageLib] = useState(false);

  const closeInsertImageModal = () => { setOpenImageLib(false) }

  const embedArticle = (imgUrl, id, title,) => {
    // let frame = `
    // <br />
    // <div style="width: 100% !important" contenteditable="false">
    //   <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
    //     <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
    //     <div style="padding: 5px; color: black !important">
    //       <b>Clasical Wig first class</b>
    //     </div>
    //   </a>
    // </div>
    // <br />`

    // let editor = document.querySelector('#output')
    // pasteHtmlAtCaret(frame);
    // setArticleContent(prevState => ({ ...prevState, body: editor }));
  }

  const embedProduct = (imgUrl, id, title, price) => {
    // let frame = `
    //   <br />
    //   <div style="width: 100% !important" contenteditable="false">
    //   <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
    //     <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
    //     <div style="padding: 5px; color: black !important">
    //       <div style="font-size: 12px !important">Clasical Wig first class</div>
    //       <b style="font-size: 15px !important">N200,000</b>
    //     </div>
    //   </a>
    // </div>
    // <br />`

    // let editor = document.querySelector('#output')
    // pasteHtmlAtCaret(frame);
    // setArticleContent(prevState => ({ ...prevState, body: editor }));
  }

  const embedJob = (imgUrl, id, title, price, mode) => {
    // let frame = `
    // <br />
    //   <div style="width: 100% !important" contenteditable="false">
    //   <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
    //     <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
    //     <div style="padding: 5px; color: black !important">
    //       <div style="font-size: 11px !important">Clasical Wig first class</div>
    //       <b style="font-size: 12px !important">N200,000</b>
    //       <div style="font-size: 11px !important">monthly</div>
    //     </div>
    //   </a>
    // </div>
    // <br />`

    // let editor = document.querySelector('#output')
    // pasteHtmlAtCaret(frame);
    // setArticleContent(prevState => ({ ...prevState, body: editor }));
  }

  const saveArticle = async () => {
    loading('open')
    var title = articleContent?.title;
    var UrlSlug = title.replace(/\s+/g, '-');
    // new Date().toISOString();

    if (title && currentUser) {
      if (mode === 'update') {
        let data = {
          title,
          UrlSlug,
          category: articleContent?.category,
          mainImage: articleContent?.mainImage,
          body: articleContent?.body,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
        await db.collection('articles').doc(articleToEditId).update(data);

      } else {
        let data = {
          title,
          UrlSlug,
          category: articleContent?.category,
          mainImage: articleContent?.mainImage,
          body: articleContent?.body,
          author: {
            uid: currentUser?.uid,
            userName: currentUser?.userName,
            photoURL: currentUser?.photoURL
          },
          createdAt: articleContent?.createdAt ? articleContent?.createdAt : firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: '', totalLikes: 0, totalDisLikes: 0, totalComments: 0, totalPageView: 0
        }
        await db.collection('articles').add(data)
        await db.collection('users').doc(currentUser?.uid).update({
          totalArticles: firebase.firestore.FieldValue.increment(1),
          totalEngagement: firebase.firestore.FieldValue.increment(1)
        })
      }
      setArticleContent({ title: '', category: '', body: '', mainImage: '', createdAt: '' })
      document.querySelector('#output').innerHTML = 'Write new article ...'
      // alert('saved');
      setTimeout(() => { history.push(`/article?title=${UrlSlug}`) }, 100);
    } else {
      alert('You havn\'t set your article\'s title!');
      loading('close')
    }
  }

  return (
    <>
      <div className="container-fluid createArticleMain">
        <div className="p-title" style={{ color: 'white', background: '#f40053', fontSize: '1rem', fontWeight: '500' }}>Create Article</div>
        <div className="step1">
          {/* <div className="stepper-banner">Step 1 - create article</div> */}
          <div className="stepper-body">

            {/* title */}
            <div className="article-title-field my-3">
              <label className="text-dark">Title</label>
              <input type="text" id="article-title"
                name='title'
                value={articleContent.title}
                onChange={onChange}
                placeholder="Article title" />
            </div>

            {/* main image */}
            <div className="upload-image-btn mr-5">
              <span className="add-p" style={{ cursor: 'pointer' }} onClick={() => { setinsertImgCaller('AddArticleCover'); setOpenImageLib(!openImageLib) }}>{articleContent?.mainImage ?
                <div className="add-images">
                  <img className="articleCoverPrevw" src={articleContent?.mainImage} alt='' />
                </div>
                : <>&#10133;</>
              }</span>
              <h4 className="mx-2">Upload article main image</h4>
            </div>

            <div><br /></div>

            {/* Body */}
            <label className="text-dark">Body</label>
            <div className="article-body">
              <div
                id="output"
                className="textarea customArticleTextarea"
                contentEditable="true"
                inputMode="text"
                onInput={(e) => { setArticleContent(prevState => ({ ...prevState, body: e.target.innerHTML })) }}
                onBlur={(e) => { setArticleContent(prevState => ({ ...prevState, body: e.target.innerHTML })) }}
                onPaste={(e) => {
                  e.preventDefault();
                  window.document.execCommand('insertText', false, e.clipboardData.getData('text'))
                }}
              />

              <div className="div-icon">
                <img onClick={() => { document.execCommand('bold', false, null) }} src="/images/B.svg" alt="icon" className="boldBtn" />
                <img src="/images/Icon feather-link.svg" alt="icon" onClick={() => { createlink() }} />
                <img onClick={() => { setinsertImgCaller('editor'); setOpenImageLib(!openImageLib) }} src="/images/Icon feather-image.svg" alt="icon" />
                <img onClick={() => { insertHtml() }} src="/images/Icon feather-plus.svg" alt="icon" />
              </div>
            </div>

            <div className="my-5"></div>

            {/* category */}
            <div className="article-category-field">
              <label className="text-dark">Category</label>
              <select
                className="form-control"
                name="category"
                value={articleContent.category}
                onChange={onChange}>
                <option value="">selet category</option>
                {articleCategories?.map((catg, index) => {
                  // console.log({catg})

                  return (<option key={index} value={catg?.value}>{catg?.value}</option>)
                })}
              </select>
              {/* <input type="text" id="article-category"
                name="category"
                value={articleContent.category}
                onChange={onChange}
                placeholder="Article category" /> */}
            </div>

            <div className="my-3"></div>
            {/* <button onClick={() => { embedProduct('sldkfjadssdfie034890ksdjf') }}>Embed Product</button>
            <button onClick={() => { embedJob('sldkfjaweiofjodsie034890ksdjf') }}>Embed Job</button>
            <button onClick={() => { embedArticle('sldkf34ojdisojadsie034890ksdjf') }}>Embed Article</button> */}

            <button className="next-step" onClick={() => { saveArticle() }}>Submit</button>
          </div>
          <div className="stepper-footer"></div>
        </div>
      </div>
      <br />
      <br />

      {openImageLib && <ImageLib
        title={articleContent.title}
        list={setArticleContent}
        close={closeInsertImageModal}
        caller={insertImgCaller}
      />}
    </>
  )
}

export default CreateArticle