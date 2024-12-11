import { SuggestionsQuery } from '../types/suggestionsTypes';
import supabase from '../utils/supabaseClient';

export async function filterSuggestions(dataQuery: SuggestionsQuery) {
  const {
    ascending = false,
    genres: genresQuery,
    movieId,
    order = 'created_at',
    pageSize = 10,
    page = 1,
  } = dataQuery;

  const genres = genresQuery && genresQuery.split(',');

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
