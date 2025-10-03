import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 fade-in">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Creative Developer
              <br />& Poet
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Building elegant solutions at the intersection of technology and creativity.
            </p>
          </div>

          <div className="prose prose-lg max-w-2xl">
            <p className="text-muted-foreground leading-relaxed">
              I'm a developer who believes in the power of clean code and beautiful design. 
              When I'm not writing code, I'm writing poetry — exploring the rhythm of words 
              the way I explore the rhythm of algorithms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a background in Computer Vision and a passion for minimalist design, 
              I create experiences that are both functional and memorable.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-accent transition-colors"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText size={18} />
                Resume
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-accent transition-colors"
              asChild
            >
              <a href="https://github.com/vishwaak" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-accent transition-colors"
              asChild
            >
              <a href="https://www.linkedin.com/in/vishwaak-chandran/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-accent transition-colors"
              asChild
            >
              <a href="mailto:chandranvishwaak@gmail.com">
                <Mail size={18} />
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
