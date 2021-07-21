import React from 'react'
import Questions from './Questions'

function Attachment({ questions, setQuestions, editMode }) {

  return (
    <div className="pTagHolder" style={{ height: 'unset', width: '100%' }}>
      <Questions editMode={editMode} questions={questions} setQuestions={setQuestions} />
    </div>
  )
}

export default Attachment
