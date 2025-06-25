import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error Occurred in getAllNotes controller:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export async function getNote(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "Note not Found!"})

        res.status(200).json(note)
    } catch (error) {
        console.error("Error Occurred in getNote controller:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })

        const savedNote = await note.save()
        res.status(201).json({ message: "Note Created successfully!", note: savedNote })
    } catch (error) {
        console.error("Error Occurred in createNote controller:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })

        if (!updatedNote) return res.status(404).json({ message: "Note not Found!" })

        res.status(200).json({ message: "Note Updated successfully!", note: updatedNote })
    } catch (error) {
        console.error("Error Occurred in updateNote controller:", error.message)
        res.status(500).json({ messsage: "Internal Server Error" })
    }
}

export async function deleteNote(req, res) {
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id)

        if (!deleted) return res.status(404).json({ messsage: "Note not Found!" })

        res.status(200).json({ message: "Note Deleted Sucessfully!" })
    } catch (error) {
        console.error("Error Occurred in deleteNote controller::", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}