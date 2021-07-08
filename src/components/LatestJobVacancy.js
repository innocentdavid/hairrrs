import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { getDesc, topFunction, UrlSlug } from '../fuctions'
import MyImage from './MyImage';

function LatestJobVacancy() {
  const [jobs, setJobs] = useState([])

  let storageId = 'latestJobVacancy'
  const storedArticles = localStorage.getItem(storageId)
  useEffect(() => {
    if (storedArticles) {
      const data = JSON.parse(storedArticles)
      setJobs(data)
    }
  }, [storedArticles])

  useEffect(() => {
    db.collection('Jobs')
    .orderBy('createdAt', 'desc')
    .limit(8)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
          setJobs(r)
          localStorage.setItem(storageId, JSON.stringify(r));
        }
      })
  }, [storageId])

  return (
    <div className="layout3">
      <div className="subcategories9">
        <div className="trenz">
          <h1>Job vacancies</h1>
        </div>

        <div className="shelf-jv">
          {/* jv */}
          {jobs && jobs.map(({ id, job }) => (
            <div className="jv" key={id}>
              <Link 
              onClick={() => { topFunction() }}
              to={`/job?title=${UrlSlug(job?.title, 'encode')}`} 
              >
                <div className="shopper-jv">
                  <div className="imgbox">
                    <div className="view-image-2">
                      {/* <img src="/images/signin img.png" alt="" className="images" /> */}
                      <MyImage
                            src={job?.jobImages ? job.jobImages[0]?.src : "/images/signin img.png"}
                            width= ''
                            height=''
                            alt=""
                            className="images"
                            />
                      <div className="verified">&#10004;</div>
                    </div>
                    <div className="details-00">
                      <h2>{job.title} Needed</h2>
                      <span className="info"><i>{getDesc(job?.jobDesc, 65)}</i></span>

                      <div className="time-location">
                        <img src="/images/Icon material-access-time.png" alt="" className="time" />{job.type}
                        <img src="/images/Icon material-location-searching.png" alt="" className="Location" />{job.location}
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">{job.promotion}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {/* jv */}
        </div>

        <div className="seemore-class">
          <Link to="/jobs?category=all" ><div className="seemore">see more</div></Link>
        </div>
      </div>
    </div>
  )
}

export default LatestJobVacancy
