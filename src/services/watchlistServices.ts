import { WatchlistQuery } from '../schemas/watchlistSchemas';
import supabase from '../utils/supabaseClient';

export async function filterWatchlist({
  userId,
  page,
  pageSize,
  ascending,
  movieId,
  genres,
}: WatchlistQuery) {
  let query = supabase
    .from('Watchlist')
    .select('*')
    .range(page * pageSize - pageSize, page * pageSize - 1)
    .order('created_at', { ascending });

  userId && query.eq('user_id', userId);
  movieId && query.eq('movie_id', movieId);
  genres && query.contains('genres', genres);

  const data = await query;

  return data;
}
