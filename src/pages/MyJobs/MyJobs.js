import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserProfile from '../../components/UserProfile/UserProfile'
import { db } from '../../firebase'
import { getDesc, UrlSlug } from '../../fuctions'
import Filter from '../Jobs/Components/Filter'

function MyJobs() {
  const user = UserProfile.getUser()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (user) {
      db.collection('Jobs')
        .where('employerId', '==', user?.uid)
        .onSnapshot(snapshot => {
          if (!snapshot.empty) {
            let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
            setJobs(r)
          }
        })
    }
  }, [user])
  return (
    <div>
      <div className="layout2a" style={{ paddingBottom: 40 }}>
        <div className="pages-timeline-auto">
          <pages>home &gt; My Jobs</pages>
        </div>
        <div className="subcategories-jv">
          <div className="shelf-jv">

            {jobs?.map(({ id, job }) => (
              < Link key={id} to={`/job?title=${job?.title && UrlSlug(job?.title, 'encode')}`}>
                <div className="shopper-jv">
                  <div className="imgbox">
                    <div className="view-image-2">
                      {job?.employer?.photoURL && <img src={job.employer.photoURL} className="images" alt="" />}
                      <div className="verified">✔</div>
                    </div>
                    <div className="details-00">
                      <h2>{job.title} Needed</h2>
                      <info><i>{job && job?.jobDesc && getDesc(job?.jobDesc, 65)}</i></info>
                      <div className="time-location">
                        <img src="images/Icon material-access-time.png" className="time" alt="" />{job?.type}
                        <img src="images/Icon material-location-searching.png" className="Location" alt="" />{job?.location}
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">{job?.promotion}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
          <br />
          <br />
        </div>

        {/* <div className="seemore-class" style={{ marginLeft: 38 }}>
          <Link to="businesses-page.html"><div className="seemore">see more</div></Link>
        </div> */}
      </div>


      <div className="layout5">
        <Filter />
      </div>
    </div>
)
}

export default MyJobs
