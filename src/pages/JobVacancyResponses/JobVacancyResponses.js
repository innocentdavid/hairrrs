import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import UserProfile from '../../components/UserProfile/UserProfile'
import { db } from '../../firebase'

function JobVacancyResponses() {
  const user = UserProfile.getUser()
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  var jobId = params.get('jobId');
  var jobTitle = params.get('jobTitle');
  if (!params.has('jobId') || params.get('jobId') === '') {
    history.push('/jobs')
  } else {
    jobId = params.get('jobId');
  }

  const [responses, setResponses] = useState([])

  useEffect(() => {
    if (user && jobId) {
      db.collection('Jobs').doc(jobId).collection('responses')
        .onSnapshot(snapshot => {
          if (!snapshot.empty) {
            let r = snapshot.docs.map(doc => ({ response: doc.data(), id: doc.id }))
            setResponses(r)
          }
        })
    }
  }, [user, jobId])

  return (
    <div style={{ padding: '0 10px' }}>
      <center><h1><strong>{jobTitle}</strong></h1></center>
      <div className="m-1"></div>

      {responses?.map(({ id, response }) => (
        <div>
          <strong>UserName | Lagos - Nigeria</strong>
          <div style={{ margin: '.5rem' }}></div>
          <p>35 char len text = Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque harum error atque et neque qui est facilis consectetur numquam. Animi tempora eos ratione sed fugiat, non, suscipit sequi delectus libero blanditiis nihil odio aliquid?...</p>

          <Link to={`/JobVacancyResponse?jobId=${jobId}&rId=${id}`}><button className="mr-3">View response</button></Link>
          <Link to={`/JobVacancyResponse?jobId=${jobId}&rId=${id}#download`}><button className="btnSolid">Download</button></Link>
          <hr style={{ border: '1px solid #c100412b', marginTop: 4, marginBottom: 10 }} />
        </div>
      ))}

    </div>
  )

}

export default JobVacancyResponses
