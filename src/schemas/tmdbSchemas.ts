import { z } from 'zod';

export const PopularMoviesQuerySchema = z.object({
  language: z.string().default('pt-BR'),
  page: z.coerce.number().min(1).max(500).default(1),
  pageSize: z.coerce.number().min(1).max(20).default(5),
  region: z.string().default('076'),
});

export type PopularMoviesQuery = z.infer<typeof PopularMoviesQuerySchema>;
