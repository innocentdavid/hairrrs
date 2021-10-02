import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom'
import UserProfile from '../../components/UserProfile/UserProfile'
import { db } from '../../firebase'

function JobVacancyResponse() {
  const user = UserProfile.getUser()
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  var jobId = params.get('jobId');
  var rId = params.get('rId');
  if (!params.has('jobId') || params.get('jobId') === '') {
    history.push('/jobs')
  } else {
    jobId = params.get('jobId');
  }

  // const [response, setResponse] = useState([])

  useEffect(() => {
    if (user && jobId) {
      db.collection('Jobs').doc(jobId).collection('responses').doc(rId)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            let r = snapshot.data()
            let div = document.createElement('div')
            div.innerHTML=r.response
            document.querySelector('#responseMain').append(div)
            // setResponse(r)
          }
        })
    }
  }, [user, jobId, rId])

  return (<>
    <div id='responseMain'></div>
  </>)
}

export default JobVacancyResponse
