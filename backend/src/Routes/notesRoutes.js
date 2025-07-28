import express from 'express';
import { getAllNotes, addNotes, updateNotes, deleteNotes, getNoteById } from '../Controllers/noteController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', addNotes);

router.put('/:id', updateNotes);

router.delete('/:id', deleteNotes);

export default router;