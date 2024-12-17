import express, { Express } from 'express';
import authRoutes from '../src/routes/authRoutes';
import suggestionsRoutes from '../src/routes/suggestionsRoutes';
import genresRoutes from './routes/genresRoutes';
import tmdbRoutes from './routes/tmdbRoutes';
import watchedRoutes from './routes/watchedRoutes';
import watchlistRoutes from './routes/watchlistRoutes';

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', suggestionsRoutes);
app.use('/api', genresRoutes);
app.use('/api', watchedRoutes);
app.use('/api/tmdb', tmdbRoutes);
app.use('/api', watchlistRoutes);

export default app;
