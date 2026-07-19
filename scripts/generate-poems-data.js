#!/usr/bin/env node

/**
 * Build-time script to fetch poems from Notion and generate static data.
 * Mirrors generate-blog-data.js but reads from a separate Notion database
 * (VITE_NOTION_POEMS_DATABASE_ID) since poems have a different shape
 * (full body text instead of an excerpt/link).
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.VITE_NOTION_TOKEN || !process.env.VITE_NOTION_POEMS_DATABASE_ID) {
  try {
    const envPath = join(__dirname, '../.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      }
    }
  } catch (error) {
    // no .env.local, fall through to env vars only
  }
}

const samplePoems = [
  {
    id: "1",
    title: "Mother Tongue",
    date: "2024-01-01",
    excerpt: "Talks about his love for another language",
    content: `I loved you enough
To learn the cadence of your mother tongue,
I practiced the vowels and consonants,
To sound as close to you as I could.
But instead of falling in love with you,
I cheated on you.
I fell deeper for the rhyme of the language,
For its rhythm, it's song.
My heart grew wild for poems and phrases,
But not for you.
You dare not say you love me back—
Now it's too late.
Your silence stretched like an endless shadow,
But at least your language still speaks to me.`,
    slug: "mother-tongue",
    published: true,
  },
];

function richText(prop) {
  return prop?.rich_text?.map((t) => t.plain_text).join('') || '';
}

async function fetchFromNotion() {
  try {
    console.log('🔄 Fetching poems from Notion...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.VITE_NOTION_POEMS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 50 }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    const poems = data.results
      .map((page) => {
        const properties = page.properties;
        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
          date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
          excerpt: richText(properties.Excerpt),
          content: richText(properties.Content),
          slug: richText(properties.Slug) || page.id,
          published: properties.Published?.checkbox ?? true,
        };
      })
      .filter((poem) => poem.published);

    console.log(`✅ Fetched ${poems.length} poems from Notion`);
    return poems;
  } catch (error) {
    console.error('❌ Error fetching poems from Notion:', error);
    console.log('📝 Falling back to sample poems');
    return samplePoems;
  }
}

async function generatePoemsData() {
  try {
    const publicDir = join(__dirname, '../public');
    mkdirSync(publicDir, { recursive: true });

    let poems;
    if (process.env.VITE_NOTION_TOKEN && process.env.VITE_NOTION_POEMS_DATABASE_ID && process.env.VITE_USE_NOTION === 'true') {
      poems = await fetchFromNotion();
    } else {
      console.log('🔄 Using sample poems data (Notion not configured or disabled)');
      poems = samplePoems;
    }

    const dataPath = join(publicDir, 'poems-data.json');
    writeFileSync(dataPath, JSON.stringify(poems, null, 2));
    console.log(`✅ Generated poems data with ${poems.length} poems`);
  } catch (error) {
    console.error('❌ Error generating poems data:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generatePoemsData();
}

export default generatePoemsData;
