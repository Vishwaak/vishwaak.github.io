import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Poems from "@/components/Poems";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <About />
      <Projects />
      <Poems />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
