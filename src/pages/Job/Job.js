import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ItemOwner from '../../components/ItemOwner';
import WebShareApi from '../../components/WebShareApi';
import { SaveListContext } from '../../contexts/GlobalStore';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import { getFormattedValue, getMonthDateYearHour_minute, hasSaved, save, topFunction, Unsave, UrlSlug } from '../../fuctions';
import MyImage from '../../components/MyImage';
import UserProfile from '../../components/UserProfile/UserProfile';

function Job() {
  const user = UserProfile.getUser()

  var titleSlug;
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  if (!params.has('title')) {
    history.push('/jobs')
  } else {
    if (params.get('title') === '') {
      history.push('/jobs')
    } else {
      titleSlug = UrlSlug(params.get('title'), 'decode');
    }
  }

  if (!titleSlug) { history.push('/jobs') }

  const [saveList] = useContext(SaveListContext)

  const [job, setJob] = useState([])
  const [jobId, setJobId] = useState([])
  const [featuredImage, setFeaturedImage] = useState(null)

  // setJob setJobId setFeaturedImage
  useEffect(() => {
    db.collection('Jobs')
      .where('title', '==', titleSlug)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let id = snapshot.docs.map(doc => doc.id)
          setJobId(id[0])

          let job = snapshot.docs.map(doc => doc.data())
          setJob(job[0])
          if (job[0]?.jobImages) {
            setFeaturedImage(job[0]?.jobImages[0]?.src)
          }
        } else {
          history.push('/jobs')
        }
      })
  }, [history, titleSlug])

  const handleEditJob = () => {
    history.push(`/add-job?edit=${jobId}`)
  }

  const handleDeleteJob = async () => {
    if (jobId && await window.confirm('Are you sure?')) {
      db.collection('Jobs').doc(jobId).delete()
      history.push('/jobs')
    }
  }

  // set page viewed
  useEffect(() => {
    const setPageViewed = async () => {
      // const isAuthor = (a, b) => {
      //   if(a !== b){ return true }else { return false }
      // }
      const isAuthor = (a, b) => a === b ? true : false

      let employerId = job?.employer?.uid
      let cUserId = user?.uid

      if (employerId && cUserId) {
        var totalPageView = await document.querySelector('#totalPageViewSection');
        var pageUrl = await window.location.href;
        var storedPages = await JSON.parse(localStorage.getItem(pageUrl));
        let UpdatedViewCount = parseInt(totalPageView?.textContent) + 1

        if (
          storedPages === null
          && !isAuthor(employerId, cUserId)
          && totalPageView?.textContent
          && jobId
          && pageUrl
        ) {
          localStorage.setItem(pageUrl, JSON.stringify(pageUrl));
          document.querySelector('#totalPageViewSection').textContent = UpdatedViewCount
          db.collection('Jobs').doc(jobId).update({ totalPageView: firebase.firestore.FieldValue.increment(1) })

          db.collection('users').doc(job?.employer?.uid).update({
            totalEngagement: firebase.firestore.FieldValue.increment(1)
          })

        }
      }
    }
    return () => { setPageViewed() }
  }, [jobId, job, user])
  // localStorage.removeItem(window.location.href)

  if (job.title) {
    return (
      <div className="layout" style={{ marginTop: '38px' }}>
        <div className="adv">
          <div className="albert">
            <div className="layout2a" style={{ paddingBottom: 40, marginBottom: 16 }}>
              <div className="according">
                <div className="pages-timeline">
                  <pages>home &gt; job vacancy &gt; {job?.title}</pages>
                </div>
                <div className="image-view">
                  {featuredImage &&
                    <MyImage
                      src={featuredImage}
                      width='510px'
                      height='458px'
                      alt=""
                      className=""
                    />
                  }
                </div>
                {featuredImage && <div className="arrows">
                  <Link className="prev">{'❮'}</Link>
                  <Link className="next">{'❯'}</Link>
                </div>}
                <div className="images-view-1">
                  {job?.jobImages && job?.jobImages.map(({ src }) => (

                    <img
                      onClick={(e) => { setFeaturedImage(e.target.src) }}
                      key={src}
                      src={src}
                      style={{ width: 60, height: 60 }}
                      alt="" />
                  ))}
                </div>

                <div className="reviews">
                  {job?.employer?.uid !== user?.uid ?
                    <Link to={`/apply?apply-for=${job?.title && UrlSlug(job?.title, 'encode')}`} className="views-container-2"
                    // onClick={() => { alert('Your request has been sent and you\'ll be contacted soon') }}
                    style={{ cursor: 'pointer' }}>
                    <div className="applybtn" onClick={()=>{topFunction()}}>
                      <img src="images/applybtn.png" style={{ marginRight: 10 }} alt="" />
                      Apply
                    </div>
                  </Link> :
                  <Link to={`/jobVacancyResponses?jobId=${jobId}&jobTitle=${job?.title}`} className="views-container-2" style={{ cursor: 'pointer' }}>
                  <div className="applybtn" onClick={()=>{topFunction()}}>
                    <img src="images/applybtn.png" style={{ marginRight: 10 }} alt="" />
                    View responses
                  </div>
                </Link>
                  }

                  <div className="report-1">
                    {/* share */}
                    <div className="reach" style={{ position: 'relative', marginLeft: 10 }}>
                      <WebShareApi url={`ntutu-fdb00.web.app/job?title=${job?.title && UrlSlug(job?.title, 'encode')}`} title={job?.title} text={`${job?.title} \n \n`} />
                    </div>

                    {/* save */}
                    <div style={{ marginLeft: 10 }} className="reach">{hasSaved(saveList, jobId) ?
                      <button
                        onClick={() => { Unsave(jobId) }}
                        className="btnSolid"
                        style={{ display: 'flex' }}>
                        <div className="icon">
                          <img src="/images/circle-arrow-down-color.svg" alt="" />
                        </div>
                        <div className="text">&nbsp;saved</div>
                      </button>
                      : <button onClick={() => { save(jobId, job?.jobImages[0]?.src, job.title, `/job?title=${job?.title && UrlSlug(job?.title, 'encode')}`, 'job') }} style={{ display: 'flex' }}>
                        <div className="icon">
                          <img src="/images/saturday save icon.svg" alt="" />
                        </div>
                        <div className="text">save</div>
                      </button>}
                    </div>

                    {auth.currentUser?.displayName === job?.employer?.displayName ?
                      <div className="d-flex" style={{ marginLeft: '10px' }}>
                        <button onClick={handleEditJob} title="Edit Job" className="fa fa-pencil mr-1"></button>
                        <button onClick={handleDeleteJob} title="Delete Job" className="fa fa-trash"></button>
                      </div> :
                      <div className="report-product-1">
                        <img src="images/reportwt.png" alt="" />
                        Report
                      </div>
                    }
                  </div>
                </div>

                <div className="ratings-1">
                  <div className="details">
                    <h2>{job?.title} Needed</h2>
                    <span className={"price"}>{job?.salary && getFormattedValue(job?.salary, job?.currency)}</span>
                  </div>
                  <hr />
                  <div className="details-1">
                    <h3>Details</h3>
                    <info>{job?.jobDesc}
                    </info>
                    <div className="post-infos">
                      <h2>Posted</h2><info>{job?.createdAt && getMonthDateYearHour_minute(job?.createdAt)}</info>
                      <h2>salary plan</h2><info>{job?.salaryPlan}</info>
                      <h2>Type</h2><info>{job?.type}</info>
                      <h2>Location</h2><info>{job?.location}</info>
                      <h2>Address</h2><info>{job?.address}</info>
                      <a
                        href={`https://maps.google.com?q=${job?.lat_log}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="locate-icon">
                        <img src="/images/location-icon.svg" alt="locate icon ohyanga" />
                        <span>Locate</span>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/apply?apply-for=${job?.title && UrlSlug(job?.title, 'encode')}`} className="views-container-2 mt-2"
                    // onClick={() => { alert('Your request has been sent and you\'ll be contacted soon') }}
                    style={{ cursor: 'pointer' }}>
                    <div className="applybtn" onClick={()=>{topFunction()}}>
                      <img src="images/applybtn.png" style={{ marginRight: 10 }} alt="" />
                      Apply
                    </div>
                  </Link>


              </div>
            </div>
          </div>

          <ItemOwner userId={job?.employer?.uid} />

        </div>
      </div>
    )
  } else {
    return (<div style={{
      width: '100%',
      height: '100vh',
      marging: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '100px',
    }}>
      Loading...
    </div>)
  }
}

export default Job
