import { supabase } from './supabase';

export async function getLatestByType(type, limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', type)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function getAllByType(type) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', type)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}