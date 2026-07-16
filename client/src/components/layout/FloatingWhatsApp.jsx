import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/919923805090?text=Hi%2C%20I%27m%20interested%20in%20Royal%20Blue%20PG"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg whatsapp-float hover:scale-110 transition-transform duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />
    </motion.a>
  );
};

export default FloatingWhatsApp;
