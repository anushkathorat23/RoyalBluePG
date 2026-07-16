import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="loader-spinner" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-accent-400 font-bold text-lg">RB</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold tracking-wider">ROYAL BLUE PG</h2>
          <p className="text-primary-200 text-sm mt-1">Premium Girls Hostel</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
