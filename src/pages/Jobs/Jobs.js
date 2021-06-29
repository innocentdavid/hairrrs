import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase';
import { getDesc, UrlSlug } from '../../fuctions';
import Filter from './Components/Filter';

function Jobs() {
  const [category, setcategory] = useState('all')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('category') || params.get('category') === '') {
      setcategory('all')
    } else {
      setcategory(params.get('category'))
    }
  }, [])

  const [jobs, setJobs] = useState([])
  useEffect(() => {
    if (category === 'all') {
      db.collection('Jobs')
        .onSnapshot((snapshot) => {
          let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
          setJobs(r)
        })
    } else {
      db.collection('Jobs')
        .where('catogory', '==', category)
        .onSnapshot((snapshot) => {
          let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
          setJobs(r)
        })
    }
  }, [category])

  return (
    <>
      <div>
        <div className="layout2a" style={{ paddingBottom: 40 }}>
          <div className="pages-timeline-auto">
            <pages>home &gt; Businesses &gt; {category}</pages>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              {jobs?.map(({ id, job }) => (
                < Link key={id} to={`/job?title=${job?.title && UrlSlug(job.title, 'encode')}`}>
                  <div className="shopper-jv">
                    <div className="imgbox">
                      <div className="view-image-2">
                        {job?.employer?.photoURL && <img src={job.employer.photoURL} className="images" alt="" />}
                        <div className="verified">✔</div>
                      </div>
                      <div className="details-00">
                        <h2>{job.title}</h2>
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
              <h1 style={{ fontSize: '2rem' }}><strong>...Static...</strong></h1>
            </div>

            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subcategories-jv">
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
            <div className="shelf-jv">
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
              <Link to=""><div className="shopper-jv">
                <div className="imgbox">
                  <div className="view-image-2">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                  <div className="details-00">
                    <h2>Hairstylists and braids</h2>
                    <info><i>A hairstylist is needed for immediate
                      employment at Ntu...</i></info>
                    <div className="time-location">
                      <img src="images/Icon material-access-time.png" className="time" alt="" />Full time
                      <img src="images/Icon material-location-searching.png" className="Location" alt="" />Lagos, Nigeria
                    </div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>
          </div>
          <div className="subcategories21">
            <div className="businesses-alert">
              <h3>businesses</h3>
              <div className="shelf">
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="businesses-profile.html" /><div className="shopper"><Link to="businesses-profile.html">
                </Link><div className="imgbox"><Link to="businesses-profile.html">
                  <div className="view-image-1">
                    <img src="images/signin img.png" className="images" alt="" />
                    <div className="verified">✔</div>
                  </div>
                </Link><div className="info-deck"><Link to="businesses-profile.html">
                </Link><div className="details-0"><Link to="businesses-profile.html">
                  <h2>Classical Wig..</h2>
                  <div className="star">
                    <div className="ratings-001">
                      <span>☆</span><span>☆</span><span>☆</span>
                    </div>
                  </div>
                </Link><div className="follows-data"><Link to="businesses-profile.html">
                </Link><Link to="#"><button className="followers">2.6k</button></Link>
                          <button className="follow">follow</button>
                        </div>
                      </div>
                      <div className="promo-validity">
                        <div className="goldpromotion">Gold promotion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="seemore-class" style={{ marginLeft: 38 }}>
            <Link to="businesses-page.html"><div className="seemore">see more</div></Link>
          </div>
        </div>


        <div className="layout5">
          <Filter />
        </div>
      </div>

    </>
  )
}

export default Jobs
