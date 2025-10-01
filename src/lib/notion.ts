import { Client } from '@notionhq/client';

// Initialize Notion client - will be null if no token provided
const notion = import.meta.env.VITE_NOTION_TOKEN ? new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
}) : null;

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  notionUrl: string;
  slug: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}

// For development/demo purposes, you can use this sample data
const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Beauty of Minimalist Design",
    excerpt: "Exploring how constraints can lead to more creative solutions and better user experiences.",
    date: "2024-02-15",
    notionUrl: "https://notion.so/sample-post-1",
    slug: "beauty-of-minimalist-design",
    tags: ["Design", "Philosophy"],
    published: true,
  },
  {
    id: "2", 
    title: "Building Static Sites in 2024",
    excerpt: "A guide to modern static site generation with React and deployment strategies for GitHub Pages.",
    date: "2024-01-28",
    notionUrl: "https://notion.so/sample-post-2",
    slug: "building-static-sites-2024",
    tags: ["Development", "React", "Static Sites"],
    published: true,
  },
  {
    id: "3",
    title: "Code as Poetry",
    excerpt: "Reflections on the aesthetic qualities of well-written code and the art of programming.",
    date: "2024-01-10", 
    notionUrl: "https://notion.so/sample-post-3",
    slug: "code-as-poetry",
    tags: ["Programming", "Philosophy"],
    published: true,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Try to load from static data first (generated at build time)
  try {
    const response = await fetch('/blog-data.json');
    if (response.ok) {
      const posts = await response.json();
      console.log('✅ Loaded blog posts from static data');
      return posts;
    }
  } catch (error) {
    console.log('No static blog data found, using sample data');
  }

  // Fallback to sample data
  console.log('Using sample blog data - configure Notion integration for real data');
  return sampleBlogPosts;
    
  // Uncomment this block when implementing server-side or build-time data fetching:
  /*
  try {
    const response = await notion.databases.query({
      database_id: import.meta.env.VITE_NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const posts: BlogPost[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
        date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
        notionUrl: page.url,
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        coverImage: properties.Cover?.files?.[0]?.file?.url || properties.Cover?.files?.[0]?.external?.url,
        published: properties.Published?.checkbox || false,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Notion:', error);
    return sampleBlogPosts;
  }
  */
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  if (!notion || import.meta.env.VITE_USE_NOTION !== 'true') {
    return sampleBlogPosts.find(post => post.id === id) || null;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    // Process single page similar to getBlogPosts
    // Implementation would be similar but for a single page
    return null; // Placeholder
  } catch (error) {
    console.error('Error fetching blog post from Notion:', error);
    return null;
  }
}
