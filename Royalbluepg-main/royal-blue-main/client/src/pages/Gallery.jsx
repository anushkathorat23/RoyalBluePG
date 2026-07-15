import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import heroBg from '../assets/images/hero-bg.jpeg';
import image1 from '../assets/images/1.jpeg';
import image2 from '../assets/images/2.jpeg';
import image3 from '../assets/images/3.jpeg';
import image4 from '../assets/images/4.jpeg';
import image5 from '../assets/images/5.jpeg';
import image6 from '../assets/images/6.jpeg';
import image7 from '../assets/images/7.jpeg';
import image8 from '../assets/images/8.jpeg';
import image9 from '../assets/images/9.jpeg';

// Mock full gallery data
const ALL_IMAGES = [
  { id: 1, src: image1, category: 'Rooms', caption: 'Room Image 1' },
  { id: 2, src: image2, category: 'Rooms', caption: 'Room Image 2' },
  { id: 3, src: image3, category: 'Washroom', caption: 'Washroom Image 3' },
  { id: 4, src: image4, category: 'Washroom', caption: 'Washroom Image 4' },
  { id: 5, src: image5, category: 'Rooms', caption: 'Room Image 5' },
  { id: 6, src: image6, category: 'Rooms', caption: 'Room Image 6' },
  { id: 7, src: image7, category: 'Rooms', caption: 'Room Image 7' },
  { id: 8, src: image8, category: 'Building', caption: 'Building Image 8' },
  { id: 9, src: image9, category: 'Building', caption: 'Building Image 9' },
];

const CATEGORIES = ['All', 'Rooms', 'Kitchen', 'Washroom', 'Building', 'Study Area'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter images based on selected category
  const filteredImages = activeCategory === 'All' 
    ? ALL_IMAGES 
    : ALL_IMAGES.filter(img => img.category === activeCategory);

  const onInit = useCallback((detail) => {
    if (detail) {
      // lg instance is ready
    }
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div 
        className="h-64 relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="overlay-gradient" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Photo Gallery</h1>
          <p className="text-gray-200">Explore the premium facilities at Royal Blue PG</p>
        </div>
      </div>

      <div className="container-custom py-16">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-md scale-105'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          mode="lg-fade"
          download={false}
          elementClassNames="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.a
                key={img.id}
                href={img.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                layout
                data-src={img.src}
                data-sub-html={`<h4>${img.caption}</h4><p>${img.category}</p>`}
                className="block relative group rounded-2xl overflow-hidden glass-card shadow-sm hover:shadow-xl transition-all duration-300 aspect-square w-full"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-4 py-2 bg-black/50 backdrop-blur rounded-full border border-white/20">
                    View
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </LightGallery>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No images found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
