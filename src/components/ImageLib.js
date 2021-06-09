import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase';
import firebase from 'firebase';
import { pasteHtmlAtCaret, b64toBlob } from '../fuctions';
import ProgressBar from './ProgressBar';

function ImageLib({ title, setImageToList, inserImgCaller, closeInsertImageModal }) {
    const [user] = useAuthState(auth)
    const [progress, setProgress] = useState(0)
    const [showProgBar, setShowProgBar] = useState(false)

    // media library
    const [images, setImages] = useState([])

    useEffect(() => {
        if (user) {
            db.collection('users').doc(auth.currentUser?.uid).collection('images').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
                let r = (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setImages(r)
            })
        }
    }, [user])

    async function insert() {
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
            if(inserImgCaller === 'AddProduct'){
                let img = document.createElement('img')
                img.alt=title;
                img.src=src;
                img.classList.add('pImg');
                document.querySelector('.add-images').append(img)
            }
            if(inserImgCaller === 'AddArticleCover'){
                
                setImageToList(src)
            }
            checkedImage.checked = false;
            closeInsertImageModal();
        }
    }
    // media library end

    // uploadImagge
    const handleUploadImage = (imageFile) => {
        var fileName = imageFile.name
        if (auth.currentUser) {
            const MAX_WIDTH = 400;

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

    const handleUpload = (imageFile, fileName) => {
        var file = new File([imageFile], fileName, { type: "image/png" });
        const uploadTask = storage.ref(`images/${auth.currentUser.uid}/${fileName}`).put(file);

        uploadTask.on("state_change", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setShowProgBar(true)
            setProgress(progress)
        }, (error) => { /*console.log(error.message)*/ },
            () => {
                storage
                .ref(`images/${auth.currentUser.uid}/${fileName}`)
                .getDownloadURL()
                .then(url => {
                    db.collection('users').doc(auth.currentUser.uid).collection('images').add({ url, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                });
                if(progress === 100){
                    setShowProgBar(false)
                }
            }
        );
    };
    // uploadImagge

    return (<>
        {showProgBar && <ProgressBar progress={progress} />}

        <div className="insertImageModalCloseOnTouch" onClick={() => { closeInsertImageModal() }} />
        
        <div className="modal">
            <div className="inserts">
                <div style={{ marginBottom: "50px" }}>
                    <input type="file" accept="image/*" onChange={(e) => { e.target.files[0] && handleUploadImage(e.target.files[0]) }} id="insertImageInputPopUp" hidden multiple />
                    <label htmlFor="insertImageInputPopUp">
                        <span className="uploadImage">Upload image</span>
                    </label>
                </div>

                <div className="imgPrevw"><img className="" src="" alt="" width='100%' height="100%" /></div>
                <button className="insertImage" onClick={(e) => { e.preventDefault(); insert() }}>Insert image</button>
            </div>
            <div className="galleryLoad">
                <div className="imagesGallery">
                    <div className="imagesSet">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {images?.map((image) => (
                                <div key={image.id}>
                                    <input
                                        type="radio"
                                        // className="imgCheckBox"
                                        className="imgRadio"
                                        name="imgCheckBox"
                                        value={image.url}
                                        id={image.url} />
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
    </>)
}

export default ImageLib
