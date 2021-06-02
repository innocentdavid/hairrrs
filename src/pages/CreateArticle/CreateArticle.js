import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import ProgressBar from "../../components/progress-bar.component";
import { useAuthState } from 'react-firebase-hooks/auth';
import './createArticle-scss/createArticle.css';
import { UploadImage } from '../../fuctions';
import { useHistory } from 'react-router-dom';

function CreateArticle() {
  var history = useHistory()
  var mode = 'create';
  var articleToEditId;
  const params = new URLSearchParams(window.location.search);
  if (params.has('update')) {
    mode = 'update'
    articleToEditId = params.get('update')
  }
  useEffect(() => {
    if(mode === 'update'){
      document.querySelector('.loader').style.display = 'grid';
    }
  }, [mode])

  const [user] = useAuthState(auth)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleCategory, setArticleCategory] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [articleCover, setArticleCover] = useState(null)
  const [progress, setProgress] = useState(0)

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
    if(articleToEdit?.article) {
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

  function closeInsertImageModal() {
    document.querySelector('.insertImageModalCloseOnTouch').style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
  }

  function openInsertImageModal() {
    document.querySelector('.insertImageModalCloseOnTouch').style.display = 'block';
    document.querySelector('.modal').style.display = 'flex';
  }

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

  // media library
  const [images, setImages] = useState([])
  const [inserImgCaller, setInserImgCaller] = useState([])

  useEffect(() => {
    if (user) {
      db.collection('users').doc(auth.currentUser?.uid).collection('images').onSnapshot(snapshot => {
        let r = (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setImages(r)
      })
    }
  }, [user])
  
  function insert(location) {
    let imgCheckBoxs = document.querySelectorAll('.imgCheckBox')
    if (imgCheckBoxs) {
      var checked = []
      imgCheckBoxs.forEach(checkedImage => {
        if (checkedImage.checked) {
          checked.push(checkedImage)

          if (location === 'editor') {
            let src = checkedImage.dataset.imgsrc
            let img = `<img src=${src} alt=${articleTitle.toString()} />`
            let editor = document.querySelector('#output');
            editor.focus();
            pasteHtmlAtCaret(img);
            checkedImage.checked = false;
            setEditorContent(editor);
            closeInsertImageModal();
          }

        }
      })

      if (location === 'articleCover' && checked.length > 1) {
        alert('You can only add one image for your article cover!')
      } else {
        imgCheckBoxs.forEach(checkedImage => {
          if (checkedImage.checked)
            setArticleCover(checkedImage.dataset.imgsrc)
          checkedImage.checked = false;
          closeInsertImageModal();
        })
      }
    }
  }
  // media library end

  function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        // Range.createContextualFragment() would be useful here but is
        // non-standard and not supported in all browsers (IE9, for one)
        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if (document.selection && document.selection.type !== "Control") {
      // IE < 9
      document.selection.createRange().pasteHTML(html);
    }
  }

  const saveArticle = async () => {
    document.querySelector('.loader').style.display = 'grid';
    let article = editorContent;
    var title = articleTitle;
    var UrlSlug = title.replace(/\s+/g, '-');
    var category;
    let UserDefinedcategory = articleCategory;
    UserDefinedcategory ? category = UserDefinedcategory : category = 'Hair and beauty'

    if (title && auth.currentUser) {
      let data = {
        UrlSlug, title, article, category, articleCover: articleCover, userId: auth.currentUser.uid, authorName: auth.currentUser.displayName, authorPhotoURL: auth.currentUser.photoURL, createdAt: firebase.firestore.FieldValue.serverTimestamp(), totalLikes: 0, totalDisLikes: 0, totalComments: 0
      }
      
      if (mode === 'update') {
        await db.collection('articles').doc(articleToEditId).update(data)
      } else {
        await db.collection('articles').add(data)
      }

      setProgress(90)
      setArticleCover(null)
      setArticleCategory('')
      setArticleTitle('')
      setProgress(100)
      document.querySelector('#output').innerHTML = 'Write new article ...'
      document.querySelector('.uploadingModal').style.display = "none"
      setProgress(0)
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
              <span className="add-p" style={{ cursor: 'pointer' }} onClick={() => { setInserImgCaller('articleCover'); openInsertImageModal() }}>&#10133;</span>
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
                // suppressContentEditableWarning="true"
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
                <img onClick={() => { setInserImgCaller('editor'); openInsertImageModal() }} src="/images/Icon feather-image.svg" alt="icon" />
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

      <div className="insertImageModalCloseOnTouch" onClick={() => { closeInsertImageModal() }} />
      <div className="insertImageModal">
        <div className="insertImageModalCard">
          <div className="closeInsertImageModalCard" onClick={() => { closeInsertImageModal() }}>X</div>
          <input type="file" onChange={(e) => { e.target.files[0] && UploadImage(e.target.files[0]) }} id="insertImageInput" hidden />
          <label htmlFor="insertImageInput">
            <span className="add-p">&#10133;</span>
          </label>
          <input type="text" className="url" hidden />
          <br />
          <span onClick={() => { insert(inserImgCaller) }} className="uploadImageBtn">submit</span>
        </div>
      </div>

      <div className="uploadingModal">
        <div className="uploadingModalCard">
          <div className="uploadingModalClose" onClick={() => { document.querySelector('.uploadingModal').style.display = "none" }}>X</div>
          <center><b>Uploading...</b></center>
          <br />
          <ProgressBar bgcolor={'red'} completed={progress} />
        </div>
      </div>



      <div className="modal">
        <div className="inserts">
          <div style={{ marginBottom: "50px" }}>
            <input type="file" accept="image/*" onChange={(e) => { e.target.files[0] && UploadImage(e.target.files[0]) }} id="insertImageInputPopUp" hidden multiple />
            <label htmlFor="insertImageInputPopUp">
              <span className="uploadImage">Upload image</span>
            </label>
          </div>
          {/* {progress !== 0 &&
          <div className="progressDiv" style={{ paddingRight: 10, paddingLeft: 10, overflow: 'hidden' }}><ProgressBar key={32390} bgcolor={'red'} completed={progress} /></div>} */}

          <div className="imgPrevw"><img className="" src="" alt="" width='100%' height="100%" /></div>
          <button className="insertImage" onClick={() => { insert(inserImgCaller) }}>Insert image</button>
        </div>
        <div className="galleryLoad">
          <div className="imagesGallery">
            <div className="imagesSet">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images?.map((image) => (
                  <div>
                    <input type="radio" className="imgCheckBox" id={image.id} data-imgsrc={image.url} />
                    <label htmlFor={image.id}>
                      <img src={image.url} alt='' />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="loadMore"></div>
          <div className="delete">Delete image</div>
        </div>
      </div>
      {/* <ImageUploadProcessing /> */}












      {/* <div className="mediaLibrary">
    <div className="modal">
        <div className="inserts">
            <button className="uploadImage">
                Upload image
            </button>
            <div className="image"></div>
            <button className="insertImage">Insert image</button>
        </div>
        <div className="galleryLoad">
            <div className="imagesGallery">
                <div className="imagesSet">
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="image">
                        <input type="radio" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
            <div className="loadMore"></div>
        </div>
    </div>
</div> */}
    </>
  )
}

export default CreateArticle