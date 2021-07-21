import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import firebase from 'firebase';
import './createArticle-scss/createArticle.css';
import { pasteHtmlAtCaret } from '../../fuctions';
import { useHistory } from 'react-router-dom';
import ImageLib from '../../components/ImageLib';
import UserProfile from '../../components/UserProfile/UserProfile';

function CreateArticle() {
  const user = UserProfile.getUser()
  var history = useHistory()
  const currentUser = user
  useEffect(() => {
    if (!currentUser) {
      history.push('/')
    }
  }, [currentUser, history])

  var mode = 'create';
  var articleToEditId;
  const params = new URLSearchParams(window.location.search);
  if (params.has('update')) {
    mode = 'update'
    articleToEditId = params.get('update')
  }
  useEffect(() => {
    if (mode === 'update') {
      document.querySelector('.loader').style.display = 'grid';
    }
  }, [mode])

  // const [user] = useAuthState(auth)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleCategory, setArticleCategory] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [articleCover, setArticleCover] = useState(null)
  const [articleToEdit, setArticleToEdit] = useState([]);

  // setArticleToEdit
  useEffect(() => {
    if (mode === 'update') {
      const articleToEditRef = db.collection('articles').doc(articleToEditId)
      articleToEditRef.get().then(doc => {
        if (doc.exists) {
          setArticleToEdit({ ...doc.data() })
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  }, [articleToEditId, mode])

  // preset form with old article's value
  useEffect(() => {
    if (mode === 'update' && articleToEdit) {
      document.querySelector('#output').innerHTML = articleToEdit.article
      setArticleCover(articleToEdit.articleCover)
      setArticleTitle(articleToEdit.title)
      setArticleCategory(articleToEdit.category)
      setEditorContent(articleToEdit.article)
    }
  }, [articleToEdit, mode])

  // set loader none
  useEffect(() => {
    if (articleToEdit?.article) {
      document.querySelector('.loader').style.display = 'none';
    }
  }, [articleToEdit])

  function createlink() {
    let url = prompt("Enter the link here: ", "https://");
    document.execCommand('createlink', false, url);
  }

  const insertHtml = () => {
    let url = prompt("Enter the link here: ", "");
    document.execCommand('insertHtml', false, url);
  }

  const [inserImgCaller, setInserImgCaller] = useState('')
  const [openImageLib, setOpenImageLib] = useState(false);
  const closeInsertImageModal = () => { setOpenImageLib(false) }

  const embedArticle = (imgUrl, id, title,) => {
    let frame = `
    <br />
    <div style="width: 100% !important" contenteditable="false">
      <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
        <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
        <div style="padding: 5px; color: black !important">
          <b>Clasical Wig first class</b>
        </div>
      </a>
    </div>
    <br />`

    let editor = document.querySelector('#output')
    pasteHtmlAtCaret(frame);
    setEditorContent(editor);
  }

  const embedProduct = (imgUrl, id, title, price) => {
    let frame = `
      <br />
      <div style="width: 100% !important" contenteditable="false">
      <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
        <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
        <div style="padding: 5px; color: black !important">
          <div style="font-size: 12px !important">Clasical Wig first class</div>
          <b style="font-size: 15px !important">N200,000</b>
        </div>
      </a>
    </div>
    <br />`

    let editor = document.querySelector('#output')
    pasteHtmlAtCaret(frame);
    setEditorContent(editor);
  }

  const embedJob = (imgUrl, id, title, price, mode) => {
    let frame = `
    <br />
      <div style="width: 100% !important" contenteditable="false">
      <a href="/article" style="width: 210px !important; color: inherit; height: 70px !important; border: 1px solid red !important; border-radius: 5px !important; display: flex !important">
        <img src="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" style="object-fit: scale-down; width: 38% !important; min-height: 70px !important; max-height: 70px !important; background: #e6e6e690 !important" alt="" />
        <div style="padding: 5px; color: black !important">
          <div style="font-size: 11px !important">Clasical Wig first class</div>
          <b style="font-size: 12px !important">N200,000</b>
          <div style="font-size: 11px !important">monthly</div>
        </div>
      </a>
    </div>
    <br />`

    let editor = document.querySelector('#output')
    pasteHtmlAtCaret(frame);
    setEditorContent(editor);
  }

  const handleArticleBodyChange = (newArticle) => {
    setEditorContent(newArticle)
  }

  const saveArticle = async () => {
    document.querySelector('.loader').style.display = 'grid';
    let article = editorContent;
    var title = articleTitle;
    var UrlSlug = title.replace(/\s+/g, '-');
    var category;
    let UserDefinedcategory = articleCategory;
    UserDefinedcategory ? category = UserDefinedcategory : category = 'Hair and beauty'

    if (title && user) {
      let data = {
        UrlSlug, title,
        article, category,
        articleCover: articleCover,
        author: {
          uid: user.uid,
          displayName: user.displayName,
          userName: user.userName,
          photoURL: user.photoURL
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        totalLikes: 0, totalDisLikes: 0,
        totalComments: 0, totalPageView: 0
      }

      if (mode === 'update') {
        // await db.collection('articles').doc(articleToEditId).update(data)
      } else {
        await db.collection('articles').add(data)
        
        await db.collection('users').doc(user?.uid).update({
          totalArticles: firebase.firestore.FieldValue.increment(1),
          totalEngagement: firebase.firestore.FieldValue.increment(1)
        })
      }

      setArticleCover(null)
      setArticleCategory('')
      setArticleTitle('')
      document.querySelector('#output').innerHTML = 'Write new article ...'
      // document.querySelector('.uploadingModal').style.display = "none"
      document.querySelector('.loader').style.display = 'none';
      // alert('saved');
      setTimeout(() => { history.push(`/article?title=${UrlSlug}`) }, 100);
    } else {
      alert('You havn\'t set your article\'s title!');
    }
  }

  return (
    <>
      <div className="loader">
        <img src="/images/loading.svg" alt="" />
      </div>

      <div className="createArticleMain">
        <div className="p-title" style={{ color: 'white', fontSize: '1rem', fontWeight: '500' }}>Create Article</div>
        <div className="step1">
          <div className="stepper-banner">Step 1 - create article</div>
          <div className="stepper-body">
            <div className="upload-image-btn">
              <span className="add-p" style={{ cursor: 'pointer' }} onClick={() => { setInserImgCaller('AddArticleCover'); setOpenImageLib(!openImageLib) }}>&#10133;</span>
              <h2>Upload article cover</h2>
            </div>
            <div className="add-images">
              <img className="articleCoverPrevw" src={articleCover} alt='' />
            </div>
            <div className="article-title-field">
              <input type="text" id="article-title" value={articleTitle} onChange={(e) => { setArticleTitle(e.target.value) }} placeholder="Article title" />
            </div>

            <div><br /></div>

            <div className="article-body">



              <div
                id="output"
                className="textarea customArticleTextarea"
                contentEditable="true"
                inputMode="text"
                onInput={(e) => { handleArticleBodyChange(e.target.innerHTML) }}
                onBlur={(e) => { handleArticleBodyChange(e.target.innerHTML) }}
                onPaste={(e) => {
                  e.preventDefault();
                  window.document.execCommand('insertText', false, e.clipboardData.getData('text'))
                }}
              />



              <div className="div-icon">
                <img onClick={() => { document.execCommand('bold', false, null) }} src="/images/B.svg" alt="icon" className="boldBtn" />
                <img src="/images/Icon feather-link.svg" alt="icon" onClick={() => { createlink() }} />
                <img onClick={() => { setInserImgCaller('editor'); setOpenImageLib(!openImageLib) }} src="/images/Icon feather-image.svg" alt="icon" />
                <img onClick={() => { insertHtml() }} src="/images/Icon feather-plus.svg" alt="icon" />
              </div>
            </div>

            <div className="article-category-field">
              <input type="text" id="article-category" value={articleCategory} onChange={(e) => { setArticleCategory(e.target.value) }} placeholder="Article category" />
            </div>

            <button onClick={() => { embedProduct('sldkfjadssdfie034890ksdjf') }}>Embed Product</button>
            <button onClick={() => { embedJob('sldkfjaweiofjodsie034890ksdjf') }}>Embed Job</button>
            <button onClick={() => { embedArticle('sldkf34ojdisojadsie034890ksdjf') }}>Embed Article</button>

            <button className="next-step" onClick={() => { saveArticle() }}>Submit</button>
          </div>
          <div className="stepper-footer"></div>
        </div>
      </div>
      <br />
      <br />

      {openImageLib && <ImageLib
        title={articleTitle}
        setImageToList={setArticleCover}
        closeInsertImageModal={closeInsertImageModal}
        inserImgCaller={inserImgCaller}
      />}
    </>
  )
}

export default CreateArticle