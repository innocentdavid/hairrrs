import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { db } from '../../firebase';
import { customAlert, openLoading } from '../../myFunctions';

function Business() {
  const history = useHistory();
  const { businessSlug } = useParams()
  const [business, setBusiness] = useState([]);

  // isBusinessAvailable
  useEffect(() => {
    openLoading('open');
    db.collection('businesses').doc(businessSlug).get()
      .then((doc) => {
        console.log(doc.exists)
        if (doc.exists) {
          console.log(doc.data())
          setBusiness(doc.data())
        } else {
          openLoading('close');
          customAlert('No such business account!', 'open')
          setTimeout(() => {
            customAlert('', 'close')
            history.goBack()
          }, 5000);
        }
      }).catch(error => console.log(error.message))

    openLoading('close');
  }, [businessSlug, history]);

  return (
    <>
      <Helmet>
        <title>{`${businessSlug} - Hairrrs`}</title>
        <meta name="description" content="Everything Hairs" />
        <meta property="og:title" content={`${businessSlug} - Hairrrs`} />
        <meta property="og:url" content={`https://ntutu-fdb00.web.app/profile`} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Everything Hairs" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/ntutu-fdb00.appspot.com/o/hairrrs-Logo-original-resized.png?alt=media&token=b322368f-6abc-477b-aa10-13f3ed71e277" />
      </Helmet>
      
    </>
  )
}

export default Business
