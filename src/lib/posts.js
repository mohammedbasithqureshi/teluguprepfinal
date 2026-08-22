import { supabase } from './supabase';

/**
 * Fetch the latest posts by type (e.g., 'job', 'admit_card', 'result')
 */
export async function getLatestByType(type, limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', type)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest by type:', error);
    return [];
  }
  return data;
}

/**
 * Fetch a single post by its unique URL slug
 */
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
  return data;
}

/**
 * Fetch all posts of a specific type
 */
export async function getAllByType(type) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', type)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching all by type:', error);
    return [];
  }
  return data;
}

/**
 * Fetch jobs whose application end dates fall within the next 7 days
 */
export async function getClosingSoon(limit = 6) {
  const today = new Date().toISOString().split('T')[0];
  const soon = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', 'job')
    .gte('application_end', today)
    .lte('application_end', soon)
    .order('application_end', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching closing soon jobs:', error);
    return [];
  }
  return data;
}

/**
 * Fetch posts filtered by category (e.g., 'police', 'tgpsc') and optional type
 */
export async function getByCategory(category, type = 'job') {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .eq('type', type)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
  return data;
}
export async function getAllByTypeFiltered(type, category) {
  let query = supabase.from('posts').select('*').eq('type', type);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.order('published_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}