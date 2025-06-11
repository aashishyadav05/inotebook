
import { format } from "date-fns";
import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    //const context = useContext(noteContext);
    //const { deleteNote}  = context;
    const { note,updatenote ,confirmDelete, } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title ">{note.title}</h5>
                    <p className="card-text my-1">{note.description}</p>
                    {/* <p className='card-text my-1 'style={{ fontSize: '10px',fontWeight:'bold'}}>{format(new Date(note.date), "dd/MM/yyyy")}</p> */}
                    
                    {/* <p className="card-text my-1">{note.tag}</p> */}
                    {/* <i className="fa-solid fa-trash " onClick={()=>{deleteNote(note._id)}} title='Delete Note' ></i> */}
                    <i className="fa-solid fa-trash " onClick={()=>{confirmDelete(note._id)}} style={{ color: "#1e90ff",}} title='Delete Note' ></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={()=>updatenote(note)} style={{ color: "#1e90f1",}} title='Edit Note'></i>
                    
                </div>
            </div>
        </div>
    )
}
export default NoteItem
