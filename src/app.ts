import express, { Express } from 'express';
import authRoutes from '../src/routes/authRoutes';

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;
