import { GenresQuery } from '../schemas/genresSchemas';
import supabase from '../utils/supabaseClient';

export async function filterGenres({ id }: GenresQuery) {
  let query = supabase.from('Genres').select('*');
  id && query.in('id', id);

  const data = await query;

  return data;
}
