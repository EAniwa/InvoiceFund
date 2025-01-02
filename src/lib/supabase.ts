import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function checkUserVerification() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('verification_status')
    .eq('id', user.id)
    .single();

  return profile?.verification_status === 'approved';
}
export async function getUsers() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*');
  
  if (error) throw error;
  return data;
}
