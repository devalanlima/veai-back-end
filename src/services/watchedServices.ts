import { WatchedQuery } from '../schemas/watchedSchemas';
import supabase from '../utils/supabaseClient';

export async function filterWatched({
  userId,
  page,
  pageSize,
  ascending,
  movieId,
  genres,
}: WatchedQuery) {
  let query = supabase
    .from('Watched')
    .select('*')
    .range(page * pageSize - pageSize, page * pageSize - 1)
    .order('created_at', { ascending });

  userId && query.eq('user_id', userId);
  movieId && query.eq('movie_id', movieId);
  genres && query.contains('genres', genres);

  const data = await query;

  return data;
}
