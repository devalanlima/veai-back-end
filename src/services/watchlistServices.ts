import { WatchlistQuery } from '../schemas/watchlistSchemas';
import { TablesInsert } from '../types/supabase';
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

export async function insertInWatchlist({
  created_at,
  genres,
  movie_id,
  user_id,
}: TablesInsert<'Watchlist'>) {
  const data = await supabase
    .from('Watchlist')
    .insert([
      {
        movie_id,
        user_id,
        created_at,
        genres,
      },
    ])
    .select();

  return data;
}
