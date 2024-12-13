import { SuggestionsQuery } from '../schemas/suggestionsSchemas';
import supabase from '../utils/supabaseClient';

export async function filterSuggestions({
  ascending,
  genres,
  movieId,
  order,
  pageSize,
  page,
}: SuggestionsQuery) {
  let query = supabase
    .from('Suggestions')
    .select('*')
    .order(order, { ascending: ascending })
    .range(page * pageSize - pageSize, page * pageSize - 1);

  movieId && query.eq('movie_id', movieId);
  genres && query.contains('genres', genres);

  const data = await query;

  return data;
}
