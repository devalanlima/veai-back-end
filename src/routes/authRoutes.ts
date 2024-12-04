import express from 'express';
import {
  authenticateUser,
  createNewUser,
} from '../controllers/authControllers';

const router = express.Router();

router.post('/signup', createNewUser);
router.post('/signin', authenticateUser);

export default router;
