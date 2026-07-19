import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText } from "lucide-react";

const projects = [
  {
    title: "Virtual Fixtures for Teleoperated Robots for the Visually Impaired",
    description:
      "A teleoperation system that helps visually impaired users safely operate mobile robots, combining artificial potential fields for collision avoidance with multimodal feedback — haptic vibrations and color-coded visual overlays generated from semantic segmentation. Evaluated with legally blind participants from the Austin Lighthouse.",
    tags: ["Robotics", "ROS", "Computer Vision", "Python"],
    github: "https://github.com/Vishwaak/optimize_visualize",
    paper: "https://mavmatrix.uta.edu/cse_theses/526/",
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
              className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group"
            >
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
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                </Button>
                {project.paper && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={project.paper} target="_blank" rel="noopener noreferrer">
                      <FileText size={16} />
                      Thesis
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
