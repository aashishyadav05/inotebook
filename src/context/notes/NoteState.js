import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async() => {
        //api call
        const url = 'http://localhost:5000/api/notes/fetchallnotes';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
        }
        });
        const json= await response.json()
        setNotes(json);
    }

    

    //Add a note
    const addNote = async(title, description, tag) => {
        //TODO api call
        //api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
        },
            body: JSON.stringify({title,description,tag})
        });
        const note = response.json();
        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote =async (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
         });
        
        setNotes(newNotes)
    }

    //update/edit a note
    const editNote = async (id, title, description, tag) => {
       //api call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        //const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        //edit to logic in client 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
               break;
         }
            setNotes(newNotes);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;