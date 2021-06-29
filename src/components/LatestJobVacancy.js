import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { getDesc, UrlSlug } from '../fuctions'

function LatestJobVacancy() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    db.collection('Jobs')
      .onSnapshot((snapshot) => {
        let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
        setJobs(r)
      })
  }, [])

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
              <Link to={`/job?title=${UrlSlug(job?.title, 'encode')}`} >
                <div className="shopper-jv">
                  <div className="imgbox">
                    <div className="view-image-2">
                      {/* <img src="/images/signin img.png" alt="" className="images" /> */}
                      <img src={job?.jobImages ? job.jobImages[0]?.src : "/images/signin img.png"} alt="" className="images" />
                      <div className="verified">&#10004;</div>
                    </div>
                    <div className="details-00">
                      <h2>{job.title}</h2>
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
