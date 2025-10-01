import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight, ExternalLink, Tag } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const { posts: blogPosts, loading, error } = useBlogPosts();
  return (
    <section id="blog" className="min-h-screen px-6 py-20 bg-secondary/30">
      <div className="container max-w-5xl mx-auto fade-in">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Blog</h2>
          <p className="text-lg text-muted-foreground">
            Thoughts on technology, design, and creativity.
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            Posts are published from Notion and automatically synced here.
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 md:p-8 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="p-6 md:p-8 border-destructive/50">
            <p className="text-destructive">{error}</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="p-6 md:p-8 hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group cursor-pointer"
              >
                <a
                  href={post.notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    
                    <h3 className="text-2xl font-semibold group-hover:opacity-70 transition-opacity flex items-center justify-between">
                      {post.title}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} />
                        <ArrowRight size={20} />
                      </div>
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag size={14} className="text-muted-foreground" />
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 border border-border rounded-lg bg-muted/30">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <ExternalLink size={18} />
            Notion Integration Ready
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Your blog is now connected to Notion! Currently showing sample data.
            </p>
            <div className="bg-background/50 p-4 rounded border">
              <p className="font-medium text-foreground mb-2">To connect your real Notion database:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Create a Notion integration at <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="link-underline">notion.so/my-integrations</a></li>
                <li>Copy the Internal Integration Token</li>
                <li>Create a database with these properties: Title (title), Excerpt (text), Date (date), Published (checkbox), Tags (multi-select), Slug (text)</li>
                <li>Share your database with the integration</li>
                <li>Add environment variables: NOTION_TOKEN and NOTION_DATABASE_ID</li>
              </ol>
            </div>
            <p>
              For static deployment, use GitHub Actions to rebuild when posts are published.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
