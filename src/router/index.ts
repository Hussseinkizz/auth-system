import { login, register } from '@/controllers/authentication.js';
import { checkStatus } from '@/controllers/status.js';
import { getAllUsers } from '@/controllers/users.js';
import { isAuthenticated } from '@/middleware/index.js';

import express from 'express';

const router = express.Router();

router.get('/', checkStatus);
// Authentication Endpoints
router.post('/register', register);
router.post('/login', login);
router.get('/users', isAuthenticated, getAllUsers);

export default router;
