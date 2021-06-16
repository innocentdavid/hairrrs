import React, { useEffect, useState } from 'react';
import SocialMediaButtons from './SocialMediaButtons';
import { RWebShare } from "react-web-share";

function WebShareApi({ url, title, text }) {
    const [showShareAlt, setShowShareAlt] = useState(false)

    const [width, setWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(false);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        if (width <= 768) { setIsMobile(true) } else { setIsMobile(false) };
    }, [width]);

    return (
        <div>
            {showShareAlt && <SocialMediaButtons url={url} text={text} />}
            {!isMobile &&
                <img src="/images/saturday feather-share-2.svg" alt="share icon" onClick={() => { setShowShareAlt(!showShareAlt) }} />
            }

            {isMobile && <RWebShare
                data={{ text, url, title }}
            // onClick={() => console.info("share successful!")}
            >
                <img src="/images/saturday feather-share-2.svg" alt="share icon" />
            </RWebShare>}
        </div>
    );
}

export default WebShareApi
