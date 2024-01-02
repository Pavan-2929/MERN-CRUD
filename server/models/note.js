import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title:String,
    body:String
})

const Note = mongoose.model("Note", noteSchema);

export default Note;