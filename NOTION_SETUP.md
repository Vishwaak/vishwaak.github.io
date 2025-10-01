# Notion Blog Integration

Your portfolio now includes a complete Notion blog integration! This allows you to write blog posts in Notion and automatically display them on your website.

## 🚀 Quick Start (Using Sample Data)

The blog is already working with sample data. You can see it in action on your deployed site.

## 🔧 Setting Up Real Notion Integration

### Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "My Blog Integration")
4. Copy the **Internal Integration Token**

### Step 2: Create Your Blog Database

Create a new Notion database with these properties:

| Property Name | Property Type | Description |
|---------------|---------------|-------------|
| `Title` | Title | The blog post title |
| `Excerpt` | Text | Short description/excerpt |
| `Date` | Date | Publication date |
| `Published` | Checkbox | Whether the post is published |
| `Tags` | Multi-select | Categories/tags for the post |
| `Slug` | Text | URL-friendly version of title |

### Step 3: Share Database with Integration

1. Open your blog database in Notion
2. Click the "Share" button
3. Click "Invite" and search for your integration name
4. Grant access to your integration

### Step 4: Get Database ID

1. Open your database in Notion
2. Copy the URL - it looks like: `https://notion.so/your-workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the long string of characters

### Step 5: Configure Environment Variables

For local development, create `.env.local`:

```bash
VITE_NOTION_TOKEN=your_integration_token_here
VITE_NOTION_DATABASE_ID=your_database_id_here
VITE_USE_NOTION=true
```

For GitHub Pages deployment, add these as repository secrets:
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

## 🤖 Automated Deployment

The integration includes automatic rebuilding:

### Manual Rebuild
- Go to Actions tab → "Rebuild Site on Notion Update" → "Run workflow"

### Scheduled Rebuild
- Automatically rebuilds daily at 9 AM UTC

### Webhook Rebuild (Advanced)
- Set up a Notion webhook to trigger rebuilds when content changes
- Use repository dispatch events to trigger the workflow

## 📝 Writing Blog Posts

1. Add a new row to your Notion database
2. Fill in the required fields:
   - **Title**: Your blog post title
   - **Excerpt**: A brief description (appears in the blog list)
   - **Date**: Publication date
   - **Published**: Check this box to make the post visible
   - **Tags**: Add relevant tags
   - **Slug**: URL-friendly version (optional)

3. Write your content in the Notion page
4. When ready, check the "Published" checkbox
5. The post will appear on your site after the next rebuild

## 🎨 Customization

### Styling
The blog component is in `src/components/Blog.tsx` and uses your existing design system.

### Data Processing
Blog data processing is handled in `src/lib/notion.ts` - customize the mapping between Notion properties and your blog post structure.

### Build Process
The build-time data generation is in `scripts/generate-blog-data.js` - modify this to change how Notion data is processed.

## 🔄 How It Works

1. **Build Time**: The `generate-blog-data.js` script fetches posts from Notion
2. **Static Data**: Posts are saved as `public/blog-data.json`
3. **Runtime**: The blog component loads posts from the static file
4. **Fallback**: If no static data exists, sample posts are shown

This approach ensures fast loading times and works perfectly with GitHub Pages static hosting.

## 🐛 Troubleshooting

### Posts not appearing?
- Check that the "Published" checkbox is checked
- Verify the integration has access to your database
- Check that environment variables are set correctly

### Integration token issues?
- Make sure you're using the Internal Integration Token, not a public integration
- Verify the token is added as a repository secret (not just environment variable)

### Database not found?
- Double-check the database ID from the Notion URL
- Ensure the database is shared with your integration

## 📚 Resources

- [Notion API Documentation](https://developers.notion.com/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

Your blog is now ready! Start writing in Notion and watch your posts appear automatically on your portfolio site. ✨
