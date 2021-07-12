import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import ImageLib from '../../components/ImageLib';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import { useHistory } from 'react-router-dom';
import { UrlSlug } from '../../fuctions';
import Attachment from './Components/Attachment';
import CurrencyField from '../../components/CustomizedInputField/CustomizedInputField';
import UserProfile from '../../components/UserProfile/UserProfile';

function AddJob() {
    const user = UserProfile.getUser()

    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    const [openLoading, setOpenLoading] = useState(false)

    const [jobId, setJobId] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('edit')) {
            setOpenLoading(true)
            setJobId(params.get('edit'));
        }
    }, [])

    const [openImageLib, setOpenImageLib] = useState(false);
    const closeInsertImageModal = () => { setOpenImageLib(false) }

    const [categories, setCategories] = useState([])
    useEffect(() => {
        db.collection('jobCategories')
            .onSnapshot((snapshot) => {
                let r = snapshot.docs.map(doc => doc.data())
                setCategories(r)
            })
    }, [])

    const [types, setTypes] = useState([])
    useEffect(() => {
        db.collection('jobTypes')
            .onSnapshot((snapshot) => {
                let r = snapshot.docs.map(doc => doc.data())
                setTypes(r)
            })
    }, [])

    const [category, setCategory] = useState('')
    const [salaryPlans, setSalaryPlans] = useState([])
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [salaryPlan, setSalaryPlan] = useState('')
    const [salary, setSalary] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [negotiable, setNegotiable] = useState(false)

    useEffect(() => {
        db.collection('salaryPlans')
            .onSnapshot((snapshot) => {
                setSalaryPlans(snapshot.docs.map(doc => doc.data()))
            })
    }, [])

    // const check = (data, errSection, error) => {
    //     if (data !== '' && data !== null && data) {
    //         document.querySelector(errSection).textContent = '';
    //         return true
    //     } else {
    //         document.querySelector(errSection).textContent = error;
    //         return false
    //     }
    // }

    // const checkInputs = () => {
    //     let titleCheck = check(title, '.titleErrSection', 'Title has not been set!')
    //     let categoryCheck = check(category, '.categoryErrSection', 'You should set a category for your product')
    //     let typeCheck = check(type, '.typeErrSection', 'You should set a type for your product')
    //     let addressCheck = check(address, '.addressErrSection', 'You should set an address')
    //     let locationCheck = check(location, '.locationErrSection', 'You should set your location')
    //     let images = document.querySelector('.add-images').firstChild
    //     let imagesCheck = check(images, '.imagesErrSection', 'You have not added any image')
    //     let jobDescCheck = check(jobDesc, '.jobDescErrSection', 'You should set a description for your product')

    //     if (imagesCheck && jobDescCheck && titleCheck && locationCheck && categoryCheck && typeCheck && addressCheck) { return true } else { alert(`An error has occured 😢, please fix the error and try again 😘`); return false }
    // }

    const [jobImages, setJobImages] = useState([])

    const [showForm, setShowForm] = useState(true)
    const [questions, setQuestions] = useState([])

    const addProduct = async () => {
        setOpenLoading(true)

        const data = {
            title,
            jobDesc,
            employer: { displayName: auth.currentUser?.displayName, uid: auth.currentUser?.uid, photoURL: auth.currentUser?.photoURL },
            salaryPlan,
            salary,
            negotiable,
            type,
            location,
            lat_log: `${user?.latitude},${user?.longitude}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            category,
            jobImages,
            promotion: 'Regular',
            country: user?.country_name,
            address,
            totalPageView: 0,
            showForm,
            questions,
            currency: user?.currency?.symbol
        }

        if (params.has('edit')) {
            await db.collection('Jobs').doc(params.get('edit')).update(data);
        } else {
            await db.collection('Jobs').doc().set(data);
            await db.collection('users').doc(user?.uid).update({ totalJobs: firebase.firestore.FieldValue.increment(1) })
        }

        
        let holderPpromo = document.querySelector('.holder-promo')
        if(holderPpromo) {holderPpromo.style.display = 'none'}
        
        setOpenLoading(false)
        history.push(`/job?title=${UrlSlug(title, 'encode')}`)


        // setTitle(''); setType(''); setLocation(''); setAddress('');
        // setSalaryPlan(''); setSalary(''); setJobDesc(''); setNegotiable('');
    }

    const handleSubmit = () => {
        addProduct()
    }

    // edit

    const setImageToList = async (id, src) => {
        let imgs = [];
        imgs.push({ id, src })
        let img = await imgs
        let a = [...jobImages, ...img]
        if (a) {
            setJobImages(a)
        }
    }

    const removeImage = (id) => {
        let myArray = jobImages.filter(function (obj) {
            return obj.id !== id;
        });
        setJobImages(myArray)
    }


    // edit

    useEffect(() => {
        if (jobId) {
            db.collection('Jobs').doc(jobId)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        let r = snapshot.data()

                        if (r?.jobImages) {
                            setJobImages(r?.jobImages)
                        }

                        if(r?.questions){
                            setQuestions(r?.questions)
                        }

                        setCategory(r?.category)
                        setTitle(r?.title)
                        setType(r?.type)
                        setLocation(r?.location)
                        setAddress(r?.address)
                        setSalaryPlan(r?.salaryPlan)
                        setSalary(r?.salary)
                        setJobDesc(r?.jobDesc)
                        setNegotiable(r?.negotiable)
                    } else {
                        history.push('/jobs')
                    }
                })
        }
    }, [history, jobId])

    // set loading off
    useEffect(() => {
        if (title) {
            setOpenLoading(false)
        }
    }, [title])


    return (
        <div className="layout" style={{ marginTop: 0 }}>
            {openLoading && <div className="loader" style={{ display: 'grid' }}>
                <img src="/images/loading.svg" alt="" />
            </div>}

            {openImageLib && <ImageLib
                title={'Hairrs'}
                closeInsertImageModal={closeInsertImageModal}
                inserImgCaller='AddJob'
                setImageToList={setImageToList}
            />}

            <div className="layout8">
                <div className="title">
                    <h2>Sell Products</h2>
                </div>
                <div className="steps-shelfer">
                    <div className="dialogue">
                        <h4>Step 1 - Vacancy Details</h4>
                        <div className="according-000">
                            <div className="infos" onClick={(e) => { e.preventDefault(); setOpenImageLib(true) }}>
                                <button className="add-p">&#10133;</button><h4>Upload product image (first image is will be the featured image)</h4>
                            </div>
                            {/* job images */}
                            <div className="add-images Job-add-images">
                                {jobImages?.map(({ id, src }) => (
                                    <div key={id} id={id} style={{ position: 'relative' }}>
                                        <span
                                            onClick={() => { removeImage(id) }}
                                            data-id={id} className="removeImage">+</span>
                                        <img className="jImg" src={src} alt="" />
                                    </div>
                                ))}
                            </div>
                            {/* job images */}
                            <div className="add-title">
                                <input
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    type="text" placeholder="Title" />
                            </div>

                            {/* Job description */}
                            <div className="Details">
                                <textarea
                                    className="textarea"
                                    value={jobDesc}
                                    onChange={(e) => { setJobDesc(e.target.value) }}
                                    type="text" placeholder="Job description"></textarea>
                            </div>

                            {/* salary plan */}
                            <CustomSelectDropDown options={salaryPlans} setState={setSalaryPlan} dValue={salaryPlan} label={'salary plan'} />

                            <div className="add-title">
                                {params.has('edit') && salary && <CurrencyField
                                    placeholder='Salary'
                                    defaultValue={salary}
                                    handleOnChange={setSalary}
                                    user={user}
                                />}

                                {!params.has('edit') && <CurrencyField
                                    placeholder='Salary'
                                    defaultValue={salary}
                                    handleOnChange={setSalary}
                                    user={user}
                                />}
                            </div>

                            {/* categories */}
                            <CustomSelectDropDown options={categories} setState={setCategory} dValue={category} label={'category'} />

                            <br />

                            {/* types */}
                            <CustomSelectDropDown options={types} setState={setType} dValue={type} label={'type'} />

                            <div className="selection">
                                <div className="selector">
                                    <input
                                        value={location}
                                        onChange={(e) => { setLocation(e.target.value) }}
                                        type="text" placeholder="Location" />
                                    <div id="selecticon">&#10094;</div>
                                </div>
                            </div>

                            <div className="add-title">
                                <input
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                    type="text"
                                    placeholder="Address" />
                            </div>

                            <div className="system">
                                <input
                                    checked={negotiable}
                                    onChange={() => setNegotiable(!negotiable)}
                                    type="checkbox" /> Negotiable
                            </div>

                            <br />

                            <Attachment
                                questions={questions} setQuestions={setQuestions}
                                showForm={showForm} setShowForm={setShowForm} />

                            <button onClick={() => {
                                handleSubmit()
                                // document.querySelector('.holder-promo').style.display = 'block'
                            }} type="button" className="nextbtn">Next</button>

                        </div>
                    </div>
                </div>
            </div>


            <div className="holder-promo">
                <div className="promotion-board">
                    <h4>Step 2 - Promote Product</h4>
                    <div className="according-000">
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
                        <button type="button" className="nextbtn"
                        // onClick={(e) => { e.preventDefault(); handleSubmit() }}
                        >Proceed</button>
                    </div>
                </div>
            </div>

            <br />
            <br />
        </div>


    )
}

export default AddJob
