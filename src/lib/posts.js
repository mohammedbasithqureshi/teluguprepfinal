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

/**
 * Fetch all posts of a type, optionally filtered by category
 */
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

/**
 * Fetch latest jobs excluding the current post (for "related jobs" section)
 */
export async function getLatestJobs(excludeId, limit = 3) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('type', 'job');

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest jobs:', error);
    return [];
  }
  return data;
}

/**
 * Fetch latest blogs excluding the current post (for "related blogs" section)
 */
export async function getLatestBlogs(excludeId, limit = 3) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('type', 'blog');

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest blogs:', error);
    return [];
  }
  return data;
}

/**
 * Fetch most-viewed blogs, optionally excluding the current post
 */
export async function getMostViewedBlogs(excludeId, limit = 3) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('type', 'blog');

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query
    .order('views', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching most viewed blogs:', error);
    return [];
  }
  return data;
}

/**
 * Increment the view count for a post (calls the increment_views SQL function)
 */
export async function incrementViews(postId) {
  const { error } = await supabase.rpc('increment_views', { post_id: postId });
  if (error) console.error('Error incrementing views:', error);
}
export async function getCategoryCounts() {
  const { data, error } = await supabase
    .from('posts')
    .select('category')
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching category counts:', error);
    return {};
  }

  const counts = {};
  data.forEach((row) => {
    if (row.category) {
      counts[row.category] = (counts[row.category] || 0) + 1;
    }
  });
  return counts;
}