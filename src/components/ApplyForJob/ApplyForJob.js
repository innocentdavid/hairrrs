import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { UrlSlug } from '../../fuctions';
import UserProfile from '../UserProfile/UserProfile';
import CV from '../../pages/Profile/Components/CV';
// import html2canvas from 'html2canvas';

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

  const [openLoading, setOpenLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  // const [job, setJob] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [showQuestionaire, setShowQuestionaire] = useState(false);
  const [questions, setQuestions] = useState([]);
  const user = UserProfile.getUser();
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (jobTitle) {
      setOpenLoading(true)
      db.collection('Jobs')
        .where('title', '==', jobTitle)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            let r = snapshot.docs.map(doc => ({ job: doc.data(), id: doc.id }))
            setShowQuestionaire(r[0]?.job?.showForm)
            // setJob(r[0]?.job)
            setJobId(r[0]?.id)

            if (r[0]?.job?.questions) {
              setQuestions(r[0]?.job?.questions)
            }
          }
        })
        setOpenLoading(false)
    }
  }, [jobTitle])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setEditMode(false)
    let form = e.target

    await db.collection('Jobs').doc(jobId).collection('responses').doc(user?.uid)
      .set({ response: form.outerHTML })

    setProcessing(false)
  }

  return (<>
    {openLoading && 
    <div className="loader" style={{ display: 'grid' }}>
      <img src="/images/loading.svg" alt="" />
    </div>
    }

    <form onSubmit={(e) => { handleSubmit(e) }}>
      <div className="layout p-2" style={{ marginTop: '38px', width: '800px', minHeight: '70vh', overflow: 'auto', background: "white" }}>
        <center><h1 className="text-uppercase">Apply for the position of <u>"{jobTitle}"</u></h1></center>

        <div className="m-2"></div>

        {questions && showQuestionaire && <>
          <h1 className="text-uppercase">questionaire</h1>
          {questions?.map(doc => (
            <div key={doc.id} className="m-2 ml-0">
              <div>{doc.content}?</div>
              <br />
              <input
                id={doc.id}
                onChange={(e) => {
                  let el = document.querySelector(`#${doc.id}`)
                  if (el) { el.defaultValue = e.target.value }
                }}
                className="form-control" type="text"
                placeholder="Answer" />
            </div>
          ))}
        </>}


        <div className="m-1"></div>

        <h1 className="text-uppercase">Resume</h1>

        <div className="m-1"></div>

        <CV userName={user.userName} setEditModeR={editMode} setOpenLoading={setOpenLoading} openLoading={openLoading} />

        <div className="m-1"></div>

        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-sm" onClick={() => { setEditMode(!editMode) }}>quick edit cv</button>
          <button type="submit" className="btn btn-sm btnSolid" onClick={() =>{setProcessing(true)}}>Apply now</button>
          {processing && <img src="/images/kloader.gif" alt="" style={{width: 25, height: 25}} />}
        </div>
      </div>
    </form>
  </>)
}

export default ApplyForJob
