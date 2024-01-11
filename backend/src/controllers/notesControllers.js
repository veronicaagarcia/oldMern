const notesControllers = {}

const model = require('../models/note')

notesControllers.getNotes = async (req, res)=> {
   const notes = await model.find()
    res.json(notes)
}

notesControllers.createNote = async (req, res)=>{ 
    const { title, content, author, date } = req.body
    const newNote = new model ({
        title,
        content,
        author,
        date
    })
   await newNote.save()
    res.json({message : 'Note saved'})
}

notesControllers.getNote = async (req, res)=> {
    const noteId = await model.findById(req.params.id)
    res.json(noteId)
}

notesControllers.updateNote = async (req, res)=> {
    const { title, content, author, date } = req.body
    await model.findByIdAndUpdate(req.params.id, {
        title, content, author, date
    })
    res.json({message : "Note updated"})
}

notesControllers.deleteNote = async (req, res)=> {
    await model.findByIdAndDelete(req.params.id)
    res.json({message : "Note deleted"})
}

module.exports = notesControllers