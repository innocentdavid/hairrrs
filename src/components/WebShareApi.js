import React, { useState } from 'react';
import SocialMediaButtons from './SocialMediaButtons';
import { RWebShare } from "react-web-share";
import {isMobile} from 'react-device-detect';

function WebShareApi({ url, title, text }) {
    const [showShareAlt, setShowShareAlt] = useState(false)

    // const [width, setWidth] = useState(window.innerWidth);
    // const [isMobile, setIsMobile] = useState(false);

    // function handleWindowSizeChange() {
    //     setWidth(window.innerWidth);
    // }
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowSizeChange);
    //     return () => {
    //         window.removeEventListener('resize', handleWindowSizeChange);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (width <= 768) { setIsMobile(true) } else { setIsMobile(false) };

    // }, [width]);


    return (
        <div>
            {showShareAlt && <SocialMediaButtons url={url} text={text} />}
            {!isMobile &&
                <button onClick={() => { setShowShareAlt(!showShareAlt) }}><img src="/images/saturday feather-share-2.svg" alt="share icon" /></button>
            }

            {isMobile && <RWebShare
                data={{ text, url, title }}
            // onClick={() => console.info("share successful!")}
            >
                <button><img src="/images/saturday feather-share-2.svg" alt="share icon" /></button>
            </RWebShare>}
        </div>
    );
}

export default WebShareApi
