#!/usr/bin/env node

/**
 * Build-time script to fetch blog posts from Notion and generate static data
 * This runs during the build process to create a static JSON file with blog posts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));

// Sample blog posts - replace with actual Notion API call when configured
const sampleBlogPosts = [
  {
    id: "1",
    title: "The Beauty of Minimalist Design",
    excerpt: "Exploring how constraints can lead to more creative solutions and better user experiences. When we strip away the unnecessary, we reveal the essence of what truly matters in design.",
    date: "2024-02-15",
    notionUrl: "https://notion.so/sample-post-1",
    slug: "beauty-of-minimalist-design",
    tags: ["Design", "Philosophy", "UX"],
    published: true,
  },
  {
    id: "2", 
    title: "Building Static Sites in 2024",
    excerpt: "A comprehensive guide to modern static site generation with React, Vite, and deployment strategies for GitHub Pages. Learn how to create fast, secure, and scalable websites.",
    date: "2024-01-28",
    notionUrl: "https://notion.so/sample-post-2",
    slug: "building-static-sites-2024",
    tags: ["Development", "React", "Static Sites", "GitHub Pages"],
    published: true,
  },
  {
    id: "3",
    title: "Code as Poetry",
    excerpt: "Reflections on the aesthetic qualities of well-written code and the art of programming. Exploring how elegance, clarity, and beauty manifest in software development.",
    date: "2024-01-10", 
    notionUrl: "https://notion.so/sample-post-3",
    slug: "code-as-poetry",
    tags: ["Programming", "Philosophy", "Clean Code"],
    published: true,
  },
  {
    id: "4",
    title: "The Future of Web Development",
    excerpt: "Thoughts on emerging trends in web development, from AI-assisted coding to the evolution of JavaScript frameworks and the rise of edge computing.",
    date: "2024-03-05",
    notionUrl: "https://notion.so/sample-post-4", 
    slug: "future-of-web-development",
    tags: ["Web Development", "AI", "JavaScript", "Future Tech"],
    published: true,
  },
];

async function fetchFromNotion() {
  try {
    console.log('🔄 Fetching posts from Notion...');
    console.log('🔑 Using database ID:', process.env.VITE_NOTION_DATABASE_ID);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Use direct fetch to Notion API since the client method seems to have issues
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.VITE_NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Remove filter and sorting for now - let's see what properties exist
        page_size: 10,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Notion API Response:', errorText);
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Successfully fetched data from Notion');
    console.log('📊 Number of results:', data.results.length);
    
    // Debug: Log the first page's properties to see what's available
    if (data.results.length > 0) {
      console.log('🔍 Available properties in first post:', Object.keys(data.results[0].properties));
    }

    const posts = data.results.map((page) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties['Blog title']?.title?.[0]?.plain_text || 
               properties.Title?.title?.[0]?.plain_text || 
               'Untitled',
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || 
                properties.Description?.rich_text?.[0]?.plain_text ||
                properties.Summary?.rich_text?.[0]?.plain_text ||
                'No excerpt available',
        date: properties['Publication Date']?.date?.start || 
              properties.Date?.date?.start || 
              properties['Created time']?.created_time?.split('T')[0] ||
              new Date().toISOString().split('T')[0],
        notionUrl: page.url,
        slug: properties.Slug?.rich_text?.[0]?.plain_text || 
              page.id,
        tags: properties.Tags?.multi_select?.map((tag) => tag.name) || 
              properties.Categories?.multi_select?.map((tag) => tag.name) || 
              [],
        coverImage: properties.Cover?.files?.[0]?.file?.url || 
                   properties.Cover?.files?.[0]?.external?.url,
        published: properties.Published?.checkbox ?? 
                  properties.Public?.checkbox ?? 
                  true, // Default to published if no checkbox
      };
    });

    console.log(`✅ Fetched ${posts.length} posts from Notion`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching from Notion:', error);
    console.log('📝 Falling back to sample data');
    return sampleBlogPosts;
  }
}

async function generateBlogData() {
  try {
    // Create public directory if it doesn't exist
    const publicDir = join(__dirname, '../public');
    mkdirSync(publicDir, { recursive: true });
    
    // Fetch posts from Notion or use sample data
    let posts;
    if (process.env.VITE_NOTION_TOKEN && process.env.VITE_NOTION_DATABASE_ID && process.env.VITE_USE_NOTION === 'true') {
      posts = await fetchFromNotion();
    } else {
      console.log('🔄 Using sample blog data (Notion not configured or disabled)');
      posts = sampleBlogPosts;
    }
    
    // Write blog data to public directory
    const dataPath = join(publicDir, 'blog-data.json');
    writeFileSync(dataPath, JSON.stringify(posts, null, 2));
    
    console.log(`✅ Generated blog data with ${posts.length} posts`);
    console.log(`📄 Data written to: ${dataPath}`);
    
    // Also create a metadata file
    const metaPath = join(publicDir, 'blog-meta.json');
    const metadata = {
      generated: new Date().toISOString(),
      postCount: posts.length,
      usingNotion: !!process.env.VITE_NOTION_TOKEN,
      notionEnabled: process.env.VITE_USE_NOTION === 'true',
    };
    writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogData();
}

export default generateBlogData;
