import { z } from 'zod';

export const GenresQuerySchema = z.object({
  id: z
    .string()
    .transform((str) =>
      str
        .split(',')
        .map((item) => Number(item))
        .filter((item) => !isNaN(item) && item !== 0),
    )
    .refine((array) => array.length > 0, {
      message: 'Id must contain only valid genres IDs',
    })
    .optional(),
});

export type GenresQuery = z.infer<typeof GenresQuerySchema>;
