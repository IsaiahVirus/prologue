import { useState } from 'react'

//barren form field
const SubmitForm = () => {
    const [formData, setFormData] = useState({
      email: '',
      genre: '',
      reviewStatus: '', 
      comments: '',
      authorName: '',
      document: null,
    });
  
    //for taking filled in form bits
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    //for dealing with the actual submission
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        document: file,
      });
    };
  
    // Handle form submission using Fetch 
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Create FormData object to send form data including file
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('authorName', formData.authorName);
    formDataToSend.append('attachment', formData.document);

    // Send POST request to backend
    await fetch('/submit-form', {
      method: 'POST',
      body: formDataToSend,
    });
    // Reset form after successful submission
    setFormData({
      email: '',
      genre: '',
      authorName: '',
      attachment: null,
    });
    

    console.log('Form submitted successfully in submitform.js');
  } catch (error) {
    // Errors
    console.error('Error submitting form:', error);
  }
};


  return (
    <div className="box">
    <div>SubmitForm
    <h2>Prologue Submissions</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

    <label>
    Submission Genre:
    <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required>
        <option value="">Select a genre</option>
        <option value="Fiction">Fiction</option>
        <option value="Creative Non-Fiction">Creative Non-Fiction</option>
        <option value="Art">Art</option>
        <option value="Poetry">Poetry</option>
        <option value="Script or Screenplay">Script or Screenplay</option>
        <option value="Other">Other</option>
    </select>
    </label>

    <label>
    Author Name (can submit as anonymous):
      <input
        type="text"
        name="authorName"
        value={formData.authorName}
        onChange={handleChange}
        required
      />
    </label>

    <label>
    Upload Submisson as a .doc or .docx:
      <input
        type="file"
        name="document"
        onChange={handleFileChange}
        accept=".doc, .docx"
        required
      />
    </label>

    <button type="submit">Submit</button>
    </form>
    </div>
    </div>
    
  )
}

export default SubmitForm