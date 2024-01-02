import Note from "../models/note.js";

const fetchNotes = async (req, res) => {
    const allNotes = await Note.find();

    res.json(allNotes)
}

const fetchNote = async (req, res) => {
  const id = req.params.id;

  const note = await Note.findById(id);

  res.json(note);
}

const createNote = async (req, res) => {
    const {title, body} = req.body

    const note = await Note.create({title, body})

    res.json(note)
}

const updatedNote = async (req, res) => {
    const id = req.params.id
 
    const {title, body} = req.body

    const note = await Note.findByIdAndUpdate(id, {title, body})

    const updatedNote = await Note.findById(id);

    res.json(updatedNote)
}

const deleteNote = async (req, res) => {
    const id = req.params.id

    const deletedNote = await Note.findByIdAndDelete(id)

    res.json(deletedNote)
}

export {fetchNotes, fetchNote, createNote, updatedNote, deleteNote}