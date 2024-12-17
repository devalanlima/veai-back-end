import { SuggestionsQuery } from '../schemas/suggestionsSchemas';
import supabase from '../utils/supabaseClient';

export async function filterSuggestions({
  ascending,
  genres,
  movieId,
  orderBy,
  pageSize,
  page,
}: SuggestionsQuery) {
  let query = supabase
    .from('Suggestions')
    .select('*')
    .order(orderBy, { ascending })
    .range(page * pageSize - pageSize, page * pageSize - 1);

  movieId && query.eq('movie_id', movieId);
  genres && query.contains('genres', genres);

  const data = await query;

  return data;
}
