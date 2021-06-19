import React from 'react'

function Analystics({ setShowAnalystics }) {
  return (
    <div className="Analystics">
      <div className="close" onClick={() =>{ setShowAnalystics(false) }}>&times;</div>
      <div className="container">
        <div className="title">Analystics - <date>January 2021</date></div>
        <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
        <div className="stats">
          <div className="containment">
            <div className="recent-month">
              <ul>
                <div className="percentages-total">
                  <div className="views">
                    <li>views -</li><counts>239</counts>
                  </div>
                  <div className="total">
                    <total>-88%</total>
                  </div>
                </div>
                <div className="percentages">
                  <li>Products -</li><counts>33%</counts>
                </div>
                <div className="percentages">
                  <li>Businesses -</li><counts>24%</counts>
                </div>
                <div className="percentages">
                  <li>Job vacancies -</li><counts>39%</counts>
                </div>
                <div className="percentages">
                  <li>Articles -</li><counts>29%</counts>
                </div>
              </ul>
            </div>
            <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
            <div className="previous-month">
              <h2>Previous month:</h2>
              <ul>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>views -</li><counts>239</counts>
                    </div>
                    <div className="total">
                      <total>+88%</total>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <hr style={{ marginTop: '-30px', border: '1px solid #f9f9f9' }} />
            <div className="title-stats">
              <h1>Gender</h1>
            </div>
            <div className="percentages-total" style={{ padding: '20px', paddingTop: 0 }}>
              <div className="holder-23">
                <div className="views">
                  <graph>add graph here</graph>
                </div>
              </div>
            </div>
          </div>
          <div className="containment">
            <div className="title-stats">
              <h1>Gift bar</h1>
            </div>
            <div className="percentages-total" style={{ padding: '20px', paddingTop: 0, paddingBottom: 0 }}>
              <div className="holder-23">
                <div className="views">
                  <graph>add graph here</graph>
                </div>
              </div>
            </div>
            <div className="recent-month">
              <ul>
                <div className="percentages">
                  <li>Progress -</li><counts>23.7%</counts>
                </div>
              </ul>
            </div>
          </div>
          <div className="containment">
            <div className="previous-month">
              <ul>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>Follows -</li><counts>1275</counts>
                    </div>
                    <div className="total">
                      <total>+65%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>Unfollows -</li><counts>11</counts>
                    </div>
                    <div className="total">
                      <total>-688%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>Message requests -</li><counts>10</counts>
                    </div>
                    <div className="total">
                      <total>-58%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>Shares -</li><counts>15</counts>
                    </div>
                    <div className="total">
                      <total>+208%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-23">
                    <div className="views">
                      <li>Verified follows -</li><counts>5</counts>
                    </div>
                    <div className="total">
                      <total>0%</total>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div className="ratingsbtn" style={{ width: '300px', margin: 'auto', marginBottom: '30px' }}>
              <div className="middler">
                <div className="okstars">
                  <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                </div>
                <div className="rates">
                  <views>2.6</views><h9>Ratings<rates>(13)</rates></h9>
                </div>
              </div>
            </div>
          </div>
          <div className="containment">
            <div className="title-stats">
              <h1>Locations</h1>
            </div>
            <div className="previous-month">
              <ul>
                <div className="percentages-total">
                  <div className="holder-22">
                    <h1>Lagos</h1>
                  </div>
                  <div className="holder-23">
                    <div className="views">
                      <graph>add graph here</graph>
                    </div>
                    <div className="total">
                      <total>55%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-22">
                    <h1>Imo</h1>
                  </div>
                  <div className="holder-23">
                    <div className="views">
                      <graph>add graph here</graph>
                    </div>
                    <div className="total">
                      <total>55%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-22">
                    <h1>Anambra</h1>
                  </div>
                  <div className="holder-23">
                    <div className="views">
                      <graph>add graph here</graph>
                    </div>
                    <div className="total">
                      <total>55%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-22">
                    <h1>Kaduna</h1>
                  </div>
                  <div className="holder-23">
                    <div className="views">
                      <graph>add graph here</graph>
                    </div>
                    <div className="total">
                      <total>55%</total>
                    </div>
                  </div>
                </div>
                <div className="percentages-total">
                  <div className="holder-22">
                    <h1>Abuja</h1>
                  </div>
                  <div className="holder-23">
                    <div className="views">
                      <graph>add graph here</graph>
                    </div>
                    <div className="total">
                      <total>55%</total>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analystics
