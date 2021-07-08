import React from 'react'
import Questions from './Questions'

function Attachment({ questions, setQuestions, showForm, setShowForm }) {
  

  return (
    <div className="attachment">
      <h4>Applicant form (optional)</h4>
      <div className="according-000">
        <div className="attachControls">
          <label className="switch">
            <input
              checked={showForm}
              onChange={(e) => { setShowForm(e.target.checked) }}
              type="checkbox" />
            <span className="slider" />
          </label>
          <p>Attach form</p>
        </div>
        <div className="holderTab">
          <div className="pTagHolder">
            <Questions questions={questions} setQuestions={setQuestions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attachment
