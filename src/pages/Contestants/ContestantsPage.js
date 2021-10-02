import React from 'react'
// import { Link } from 'react-router-dom'

function ContestantsPage() {
  return (
    <div className="layout2" style={{ paddingBottom: 50 }}>
      <div className="accord-3">
        <div className="Caps">
          <h1>Face of Hairrrs 2021 Contestants</h1>
          <form>
            <input type="text" placeholder="search tag no" className="search-const" />
            <button type="submit">
              <div className="searchicon">
                <img src="images/search.png" alt="" />
              </div>
            </button>
            <hr style={{ width: 250 }} />
          </form>
          <div className="filter-00">
            <h5>Filter by</h5> ❢ <h3>Highest votes</h3>
          </div>
        </div>
        <div className="subcategories8" style={{ margin: '-12px', padding: 0 }}>
          <div className="shelf" style={{ marginBottom: '-30px' }}>



            <div className="shopper">
              <div className="imgbox">
                <div className="view-image-1">
                  <img src="images/signin img.png" className="images" alt="" />
                </div>
                <div className="details-0">
                  <h2>Classical Wig..</h2>
                  <div className="gh0">
                    <h>Age</h>-<h>23</h>
                    <br />
                    <h>Tag no</h>-<h>64000001</h>
                    <br />
                    <h>Country</h>-<h>Spain</h>
                    <br />
                    <span><h>see more</h></span>
                  </div>
                  <div className="vote-data">
                    <div className="clicks">
                      <span>
                        <button className="follow-click">
                          <h>423<span>Votes</span></h></button>
                      </span>
                    </div>
                    <button className="follow">Vote</button>
                    <div className="share">
                      <img src="images/Icon awesome-share-alt.svg" alt="share icon" />
                      <h>Share</h>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div >
    </div >

  )
}

export default ContestantsPage
