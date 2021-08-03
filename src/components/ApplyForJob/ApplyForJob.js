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

  const [job, setJob] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [showQuestionaire, setShowQuestionaire] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (jobTitle) {
      db.collection('Jobs')
        .where('title', '==', jobTitle)
        .onSnapshot((snapshot) => {
          let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
          console.log(r[0].job.showForm)
          setShowQuestionaire(r[0].job.showForm)
          setJob(r[0].job)
          setJobId(r[0].jobId)

          if (r[0]?.job?.questions) {
            setQuestions(r[0]?.job?.questions)
          }
        })
    }
  }, [jobTitle])

  return (
    <div className="layout p-2" style={{ marginTop: '38px', width: '800px', minHeight: '70vh', overflow: 'auto', background: "white" }}>
      <center><h1 className="text-uppercase">Apply for the position of {jobTitle}</h1></center>

      <div className="mb-2"></div>

      {showQuestionaire && <h1 className="text-uppercase">questionaire form</h1>}

      <div className="m-2"></div>

      <h1 className="text-uppercase">Resume</h1>

      <div className="m-1"></div>

      <div className="d-flex align-items-center">
        <button className="btn btn-sm">Edit cv</button>
        <button className="btn btn-sm btnSolid">Apply now</button>
      </div>
    </div>
  )
}

export default ApplyForJob
