import { SuggestionsQuery } from '../schemas/suggestionsSchemas';
import { TablesInsert } from '../types/supabase';
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

export async function insertNewSuggestion({
  movie_id,
  sender_id,
  created_at,
  genres,
  receiver_id,
  spoiler,
  suggestion,
  vote_count,
}: TablesInsert<'Suggestions'>) {
  const data = await supabase
    .from('Suggestions')
    .insert({
      movie_id,
      sender_id,
      created_at,
      genres,
      receiver_id,
      spoiler,
      suggestion,
      vote_count,
    })
    .select();

  return data;
}
