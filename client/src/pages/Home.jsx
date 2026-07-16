import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Amenities from '../components/sections/Amenities';
import GalleryPreview from '../components/sections/GalleryPreview';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <Hero />
      <About />
      <Amenities />
      <GalleryPreview />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </motion.div>
  );
};

export default Home;
