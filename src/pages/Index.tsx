import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <About />
      <Projects />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
