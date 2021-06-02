import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase';
import firebase from 'firebase';

function CreateArticle() {
    const [articleCover, setArticleCover] = useState(null)

    // create article commands
    useEffect(() => {
        let buttons = document.getElementsByClassName('tool--btn');
        for (let btn of buttons) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let cmd = btn.dataset['command'];
                if (cmd === 'createlink') {
                    let url = prompt("Enter the link here: ", "http://");
                    document.execCommand(cmd, false, url);
                } else {
                    if (cmd === 'insertHtml') {
                        let url = prompt("Enter the link here: ", "");
                        document.execCommand(cmd, false, url);
                    } else {
                        document.execCommand(cmd, false, null);
                    }
                }
            })
        }
    }, [])

    // upload image
    useEffect(() => {
        const actualBtn = document.getElementById('actual-btn');

        actualBtn.addEventListener('change', function () {
            let url = URL.createObjectURL(this.files[0]);
            document.execCommand('insertImage', false, url);
        })
    }, [])

    // uploadArticleCover
    const saveArticleStep1 = () => {
        if (articleCover) {
            if (auth.currentUser) {
                const uploadArticleCover = storage.ref(`article_cover_images/${articleCover.name}`).put(articleCover)
                uploadArticleCover.on("state_changed", (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(`uploading...${progress}`);
                },
                    (error) => { console.log(error) },
                    () => {
                        storage.ref("article_cover_images").child(articleCover.name).getDownloadURL().then(url => {
                            saveArticleStep2(url)
                        })
                    })
            } else {
                let r = window.confirm('you have to login first, do you want to login now?');
                if (r) {
                    alert('comming soon!');
                }
            }
        } else {
            alert('you have not uploaded your article\'s cover image')
        }
    }
    
    const saveArticleStep2 = (url) => {
        let article = document.querySelector('.customArticleTextarea').innerHTML;
        var title = document.querySelector('.articleTitle').value + ' - Hairrrs';
        var UrlSlug = title.replace(/\s+/g, '-');
        var category;
        let UserDefinedcategory = document.querySelector('.articleCategory').value;
        UserDefinedcategory ? category=UserDefinedcategory : category = 'Hair and beauty'

        if (title) {
            db.collection('articles').doc().set({
                UrlSlug, title, article, category, articleCover: url, userId: auth.currentUser.uid, authorName: auth.currentUser.displayName, authorPhotoURL: auth.currentUser.photoURL, createdAt: firebase.firestore.FieldValue.serverTimestamp(), totalLikes: 0, totalDisLikes: 0, totalComments: 0
            })
            setArticleCover(null)
            document.querySelector('.customArticleTextarea').innerHTML = 'Write new article ...'
            alert('saved');
        } else {
            alert('You havn\'t set your article\'s title!');
        }
    }

    return (
        <>
            <div className="layout10">

                <div className="createArticleMainCont">
                    <div className="">
                        <div className="title">
                            <h2>Create Article</h2>
                        </div>

                        <div className="article-board">
                            <div className="steps-shelfer-heading">Step 1 - create article</div>
                            <div className="according-000">
                                <div className="cover001">
                                    <form className="bbnndnd">
                                        <div className="hold--form">

                                            <div className="hold--form00">
                                                <div className="infos">
                                                    <input type="file" onChange={(e) => { e.target.files[0] && console.log(e.target.files[0]); setArticleCover(e.target.files[0]) }} id="actual-btn" hidden />
                                                    <label for="actual-btn" className="addFeaturedPhoto">
                                                        <span className="add-p">&#10133;</span>
                                                    </label>
                                                    <h2>Upload article cover</h2>
                                                </div>
                                                <div className="add-images">
                                                    {articleCover && <img src={URL.createObjectURL(articleCover)} alt={articleCover.name} />}
                                                </div>

                                                <div className="add-title">
                                                    <input type="text" className="articleTitle" placeholder="Title" />
                                                </div>
                                                <div className="Details">
                                                    {/* <textarea id="output" className="customArticleTextarea" placeholder="Write article ..."></textarea> */}
                                                    <div id="output" className="textarea customArticleTextarea" contentEditable="true">Write article ...</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="selection-2">
                                            <div className="selector-2">
                                                <input type="button" className="articleCategory" placeholder="Category" required />
                                                <div id="selecticon">&#10094;</div>
                                            </div>
                                        </div>
                                        <div className="holder--form-01">
                                            <button type="button" onClick={() => { saveArticleStep1() }} className="nextbtn">Next</button>
                                        </div>

                                        <div className="div-icon">
                                            <img data-command="bold" src="/images/B.svg" alt="icon" className="tool--btn boldBtn" />
                                            <img data-command="createlink" src="/images/Icon feather-link.svg" alt="icon" className="tool--btn" />
                                            <label for="actual-btn"><img src="/images/Icon feather-image.svg" alt="icon" /></label>
                                            <img data-command="insertHtml" src="/images/Icon feather-plus.svg" alt="icon" className="tool--btn" />
                                        </div>
                                        <input type="file" id="actual-btn" hidden />

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateArticle