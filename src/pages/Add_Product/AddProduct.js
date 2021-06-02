import React, { useState } from 'react'
import { auth, db } from '../../firebase';
import firebase from 'firebase';

function AddProduct() {
    const [categories, setCategories] = useState([])

    const [productImages, setProductImages] = useState([
        { id: "4KmXLdzDxeSMojODOot4", image: "https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/images%2FSRU36oosmDaSR6xcF8Y6cgQkD3Z2%2FGettyImages-1130330466-crop-4d0bc06b04124177b12c69f6d62d8330.webp?alt=media&token=11e6277e-b7f0-4f99-bf43-7fd3819d7833" },
        { id: "S5sXatxNlURCnAnGLl69", image: "https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/images%2FSRU36oosmDaSR6xcF8Y6cgQkD3Z2%2Fcalendar-icon-vector-22895109.jpg?alt=media&token=69d76125-7313-420f-bdd9-1be4b444a936" },
        { id: "a6aG8O71wJOd8mWG36QS", image: "https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/images%2FSRU36oosmDaSR6xcF8Y6cgQkD3Z2%2F0_juMN1XYxwwlyyU0Z.jpg?alt=media&token=a605ebb0-9a0a-49ba-881b-49a32a7c5d06" },
        { id: "d7fzxti507osyVsQuWOG", image: "https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/images%2FSRU36oosmDaSR6xcF8Y6cgQkD3Z2%2Fdownload%20(1).png?alt=media&token=8e87099c-21d6-45a1-bbdb-3474e233506b" },
    ])
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [negotiable, setNegotiable] = useState(false)
    const [featuredImage, setFeaturedImage] = useState(process.env.REACT_APP_DEFAULT_USER_PHOTO_URL)

    const addProduct = async () => {
        document.querySelector('.loader').style.display='grid'
        let id = title.replace(/\s+/g, '-');

        const data = {
            id,
            title,
            productDesc,
            sellerName: auth.currentUser?.displayName,
            sellerId: auth.currentUser?.uid,
            sellerPhotoURL: auth.currentUser?.photoURL,
            negotiable,
            type,
            location,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            category,
            featuredImage,
            promotion: 'Regular',
            country: 'Nigeria',
            address: 'Lagos Island(Eko), Lagos Nigeria',
            phone: '+234 811 265 904',
        }
        await db.collection('Jobs').doc(id).set(data);
        
        setTitle(''); setType(''); setPrice(''); setLocation(''); setAddress('');
        setProductDesc(''); setNegotiable('');

        document.querySelector('.loader').style.display='none'
        document.querySelector('.holder-promo').style.display = 'none'
        // console.log('Added');
        // window.location.reload()
    }

    const handleSubmit = () => {
        addProduct()
    }

    return (
        <form>
            <div className="layout" style={{ marginTop: 0 }}>
                <div className="layout8">
                    <div className="title">
                        <h2>Sell Products</h2>
                    </div>
                    <div className="steps-shelfer">
                        <div className="dialogue">
                            <h4>Step 1 - Product Details</h4>
                            <div className="according-000">

                                <div className="infos">
                                    <button className="add-p">&#10133;</button><h2>Upload product image</h2>
                                </div>
                                <div className="add-images">
                                    {productImages.map(({ id, image }) => (
                                        <img key={id} src={image} alt="Product Images" />
                                    ))}
                                </div>
                                <div className="add-title">
                                    <input 
                                    value={title} 
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    type="text" placeholder="Title" />
                                </div>

                                <div className="Details">
                                    <textarea
                                    className="textarea"
                                    value={productDesc} 
                                    onChange={(e) => { setProductDesc(e.target.value) }}
                                    type="text" 
                                    placeholder="Details"></textarea>
                                </div>

                                <div className="selection">
                                    <div className="selector">
                                        <input type="text" placeholder="Category" />
                                        <div id="selecticon">&#10094;</div>
                                    </div>
                                    <div className="options">
                                        <ul>
                                            <option value="1">category</option>
                                            <option value="2">category</option>
                                            <option value="3">category</option>
                                            <option value="4">category</option>
                                            <option value="5">category</option>
                                            <option value="6">category</option>
                                        </ul>
                                    </div>
                                </div>

                                <div className="selection">
                                    <div className="selector">
                                        <input type="text" placeholder="Type" />
                                        <div id="selecticon">&#10094;</div>
                                    </div>
                                    <div className="options">
                                        <ul>
                                            <option value="1">Type</option>
                                            <option value="2">Type</option>
                                            <option value="3">Type</option>
                                            <option value="4">Type</option>
                                            <option value="5">Type</option>
                                            <option value="6">Type</option>
                                        </ul>
                                    </div>
                                </div>

                                <div className="selection">
                                    <div className="selector">
                                        <input type="text" placeholder="Location" />
                                        <div id="selecticon">&#10094;</div>
                                    </div>
                                    <div className="options">
                                        <ul>
                                            <option value="1">Location</option>
                                            <option value="2">Location</option>
                                            <option value="3">Location</option>
                                            <option value="4">Location</option>
                                            <option value="5">Location</option>
                                            <option value="6">Location</option>
                                        </ul>
                                    </div>
                                </div>

                                <div className="add-title">
                                    <input
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        type="text"
                                        placeholder="Address" />
                                </div>

                                <div className="add-title">
                                    <input
                                        value={price}
                                        onChange={(e) => { setPrice(e.target.value) }}
                                        type="text"
                                        placeholder="Price" />
                                </div>

                                <div className="system">
                                    <input
                                        checked={negotiable}
                                        onChange={() => setNegotiable(!negotiable)}
                                        type="checkbox" /> Negotiable
                            </div>

                                <button onClick={() => { document.querySelector('.holder-promo').style.display = 'block' }} type="button" className="nextbtn">Next</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="floater">
                    <div className="support"><span>Support</span>
                        <img src="images/support-icon.svg" alt="Ohyanga comment icon" />
                    </div>
                    <div className="scrolltotop">
                        <img src="images/Icon feather-chevron-down.svg" alt="scroll up / button" />
                    </div>
                </div>
                <div className="holder-promo">
                    <div className="promotion-board">
                        <h4>Step 2 - Promote Product</h4>
                        <div className="according-000">
                            <form>
                                <div className="freebtn-00">
                                    <div className="limitation" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>Free promotion<div className="active"></div></div>
                                </div>
                                <div className="s-p">
                                    <h5>Silver promotion</h5>
                                </div>
                                <div className="Silveropts">
                                    <div className="freebtn">
                                        <div className="price"><span>N1.560</span><div className="active"></div></div>
                                        <div className="limitation">5 days promotion</div>
                                    </div>
                                    <div className="freebtn">
                                        <div className="price"><span>N3,510</span><div className="active"></div></div>
                                        <div className="limitation">15 days promotion</div>
                                        <div className="tag"><span>Popular</span></div>
                                    </div>
                                    <div className="freebtn">
                                        <div className="price"><span>N5,820</span><div className="active"></div></div>
                                        <div className="limitation">30 days promotion</div>
                                    </div>
                                </div>
                                <button type="submit" className="nextbtn" onClick={(e) => { e.preventDefault(); handleSubmit() }}>Proceed</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProduct