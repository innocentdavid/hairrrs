import React, { useState } from 'react'

function Attachment({ setApplicantForm }) {
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="attachment">
      <h4>Applicant form (optional)</h4>
      <form>
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
                <div className="all">
                <input type='text' placeholder="Enter question" />
                  <span className="cancel">×</span>
                  <span className="moveDown">❮</span>
                  <span className="moveUpHidden">❮</span>
                </div>
                <div className="all">
                  <input type='text' placeholder="Enter question" />
                  <span className="cancel">×</span>
                  <span className="moveDown">❮</span>
                  <span className="moveUp">❮</span>
                </div>
                <div className="all">
                  <input type='text' placeholder="Enter question" />
                  <span className="cancel">×</span>
                  <span className="moveUp">❮</span>
                  <span className="moveUpHidden">❮</span>
                </div>
              </div>
              <div style={{ minHeight: '10px' }}></div>
              <button className="addText">Add text field</button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Attachment
