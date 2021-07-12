import React from 'react'
import MyImage from '../MyImage'

function AlertModal({ alertModal, setAlertModal, alertMsg }) {
    return (
        <div className={`authModal signinalert modal_show_${alertModal}`}>
            <div className="container">
                <div onClick={() => { setAlertModal(false) }} className="close">&times;</div>
                <div className="logins">
                    <div className="info-1">
                        <p>{alertMsg}</p>
                        <p className="btn underline" onClick={() => { setAlertModal(false) }}>Try again?</p>
                    </div>
                    <div className="others-1">
                        <span>You can also signin with</span>
                        <br />
                        <div className="justify">
                            <button className="signinbtn">
                                <MyImage
                                    src={"/images/Icon awesome-facebook-f.svg"}
                                    alt="facebook icon hairrrs"
                                />
                                Facebook
                            </button>
                            <button className="signinbtn">
                                <MyImage
                                    src={"/images/Icon ionic-logo-google.svg"}
                                    alt="google icon hairrrs"
                                />
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AlertModal
