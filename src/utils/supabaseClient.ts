import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_Key || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
