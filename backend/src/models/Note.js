import mongoose from "mongoose";

// 1. Create A Schema
const noteSchema= new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    { 
        timestamps: true,   // createdAt, updatedAt
    }
);

// 2. Create Model based off that Schema
const Note= mongoose.model("Note", noteSchema);

export default Note;