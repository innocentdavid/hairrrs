import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserProfile from '../../components/UserProfile/UserProfile'
import { db } from '../../firebase'

function Contestant() {
  const user = UserProfile.getUser()
  const [loading, setLoading] = useState(false)
  const [contestantAccount, setContestantAccount] = useState([])

  useEffect(() => {
    setLoading(true)
    db.collection('contestants').doc(user?.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setContestantAccount(snapshot.data())
        }
      })
    setLoading(false)
  }, [user])

  const [products, setProducts] = useState([])
  const [jobs, setJobs] = useState([])
  const [articles, setArticles] = useState([])
  const limit = 6

  useEffect(() => {
    db.collection('products')
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let r = snapshot.docs.map(doc => ({ productId: doc.id, product: doc.data() }))
          setProducts(r)
        }
      })
  }, [])

  useEffect(() => {
    db.collection('Jobs')
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let r = snapshot.docs.map(doc => ({ jobId: doc.id, job: doc.data() }))
          setJobs(r)
        }
      })
  }, [])

  useEffect(() => {
    db.collection('articles')
      .limit(3)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let r = snapshot.docs.map(doc => ({ articleId: doc.id, article: doc.data() }))
          setArticles(r)
        }
      })
  }, [])

  return (<>
    <div className="layout2">

      {loading && <div className="loader" style={{ display: 'grid' }}>
        <img src="/images/loading.svg" alt="" />
      </div>}

      <div className="accord-4">
        <div className="contestant-profile">
          <div className="imagedata">
            <div className="image-display">
              {contestantAccount?.photoUrl && <img src={contestantAccount?.photoUrl} width="100%" height="100%" alt="" />}
              {/* <img src={contestantAccount?.photoUrl} alt="" /> */}
            </div>
            <div className="report">Leave Contest/Report Constestant</div>
            <div className="share">
              <img src="images/Icon awesome-share-alt.svg" alt="" className="image-icon" />
              <h>Share</h>
            </div>
          </div>
          <div className="infos-data">
            <div className="data">
              Name - <h>{contestantAccount?.name}</h>
            </div>
            <div className="data">
              Gender - <h>{contestantAccount?.gender}</h>
            </div>
            <div className="data">
              Age - <h>{contestantAccount?.age}</h>
            </div>
            <div className="data">
              Natural hair color - <h>{contestantAccount?.naturalHairColor}</h>
            </div>
            <div className="data" style={{ height: 80 }}>
              Hobbies - <h>{contestantAccount?.hobbies}</h>
            </div>
            <div className="data">
              Country - <h>{contestantAccount?.country}</h>
            </div>
            <div className="data">
              State - <h>{contestantAccount?.state}</h>
            </div>
            <div className="socials">
              {/* <a href={`/${contestantAccount?.instagramAccountLink}`} target="_blank" rel="noopener noreferrer" className="insta"> */}
              <a href={`https://${contestantAccount?.instagramAccountLink}`} target="_blank" rel="noreferrer noopener" className="insta">
                <div className="social-title">
                  view on instagram
                </div>
                <div className="logo-insta">
                  <img src="images/Icon feather-instagram.svg" alt="instagram icon" />
                </div>
              </a>
              <Link to={`/profile?userName=${contestantAccount?.userName}`} className="insta">
                <div className="social-title">
                  view on Ohyanga
                </div>
                <div className="logo-insta">
                  <img src="images/logo black.svg" alt="instagram icon" />
                </div>
              </Link>
            </div>
            <div className="votes"><vote>vote - {contestantAccount?.voteCount} votes</vote></div>
          </div>
        </div>
      </div>
    </div>




    <div className="layout3">
      <div className="related">
        <div className="products">
          <div className="trenz">
            <h1>Featured products</h1>
          </div>
          <div className="shelf">

            {products?.map(({ productId, product }) => (
              <div className="shopper">
                <div className="imgbox">
                  <img src="images/nutless braid.png" className="images" alt="" />
                  <div className="details">
                    <h2>{product?.title}</h2>
                    <price>{product?.price}</price>
                    <div className="seller">{product?.seller?.userName}</div>
                    <div className="promo-validity">
                      <div className="goldpromotion">Gold promotion</div>
                      <img src="images/circle-arrow-down-color.svg" className="group84" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="seemore-class">
              <a href="products-page.html"><div className="seemore">see more</div></a>
            </div>
          </div>
        </div>


        <div className="subcategories9" style={{ margin: 0, padding: 0 }}>
          <div className="trenz">
            <h1>Featured Job vacancies</h1>
          </div>
          <div className="shelf-jv-inline">

            {jobs?.map(({ jobId, job }) => (
              <div key={jobId} className="shopper">
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
              </div>
            ))}

            <div className="seemore-class">
              <a href="jobvacancies-page.html"><div className="seemore">see more</div></a>
            </div>
          </div>
        </div>


        <div className="subcategories" style={{ margin: 0, padding: 0 }}>
          <div className="trenz">
            <h1>Featured Articles</h1>
          </div>
          <div className="shelf">

            {articles?.map(({ articleId, article }) => (
              <a href="Articles-post.html"><div className="shopper5">
                <div className="user-display">
                  <img src="images/user.png" alt="" />
                  <span className="tooltiptext">Chizzyfix</span>
                </div>
                <div className="imgbox1">
                  <img src="images/nutless braid.png" alt="" />
                  <div className="details1">
                    <h2>How to braid hair in 3 minutes. 6steps<promo>- Promoted</promo></h2>
                    <div className="informations">
                      <info>Full matching frontal hair lasts for 10years can be dyed, washed and ironed Show Contact...</info>
                      <div className="artc-2">
                        <div className="categories-filter">
                          <i><info>Hair and beauty</info>
                            <h3>February 10</h3></i>
                        </div>
                      </div>
                      <div className="comments-thumbs">
                        <views>423</views>
                        <h2>Likes</h2>
                        <views>18</views>
                        <h2>Dislikes</h2>
                        <views>675</views>
                        <h2>Comments</h2>
                        <img src="images/circle-arrow-down-color.svg" style={{ marginTop: '-5px', width: 20, height: 20 }} className="save-icon" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div></a>
            ))}

            <div className="seemore-class">
              <a href="Articles-page.html"><div className="seemore">see more</div></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Contestant
