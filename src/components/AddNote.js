import React,{ useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote}  = context;

    const [note,setNote] = useState({title: "",description: "",tag: "default"})
    const handleAdd=(e)=>{
      e.preventDefault();
      try{  
        if (note.title.length < 3 || note.description.length < 5) {
                toast.error("Title must be at least 3 characters and description at least 5 characters.");
                return; // Early return if validation fails
            }
        toast.success("Note Added in database successfully!");
        addNote(note.title,note.description,note.tag);
        setNote({title: "",description: "",tag: "default"})
        

      }
      catch (error) {
          toast.error("Failed to Add note. Please try again.");
      }
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className="container my-3">
      <h2>Add Note </h2>
      <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} required placeholder="Enter a valid title.." />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={note.description} rows="3" onChange={onChange} required placeholder='Enter a atleast 5 character Description'></textarea>
          </div>
          <button type="submit"  onClick={handleAdd} className="btn btn-primary">Add<i className="fa-solid fa-notes-medical mx-3" title='Add New Note'></i></button>
        </form>
        {/* disabled={note.title.length<3 || note.description.length<5} */}
       {/* Toast Container */}
       <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    </div>
  )
}

export default AddNote
