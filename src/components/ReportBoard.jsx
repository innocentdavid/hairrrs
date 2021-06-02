import React from 'react';

function ReportBoard() {
    return (
        <>
                        <div className="reportboard">
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <span className="txt">Report</span>
                            <span>&times;</span>
                        </div>
                    </div>
                    <div className="pad">
                        <div className="complaint-title">Pick a problem</div>
                        <div className="complaints">
                            <ul>
                                <div className='sectA'>
                                    <li>Fraud</li><li>Wrong ctegory</li><li>Piracy</li><li>Nudity</li><li>Harrassment/Abuse</li>
                                </div>
                                <div className='sectA'>
                                    <li>Spam</li><li>Irrelevant</li><li>Adult content</li><li>Seller asks for prepayment</li>
                                    <li>It is unavailable</li>
                                </div>
                            </ul>
                        </div>
                        <div className="complaint-texts">
                            <textarea type="text" placeholder="Tell us more"></textarea>
                        </div>
                        <button>Report</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReportBoard
