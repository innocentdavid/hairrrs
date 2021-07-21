import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { UrlSlug } from '../../fuctions';

function ApplyForJob() {
  var jobTitle;
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  if (!params.has('apply-for')) {
    history.push('/jobs')
  } else {
    if (params.get('apply-for') === '') {
      history.push('/jobs')
    } else {
      jobTitle = UrlSlug(params.get('apply-for'), 'decode');
    }
  }

  if (!jobTitle) { history.push('/jobs') }

  const [job, setJob] = useState(null)
  const [jobId, setJobId] = useState(null)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (jobTitle) {
      db.collection('Jobs')
        .where('title', '==', jobTitle)
        .onSnapshot((snapshot) => {
          let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
          console.log(r[0]?.job?.questions)
          setJob(r[0].job)
          setJobId(r[0].jobId)
          
          if (r[0]?.job?.questions) {
            setQuestions(r[0]?.job?.questions)
          }
        })
    }
  }, [jobTitle])

  return (
    <div className="layout" style={{ marginTop: '38px' }}>
      <div style={{ width: '800px', minHeight: '70vh', overflow: 'auto', background: "white" }}>
        <center style={{ margin: '5px' }}><h1>Apply for the position of {jobTitle}</h1></center>

        <div>* Show questionaire form</div>

        <div>* Show cv</div>

        <div>* buttons for <b>edit cv</b> and <b>Apply now</b> </div>
      </div>
    </div>
  )
}

export default ApplyForJob
