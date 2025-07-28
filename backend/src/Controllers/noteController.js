import Note from '../model/Note.js';

export async function getAllNotes(_, res){
    try {
        const notes = await Note.find().sort({createdAt : -1}) //sort ensures newest is displayed first.
        res.status(200).json(notes);
    } catch (error) {
        console.log('Error fetching all users', error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function getNoteById(req, res){
    try {
        const fetchedNote = await Note.findById(req.params.id);
        if(!fetchedNote) return res.status(404).json({message : "Note not found"});
        res.status(200).json(fetchedNote);
    } catch (error) {
        console.log("Error fetching note", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function addNotes(req, res){
    const {title, content} = req.body;
    try {
        const newNote = new Note({title, content});
        const savedNote = await newNote.save();
        console.log("Note added succesfully");
        res.status(201).json(savedNote);
    } catch (error) {
        console.log('Error adding note', error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function updateNotes(req, res){
    try {
        const {title, content} = req.body;  //user is giving what to update
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
             {title, content}, 
             {new: true}
            );
            if(!updatedNote) return res.status(404).json({message : "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("Error updating note", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function deleteNotes(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message : "Note not found to be deleted"});
        res.status(200).json(deletedNote);
    } catch (error) {
        console.log("Error updating note", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}
