import React from 'react'
import { Link } from 'react-router-dom'
import { topFunction } from '../../../fuctions'

function LoungeUsers() {
    return (
        <div className="rack" style={{ padding: '2rem' }}>
            <div className="accord-rack">
                <div className="img3">
                    <div className="img4">
                        <div className="content-1">
                            <img src="images/info-icon.svg" alt="ohyanga info icon" />
                            <txt>info</txt>
                        </div>
                        <div className="rack-info">
                            <h2>Lounge users</h2>
                            <p>We provide maximum visibility to every account that made it
                                to the lounge dashboard. This dashboard is shown worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
            <div className="accord-rack" onClick={() => { topFunction() }}>
                <Link to="/business-profile?name=Riele-Down"><div className="img1">
                    <div className="img2"></div>
                </div></Link><txt>Agent</txt>
            </div>
        </div>

    )
}

export default LoungeUsers
