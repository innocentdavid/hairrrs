import React, { useState } from 'react'
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import ImageLib from '../../components/ImageLib';

function AddProduct() {
    const [openImageLib, setOpenImageLib] = useState(false);
    const closeInsertImageModal = () => { setOpenImageLib(false) }

    const [categories, setCategories] = useState([])

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [negotiable, setNegotiable] = useState(false)

    const check = (data, errSection, error) => {
        if (data !== '' && data !== null && data) { 
            document.querySelector(errSection).textContent = ''; 
            return true 
        } else {
            document.querySelector(errSection).textContent = error;
            return false
        }
    }

    const checkInputs = () => {
        let titleCheck = check(title, '.titleErrSection', 'Title has not been set!')
        let productDescCheck = check(productDesc, '.productDescErrSection', 'You should set a description for your product')
        let categoryCheck = check(category, '.categoryErrSection', 'You should set a category for your product')
        let typeCheck = check(type, '.typeErrSection', 'You should set a type for your product')
        let priceCheck = check(price, '.priceErrSection', 'You should set a price for your product')
        let addressCheck = check(address, '.addressErrSection', 'You should set an address')
        let locationCheck = check(location, '.locationErrSection', 'You should set your location')
        let images = document.querySelector('.add-images').firstChild
        let imagesCheck = check(images, '.imagesErrSection', 'You have not added any image')

        if (imagesCheck && titleCheck && productDescCheck && locationCheck && categoryCheck && typeCheck && priceCheck && addressCheck) { return true } else { alert(`An error has occured 😢, please fix the error and try again 😘`); return false }
    }

    const addProduct = async () => {
        let loader = document.querySelector('.loader')
        if (loader) { loader.style.display = 'grid' }


        let id = title.replace(/\s+/g, '-');

        let addImagesFirstChild = document.querySelector('.add-images').firstChild
        var featuredImage = '';
        if (addImagesFirstChild) { featuredImage = addImagesFirstChild.src }

        let productImagesC = []
        let pImgs = document.querySelectorAll('.pImg')
        if (pImgs) {
            pImgs.forEach(img => {
                productImagesC.push(img?.src)
            });
        }
        let productImages = productImagesC;

        const data = {
            id,
            title,
            price,
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
            productImages,
            promotion: 'Regular',
            country: 'Nigeria',
            address: 'Lagos Island(Eko), Lagos Nigeria',
            phone: '+234 811 265 904',
        }
        
        await db.collection('products').doc(id).set(data);
        window.location=`/product?title=${id}`

        setTitle(''); setType(''); setPrice(''); setLocation(''); setAddress('');
        setProductDesc(''); setNegotiable('');

        document.querySelector('.loader').style.display = 'none'
        document.querySelector('.holder-promo').style.display = 'none'


        // console.log('Added');
    }

    const handleSubmit = () => {
        addProduct()
    }

    return (
        <form>
            <div className="loader">
                <img src="/images/loading.svg" alt="" />
            </div>
            {openImageLib && <ImageLib
                title={'Hairrs'}
                closeInsertImageModal={closeInsertImageModal}
                inserImgCaller = 'AddProduct'
            />}

            <div className="layout" style={{ marginTop: 0 }}>
                <div className="layout8">
                    <div className="title">
                        <h2>Sell Products</h2>
                    </div>
                    <div className="steps-shelfer">
                        <div className="dialogue">
                            <h4>Step 1 - Product Details</h4>
                            <div className="according-000">

                                <div className="infos" onClick={(e) => { e.preventDefault(); setOpenImageLib(true) }}>
                                    <button className="add-p">&#10133;</button><h4>Upload product image (first image is will be the featured image)</h4>
                                </div>
                                <div className="imagesErrSection errSection"></div>
                                {/* product images */}
                                <div className="add-images"></div>
                                {/* product images */}
                                <div className="add-title">
                                    <input
                                        value={title}
                                        onChange={(e) => { document.querySelector('.titleErrSection').textContent = ''; setTitle(e.target.value) }}
                                        type="text" placeholder="Title" />
                                    <div className="titleErrSection errSection"></div>
                                </div>

                                <div className="Details">
                                    <textarea
                                        className="textarea"
                                        value={productDesc}
                                        onChange={(e) => { document.querySelector('.productDescErrSection').textContent = ''; setProductDesc(e.target.value) }}
                                        type="text"
                                        placeholder="Details"></textarea>
                                    <div className="productDescErrSection errSection"></div>
                                </div>

                                <div className="selection">
                                    <div className="selector">
                                        <input
                                            value={category}
                                            onChange={(e) => { document.querySelector('.categoryErrSection').textContent = ''; setCategory(e.target.value) }}
                                            type="text" placeholder="Category" />
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
                                <div className="categoryErrSection errSection"></div>

                                <div className="selection">
                                    <div className="selector">
                                        <input
                                            value={type}
                                            onChange={(e) => { document.querySelector('.typeErrSection').textContent = ''; setType(e.target.value) }}
                                            type="text" placeholder="Type" />
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
                                <div className="typeErrSection errSection"></div>

                                <div className="selection">
                                    <div className="selector">
                                        <input
                                            value={location}
                                            onChange={(e) => { document.querySelector('.locationErrSection').textContent = ''; setLocation(e.target.value) }}
                                            type="text" placeholder="Location" />
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
                                <div className="locationErrSection errSection"></div>

                                <div className="add-title">
                                    <input
                                        value={address}
                                        onChange={(e) => { document.querySelector('.addressErrSection').textContent = ''; setAddress(e.target.value) }}
                                        type="text"
                                        placeholder="Address" />
                                    <span className="addressErrSection errSection"></span>
                                </div>

                                <div className="add-title">
                                    <input
                                        value={price}
                                        onChange={(e) => { document.querySelector('.priceErrSection').textContent = ''; setPrice(e.target.value) }}
                                        type="text"
                                        placeholder="Price" />
                                    <div className="priceErrSection errSection"></div>
                                </div>

                                <div className="system">
                                    <input
                                        checked={negotiable}
                                        onChange={() => setNegotiable(!negotiable)}
                                        type="checkbox" /> Negotiable
                            </div>

                                <button onClick={() => { if (checkInputs()) { document.querySelector('.holder-promo').style.display = 'block' } }} type="button" className="nextbtn">Next</button>

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







                {/* step 2 */}










                <div className="holder-promo">
                    <div className="promotion-board" style={{ position: 'relative' }}>
                        <h4>Step 2 - Promote Product</h4>
                        <div
                            onClick={() => { document.querySelector('.holder-promo').style.display = 'none' }}
                            style={{ position: 'absolute', top: 5, right: 30, color: 'white', fontSize: '1.7rem', transform: 'rotate(45deg)', cursor: 'pointer' }}>+</div>
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