import express from 'express';
import { getAllNotes, addNotes, updateNotes, deleteNotes, getNoteById } from '../Controllers/noteController.js';

const router = express.Router();

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', addNotes);

router.put('/:id', updateNotes);

router.delete('/:id', deleteNotes);

export default router;