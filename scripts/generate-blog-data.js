#!/usr/bin/env node

/**
 * Build-time script to fetch blog posts from Notion and generate static data
 * This runs during the build process to create a static JSON file with blog posts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

async function generateBlogData() {
  try {
    // Create public directory if it doesn't exist
    const publicDir = join(__dirname, '../public');
    mkdirSync(publicDir, { recursive: true });
    
    // TODO: Replace with actual Notion API call when configured
    // const posts = await fetchFromNotion();
    const posts = sampleBlogPosts;
    
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
