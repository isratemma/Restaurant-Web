import Hero from "../components/home/Hero";
import PopularDishes from "../components/home/PopularDishes";
import ChefSection from "../components/home/ChefSection";
import Gallery from "../components/home/Gallery";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <main>
      <Hero />
      <PopularDishes />
      <ChefSection />
      <Gallery />
      <Testimonials />
    </main>
  );
};

export default Home;
