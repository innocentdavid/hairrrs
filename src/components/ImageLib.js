import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { loading, pasteHtmlAtCaret } from '../myFunctions';
import ProgressBar from './ProgressBar';
import FilePondWaterMark from './FilePondWaterMark';
import { confirmAlert } from 'react-confirm-alert';
import { deleteImagesFromML } from '../lib/api';

function ImageLib({ title, list, caller, close }) {
    const [user] = useAuthState(auth)
    const [progress, setProgress] = useState(0)
    const [showProgBar, setShowProgBar] = useState(false)
    const [inputType, setInputType] = useState('checkbox')

    // setInputType
    useEffect(() => {
        caller === 'AddArticleCover' && setInputType('radio')
        return () => {
            setInputType('checkbox')
        }
    }, [caller])

    useEffect(() => {
        progress && setShowProgBar(true);
        progress === 100 && setTimeout(() => { setShowProgBar(false) }, 1500);
        return () => { setProgress(null); setShowProgBar(false) }
    }, [progress])

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
            var checkedImageList = [];
            imgRadio.forEach(image => { image?.checked && checkedImageList.push(image) });
            if (checkedImageList) {
                caller === 'AddProduct' && list(checkedImageList);
                caller === 'AddJob' && list(checkedImageList);
                caller === 'AddArticleCover' && list(prevState => ({ ...prevState, mainImage: checkedImageList[0].value }));

                checkedImageList.forEach(checkedImage => {
                    let src = checkedImage.value
                    let editor = document.querySelector('#output');

                    if (caller === 'editor' && editor) {
                        let img = `<img src=${src} alt=${title.toString()} />`
                        editor.focus();
                        pasteHtmlAtCaret(img);
                    }
                });
                close();
            }
        }
    }

    const handleDelete = async () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        loading('open')
                        let imgRadio = document.querySelectorAll('.imgRadio')
                        if (imgRadio) {
                            var checkedImageList = [];
                            imgRadio.forEach(image => { image?.checked && checkedImageList.push(image) });
                            if (checkedImageList) {
                                let res = await deleteImagesFromML(user.uid, checkedImageList)
                                console.log(res)
                                loading('close')
                            }
                        }
                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    const [previewImage, setPreviewImage] = useState(null)

    return (<>
        {showProgBar && <ProgressBar progress={progress} />}

        <div className="insertImageModalCloseOnTouch" onClick={() => { close() }} />

        <div className="modal-local">
            <div className="inserts">
                <div style={{ marginBottom: "30px" }}>
                    <FilePondWaterMark setProgress={setProgress} close={close} />
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
                                    key={image?.id} style={{ margin: '10px' }}
                                    onClick={() => { setPreviewImage(image.url) }}>
                                    <input
                                        data-imageid={image?.id}
                                        data-filename={image?.fileName}
                                        type={inputType}
                                        className="imgRadio"
                                        name="imgCheckBox"
                                        value={image.url}
                                        id={image.id} />
                                    <label htmlFor={image?.id}>
                                        <img src={image?.url} alt='' />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="loadMore"></div>

                <center><button
                    onClick={handleDelete}
                    style={{ marginTop: 20 }}>Delete selected image(s)</button></center>
            </div>
        </div>
    </>)
}

export default ImageLib
