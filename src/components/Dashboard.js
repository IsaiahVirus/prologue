import React, { useState } from 'react';
import EditForm from './EditForm';

//this is the dashboard for the logged in editor which affects the submission and edit history
function Dashboard({ submission }) {
  const { author, editor, genre, reviewStatus, details } = submission;
  const [showEditForm, setShowEditForm] = useState(false);

  //the edit form is open and closable
  const handleToggleEditForm = () => {
    setShowEditForm(!showEditForm); // Toggle the value of showEditForm
  };

  //displays info about the submission details and opens the edit form
  return (
    <div className='box'>
      <h2>Submission Details</h2>
      <p><strong>Author: </strong> {author}</p>
      <p><strong>Editor: </strong> {editor}</p>
      <p><strong>Genre: </strong> {genre} </p>
      <p><strong>Review Status: </strong> {reviewStatus}</p>
      <p><strong>Details: </strong> {details}</p>
      <button onClick={handleToggleEditForm}>
        {showEditForm ? 'Close Edit Form' : 'Edit Submission'}
      </button>
      {showEditForm && <EditForm />}
    </div>
  );
}

export default Dashboard;