import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase';
import firebase from 'firebase';
import { pasteHtmlAtCaret, b64toBlob, makeid } from '../fuctions';
import ProgressBar from './ProgressBar';

function ImageLib({ title, setImageToList, inserImgCaller, closeInsertImageModal }) {
    const [user] = useAuthState(auth)
    const [progress, setProgress] = useState(0)
    const [showProgBar, setShowProgBar] = useState(false)

    // get all images into media library
    const [images, setImages] = useState([])
    useEffect(() => {
        if (user) {
            db.collection('users').doc(auth.currentUser?.uid).collection('images').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
                let r = (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setImages(r)
            })
        }
    }, [user])
    // get all images into media library end

    function insert() {
        let imgRadio = document.querySelectorAll('.imgRadio')
        if (imgRadio) {
            var checkedImage;
            imgRadio.forEach(image => {
                if (image.checked) { checkedImage = image }
            });
            let src = checkedImage.value
            let editor = document.querySelector('#output');

            if (inserImgCaller === 'editor' && editor) {
                let img = `<img src=${src} alt=${title.toString()} />`
                editor.focus();
                pasteHtmlAtCaret(img);
            }

            if (inserImgCaller === 'AddProduct') {
                let id = makeid(5)
                setImageToList(id, src)
            }

            if (inserImgCaller === 'AddJob') {
                let id = makeid(5)
                setImageToList(id, src)
            }

            if (inserImgCaller === 'AddArticleCover') {

                setImageToList(src)
            }
            checkedImage.checked = false;
            closeInsertImageModal();
        }
    }

    const [counter, setCounter] = useState(0)
    const [totalImages, setTotalImages] = useState(0)
    useEffect(() => {
        if (counter === totalImages) {
            setTimeout(() => {
                setTotalImages(0)
                setCounter(0)
            }, 3000);
        }
    }, [counter, totalImages])

    // uploadImagge
    const handleUploadImage = (files, MAX_WIDTH = 250) => {
        setTotalImages(Object.entries(files).length);
        Object.entries(files).forEach(file => {
            var imageFile = file[1];
            if (imageFile.name) {
                var fileName = imageFile.name
                if (auth.currentUser?.uid) {
                    if (!imageFile) { alert('You did not select any image') };
                    const reader = new FileReader();
                    reader.readAsDataURL(imageFile);

                    reader.onload = function (event) {
                        const imgElement = document.createElement("img");
                        imgElement.src = event.target.result;
                        imgElement.onload = function (e) {
                            const canvas = document.createElement("canvas");
                            const scaleSize = MAX_WIDTH / e.target.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = e.target.height * scaleSize;
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                            const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                            // Split the base64 string in data and contentType
                            var block = srcEncoded.split(";");
                            // Get the content type of the image
                            var contentType = block[0].split(":")[1];// In this case "image/jpeg"
                            // get the real base64 content of the file
                            var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
                            var blob = b64toBlob(realData, contentType); // Convert it to a blob to upload
                            handleUpload(blob, fileName);
                        };
                    };
                }
            }
        })
    }

    // set counter
    const [jk, setJk] = useState(null)
    useEffect(() => {
        if (jk) {
            setCounter(counter + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jk])

    const handleUpload = (imageFile, fileName) => {
        var file = new File([imageFile], fileName, { type: "image/png" });
        const uploadTask = storage.ref(`images/${auth.currentUser.uid}/${fileName}`).put(file);

        uploadTask.on("state_change", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setShowProgBar(true)
            setProgress(progress)
            if (snapshot.bytesTransferred === snapshot.totalBytes) { setJk(fileName) }
        }, (error) => { /*console.log(error.message)*/ },
            () => {
                setShowProgBar(false)
                storage
                    .ref(`images/${auth.currentUser.uid}/${fileName}`)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('users').doc(auth.currentUser.uid).collection('images').add({ url, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                    });
            }
        );
    };
    // uploadImagge

    const [previewImage, setPreviewImage] = useState(null)

    return (<>
        {showProgBar && <ProgressBar progress={progress} />}

        <div className="insertImageModalCloseOnTouch" onClick={() => { closeInsertImageModal() }} />

        <div className="modal">
            <div className="inserts">
                <div style={{ marginBottom: "50px" }}>
                    <input type="file" accept="image/*" onChange={(e) => { e.target.files && handleUploadImage(e.target.files) }} id="insertImageInputPopUp" hidden multiple />
                    <label htmlFor="insertImageInputPopUp">
                        <span className="uploadImage">Upload image</span>
                    </label>
                </div>

                <div className="imgPrevw"><img className="" src={previewImage} alt="" width='100%' height="100%" /></div>
                <button className="insertImage" onClick={(e) => { e.preventDefault(); insert() }}>Insert image</button>
            </div>
            <div className="galleryLoad">
                <div className="imagesGallery">
                    <div className="imagesSet">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {images?.map((image) => (
                                <div
                                    key={image.id}
                                    style={{ margin: '10px' }}
                                    onClick={() => { setPreviewImage(image.url) }}>
                                    {/* {inserImgCaller !== 'AddArticleCover' && <input
                                        type="checkbox"
                                        className="imgCheckBox"
                                        name="imgCheckBox"
                                        value={image.url}
                                        id={image.id} />}
                                    {inserImgCaller === 'AddArticleCover' && <input
                                        type="radio"
                                        className="imgRadio"
                                        name="imgCheckBox"
                                        value={image.url}
                                        id={image.id} />} */}
                                    <input
                                        type="radio"
                                        className="imgRadio"
                                        name="imgCheckBox"
                                        value={image.url}
                                        id={image.id} />
                                    <label htmlFor={image.id}>
                                        <img src={image.url} alt='' />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="loadMore"></div>

                {totalImages > 0 && <div className="uploadCounterSection">{counter} of {totalImages}</div>}
                {/* <div className="delete">Delete image</div> */}
            </div>
        </div>
    </>)
}

export default ImageLib
