import Navigation from "@/components/Navigation";
import Poems from "@/components/Poems";
import Footer from "@/components/Footer";

const PoemsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Poems />
      <Footer />
    </div>
  );
};

export default PoemsPage;
