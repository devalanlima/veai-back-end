import express from 'express';
import {
  authenticateUser,
  createNewUser,
  sendRecoveryPasswordEmail,
} from '../controllers/authControllers';

const router = express.Router();

router.post('/signup', createNewUser);
router.post('/signin', authenticateUser);
router.post('/forgot-password', sendRecoveryPasswordEmail);

export default router;
