import express from 'express'
import mongoose, { connect } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDb from './config/connectToDb.js'
import Note from './models/note.js'
dotenv.config()
import {fetchNotes, fetchNote, createNote, updatedNote, deleteNote} from './controllers/notesController.js'

const app = express()
app.use(cors())
app.use(express.json())

connectToDb()

app.post('/notes', createNote)

app.get('/notes', fetchNotes)

app.get('/notes/:id', fetchNote)

app.put('/notes/:id', updatedNote)

app.delete('/notes/:id', deleteNote)

app.listen(process.env.PORT, () => {
    console.log("Server Connected");
})