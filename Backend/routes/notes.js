const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1 Get All the notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error accured");
    }
})

//Route 2 ADD a new notes using: POST"/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'description must be 5 character').isLength({ min: 3 }),], async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            //if there are errors,return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error accured");
        }
    })

//Route 3 update a new notes using: PUT"/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        
        const { title, description, tag } = req.body;
        try{
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            //find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("note found")}

            if(note.user.toString() !== req.user.id){
                return res.status(401).send("not Allowed for this user");
            }

            note =await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
            res.json({note});
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error accured");
        }
            
    
    })

    //Route 4 update a new notes using: DELETE"/api/notes/deleteenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        
    const { title, description, tag } = req.body;
        try{
        //find the note to be deleted and Delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("note found")}

        //allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not Allowed for this user");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error accured");
    }
    })
module.exports = router