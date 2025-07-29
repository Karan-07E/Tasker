import express from 'express';
import { register, login, getCurrentUser, forgotPassword, resetPassword } from '../Controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

export default router;
