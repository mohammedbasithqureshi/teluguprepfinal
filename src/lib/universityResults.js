import { supabase } from './supabase';

export async function getAllUniversityResults() {
  const { data, error } = await supabase
    .from('university_results')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching university results:', error);
    return [];
  }
  return data;
}

export async function getUniversityResultBySlug(slug) {
  const { data, error } = await supabase
    .from('university_results')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching university result by slug:', error);
    return null;
  }
  return data;
}