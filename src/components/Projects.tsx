import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Minimal Task Manager",
    description: "A clean, distraction-free task manager built with React and TypeScript. Features local storage, keyboard shortcuts, and a beautiful minimal interface.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/task-manager",
    demo: "https://task-manager-demo.com",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
  },
  {
    title: "Poetry Generator API",
    description: "A RESTful API that generates poetry using natural language processing. Built with Node.js and integrated with multiple AI models.",
    tags: ["Node.js", "Express", "AI/ML"],
    github: "https://github.com/yourusername/poetry-api",
    demo: null,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
  },
  {
    title: "Code Snippet Library",
    description: "A personal collection of reusable code snippets with syntax highlighting and search functionality. Built as a static site for quick reference.",
    tags: ["JavaScript", "Static Site", "Search"],
    github: "https://github.com/yourusername/snippets",
    demo: "https://snippets-demo.com",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen px-6 py-20">
      <div className="container max-w-6xl mx-auto fade-in">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground">
            A selection of recent work and side projects.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-secondary text-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
