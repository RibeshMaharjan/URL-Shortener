import express from 'express';
import users from '../controllers/user.js';

const router = express.Router();

//  login page
router.post('/login', users.handleUserLogin)

// Login user
router.post('/', users.handleUserSignup);

export default router;