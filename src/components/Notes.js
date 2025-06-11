import React, { useContext, useCallback,useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote ,deleteNote} = context;
   

    useEffect(()=>{
        getNotes();
        // eslint-disable-next-line 
    },[])


    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
    }
    const handleupdate = (e) => {
        //e.preventDefault();
        // editNote(note.id, note.etitle, note.edescription)
        // refClose.current.click();
        try {
            editNote(note.id, note.etitle, note.edescription);
            toast.success("Note updated successfully!");
            refClose.current.click();
        } catch (error) {
            toast.error("Failed to update note. Please try again.");
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const refDelete = useRef(null);
    const refCloseDelete = useRef(null);

    const [currentNoteId, setCurrentNoteId] = useState(null);
    
    const confirmDelete = (noteId) => {
        setCurrentNoteId(noteId);
        refDelete.current.click(); // Open the confirmation modal
    };

    const handleDelete = () => {
        // deleteNote(currentNoteId); // Delete the note
        // refCloseDelete.current.click(); // Close the modal
        try {
             deleteNote(currentNoteId); // Delete the note
            toast.success("Note deleted successfully!");
            refCloseDelete.current.click(); // Close the modal
        } catch (error) {
            toast.error("Failed to delete note. Please try again.");
        }
    };



    return (
        <div>
            {/* updation modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" placeholder='Enter a valid title' id="etitle" name="etitle" onChange={onChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" rows="3" onChange={onChange} value={note.edescription} ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleupdate} >Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* deletion modal */}
            <button type="button"ref={refDelete}className="btn btn-primary d-none"data-bs-toggle="modal"data-bs-target="#deleteModal">Launch Delete Modal</button>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note? Note connot be restore.
                        </div>
                        <div className="modal-footer">
                            <button ref={refCloseDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

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






            {/* <div className="row my-5">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updatenote={updatenote} />
                })}
            </div> */}
            <div className="container row my-5">
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length===0 && 'Nothing To Display...'}
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} note={note} confirmDelete={confirmDelete} updatenote={updatenote} />
                ))}
            </div>
        </div>
    )
}

export default Notes
