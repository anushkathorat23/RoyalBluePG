import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent-500 rounded-full" />
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionHeader;
