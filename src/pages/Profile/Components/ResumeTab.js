import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { topFunction } from '../../../myFunctions';
import CV from './CV';

function ResumeTab() {
    useEffect(() => {
        topFunction()
    }, [])
    var { userName } = useParams() 
    
    return (        
        <div id="resumetab" className={'resume-cv'}>
            
            <Helmet>
                <title>{`${userName && (userName)?.replace(/\b(\w)/g, s => s.toUpperCase())}'s cv - Hairrrs`}</title>
                <meta name="description" content="Everything Hairs" />
                <meta property="og:title" content={`${userName && userName}'s cv - Hairrrs`} />
                <meta property="og:url" content={`https://ntutu-fdb00.web.app/profile`} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Everything Hairs" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
            </Helmet>

            <CV userName={userName}  />
                    
        </div>

    )
}

export default ResumeTab
