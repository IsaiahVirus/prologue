import { useState } from 'react'

//barren form field
const EditForm = () => {
    const [formData, setFormData] = useState({
      time: '',
      editorName: '',
      concerns: '',
      updateStatus: '',
      document: null,
    })
  
    //for taking filled in form bits
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      })}
    
  
    //for dealing with the actual submission
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        document: file,
      
    })}

  
    //eventually this stuff will go somewhere, but not yet lol
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };

//displays the form
  return (
  <div className="box"> 
  <div>EditForm<div>
    <h2>Edit Log</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Time
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Date
        <input 
            type = "date"
            name = "date"
            value={formData.date}
            onChange={handleChange}
            required/>
      </label>

        <label>
                Editor Name:
                <input
                type="text"
                name="authorName"
                value={formData.editorName}
                onChange={handleChange}
                required
                />
            </label>

      <label>
        Concerns:
        <input
          type="text"
          name="concerns"
          value={formData.concerns}
          onChange={handleChange}
          required
        />
      </label>

      <label>
    Status:
    <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required>
        <option value="">Select a status</option>
        <option value="Initial Review">Initial Review</option>
        <option value="Editing">Editing</option>
        <option value="Rejected">Rejected</option>
        <option value="Accepted">Accepted</option>
        
    </select>
    </label>

      
      <label>
        (Optional) Upload Edited Submission:
        <input
          type="file"
          name="document"
          onChange={handleFileChange}
          accept=".pdf, .doc, .docx"
          
        />
      </label>

      <button type="submit">Save</button>
    </form>
    </div>
    </div>
    </div>
  )
}

export default EditForm ;