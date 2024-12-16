import express, { Express } from 'express';
import authRoutes from '../src/routes/authRoutes';
import suggestionsRoutes from '../src/routes/suggestionsRoutes';
import genresRoutes from './routes/genresRoutes';
import tmdbRoutes from './routes/tmdbRoutes';

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', suggestionsRoutes);
app.use('/api', genresRoutes);
app.use('/api/tmdb', tmdbRoutes);

export default app;
