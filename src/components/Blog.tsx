import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

// Sample blog posts structure
// In production, these would come from Notion API
const blogPosts = [
  {
    title: "The Beauty of Minimalist Design",
    excerpt: "Exploring how constraints can lead to more creative solutions and better user experiences.",
    date: "2024-02-15",
    notionUrl: "#",
  },
  {
    title: "Building Static Sites in 2024",
    excerpt: "A guide to modern static site generation with React and deployment strategies for GitHub Pages.",
    date: "2024-01-28",
    notionUrl: "#",
  },
  {
    title: "Code as Poetry",
    excerpt: "Reflections on the aesthetic qualities of well-written code and the art of programming.",
    date: "2024-01-10",
    notionUrl: "#",
  },
];

const Blog = () => {
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

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="p-6 md:p-8 hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group cursor-pointer"
            >
              <a
                href={post.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="space-y-3">
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
                    <ArrowRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 border border-border rounded-lg bg-muted/30">
          <h3 className="text-lg font-semibold mb-2">Notion Integration Setup</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To connect your Notion blog: Create a Notion integration, share your blog database 
            with it, and use the Notion API to fetch posts. For static deployment, you can use 
            GitHub Actions to rebuild the site when new posts are published. See the{" "}
            <a
              href="https://developers.notion.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium"
            >
              Notion API docs
            </a>{" "}
            for details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
