

import React from "react";

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

const SocialMediaButtons = (props) => (
    <div className="show_share" style={{ position: 'absolute', bottom: '35px' }}>
        <FacebookShareButton url={props.url} quote={`${props.text} \n \n`}>
            Facebook
        </FacebookShareButton>

        <WhatsappShareButton url={props.url} title={`*${props.text}* \n \n`}>
            Whatsapp
        </WhatsappShareButton>

        <TwitterShareButton url={props.url} title={`${props.text} \n \n`}>
            Twitter
        </TwitterShareButton>

        <EmailShareButton subject={`Check out what I did on GoodWerk`} body={`${props.text}: ${props.url}`}>
            Email
        </EmailShareButton>
    </div>
);

export default SocialMediaButtons;