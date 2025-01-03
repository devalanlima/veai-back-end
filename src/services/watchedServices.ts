import { WatchedQuery } from '../schemas/watchedSchemas';
import { TablesInsert } from '../types/supabase';
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

export async function insertNewWatched({
  created_at,
  genres,
  movie_id,
  user_id,
}: TablesInsert<'Watched'>) {
  const data = await supabase
    .from('Watched')
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
