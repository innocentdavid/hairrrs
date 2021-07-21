import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
import ImageLib from '../../components/ImageLib';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import { getFormattedValue, makeid, UrlSlug } from '../../fuctions';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useHistory } from 'react-router-dom';
import LocationSearchInput from '../../components/LocationSearchInput';
import CurrencyField from '../../components/CustomizedInputField/CustomizedInputField';

function AddProduct() {
    var history = useHistory()
    var user = UserProfile.getUser()
    const params = new URLSearchParams(window.location.search);
    const [openLoading, setOpenLoading] = useState(false)

    const [productId, setProductId] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('edit')) {
            setOpenLoading(true)
            setProductId(params.get('edit'));
        }
    }, [])

    const [openImageLib, setOpenImageLib] = useState(false);
    const closeInsertImageModal = () => { setOpenImageLib(false) }

    const [categories, setCategories] = useState([])
    useEffect(() => {
        db.collection('productCategories')
            .onSnapshot((snapshot) => {
                let r = snapshot.docs.map(doc => doc.data())
                setCategories(r)
            })
    }, [])

    const [types, setTypes] = useState([])
    useEffect(() => {
        db.collection('productTypes')
            .onSnapshot((snapshot) => {
                let r = snapshot.docs.map(doc => doc.data())
                setTypes(r)
            })
    }, [])

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [rigion, setRigion] = useState('')
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
        let rigionCheck = check(rigion, '.rigionErrSection', 'You should set your rigion')
        let images = document.querySelector('.add-images').firstChild
        let imagesCheck = check(images, '.imagesErrSection', 'You have not added any image')

        if (imagesCheck && titleCheck && productDescCheck && rigionCheck && categoryCheck && typeCheck && priceCheck && addressCheck) { return true } else { alert(`An error has occured 😢, please fix the error and try again 😘`); return false }
    }

    const [productImages, setProductImages] = useState([])

    const addProduct = async () => {
        setOpenLoading(true)

        const getFV = await getFormattedValue(price, user?.currency?.symbol)
        console.log(price)

        if (productImages) {
            const data = {
                title,
                price: getFV,
                productDesc,
                seller: {
                    displayName: user?.displayName,
                    uid: user?.uid,
                    userName: user?.userName,
                    photoURL: user?.photoURL,
                    phoneNumber: user.phoneNumber
                },
                negotiable,
                type,
                rigion,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                category,
                productImages: productImages,
                promotion: 'Regular',
                country: 'Nigeria',
                address,
                quantity: 1,
                totalPageView: 0,
                currency: user?.currency?.symbol
            }

            if (params.has('edit')) {
                await db.collection('products').doc(params.get('edit')).update(data);
            } else {
                await db.collection('products').doc().set(data);
                await db.collection('users').doc(user?.uid).update({
                    totalProducts: firebase.firestore.FieldValue.increment(1),
                    totalEngagement: firebase.firestore.FieldValue.increment(1)
                })
            }

            setTitle(''); setType(''); setPrice(''); setRigion(''); setAddress('');
            setProductDesc(''); setNegotiable('');
            let hp = document.querySelector('.holder-promo')
            if (hp) {
                hp.style.display = 'none'
            }

            // window.location = `/product?title=${title && UrlSlug(title, 'encode')}`
            history.push(`/product?title=${title && UrlSlug(title, 'encode')}`)
            setOpenLoading(false)
        }
    }

    const handleSubmit = () => {
        addProduct()
    }

    // edit

    const setImageToList = async (id, src) => {
        let imgs = [];
        imgs.push({ id, src })
        let img = await imgs
        let a = [...productImages, ...img]
        setProductImages(a)
    }

    const removeImage = (id) => {
        let myArray = productImages.filter(function (obj) {
            return obj.id !== id;
        });
        setProductImages(myArray)
    }

    useEffect(() => {
        if (productId) {
            db.collection('products').doc(productId)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        let r = snapshot.data()

                        if (r.productImages) {
                            let data = []
                            r?.productImages?.forEach(img => {
                                data.push({
                                    id: makeid(5),
                                    src: img?.src
                                })
                            });
                            if (data) {
                                setProductImages(data)
                            }
                        }

                        setCategory(r.category)
                        setTitle(r.title)
                        setType(r.type)
                        setPrice(r.price?.slice(1).replace(/,/g, ''))
                        setProductDesc(r.productDesc)
                        setRigion(r.rigion)
                        setAddress(r.address)
                        setNegotiable(r.negotiable)
                    } else {
                        // history.push('/products')
                    }
                })
        }
    }, [productId])

    useEffect(() => {
        if (title) {
            setOpenLoading(false)
        }
    }, [title])


    return (
        <form>
            {openLoading && <div className="loader" style={{ display: 'grid' }}>
                <img src="/images/loading.svg" alt="" />
            </div>}

            {openImageLib && <ImageLib
                title={'Hairrs'}
                closeInsertImageModal={closeInsertImageModal}
                inserImgCaller='AddProduct'
                setImageToList={setImageToList}
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
                                <div className="add-images Product-add-images">
                                    {productImages?.map(({ id, src }) => (
                                        <div key={id} id={id} style={{ position: 'relative' }}>
                                            <span
                                                onClick={() => { removeImage(id) }}
                                                data-id={id} className="removeImage">+</span>
                                            <img className="jImg" src={src} alt="" />
                                        </div>
                                    ))}
                                </div>
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

                                <CustomSelectDropDown options={categories} setState={setCategory} dValue={category} label={'category'} />
                                <div className="categoryErrSection errSection"></div>
                                <br />

                                {/* types */}
                                <CustomSelectDropDown options={types} setState={setType} dValue={type} label={'type'} />
                                <div className="typeErrSection errSection"></div>
                                <br />

                                <div className="selection">
                                    <div className="selector">
                                        <input
                                            value={rigion}
                                            onChange={(e) => { document.querySelector('.rigionErrSection').textContent = ''; setRigion(e.target.value) }}
                                            type="text" placeholder="Rigion" />
                                        <div id="selecticon">&#10094;</div>
                                    </div>
                                </div>
                                <div className="rigionErrSection errSection"></div>

                                <div className="add-title">
                                    <LocationSearchInput
                                        setLocation={setAddress} />
                                    <span className="addressErrSection errSection"></span>
                                </div>

                                <div className="add-title">
                                    {params.has('edit') && price && <CurrencyField
                                        placeholder='Price'
                                        defaultValue={price}
                                        handleOnChange={setPrice}
                                        user={user}
                                    />}

                                    {!params.has('edit') && <CurrencyField
                                        placeholder='Price'
                                        defaultValue={price}
                                        handleOnChange={setPrice}
                                        user={user}
                                    />}
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