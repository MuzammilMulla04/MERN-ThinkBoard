import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNote } from "../controllers/nodesControllers.js";

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote)
router.delete('/:id', deleteNote);

export default router;

