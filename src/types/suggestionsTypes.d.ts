import { Tables } from './supabase';

export interface SuggestionsQuery {
  pageSize?: number;
  page?: number;
  order?: keyof Tables<'Suggestions'>;
  ascending?: boolean;
  movieId?: string;
  genres?: string;
}
