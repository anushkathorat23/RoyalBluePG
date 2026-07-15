import { motion } from 'framer-motion';
import { FaShieldAlt, FaRupeeSign, FaMoon, FaBroom, FaBolt, FaWifi, FaHandHoldingWater, FaFingerprint, FaVideo, FaUserTie } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';

const reasons = [
  { title: "Safe Environment", icon: FaShieldAlt, desc: "Exclusively for women with strict security." },
  { title: "Affordable Pricing", icon: FaRupeeSign, desc: "Premium facilities at budget-friendly rates." },
  { title: "Peaceful Atmosphere", icon: FaMoon, desc: "Quiet study spaces and noise-free zones." },
  { title: "Daily Cleaning", icon: FaBroom, desc: "Professional housekeeping every single day." },
  { title: "Power Backup", icon: FaBolt, desc: "Uninterrupted power supply 24/7." },
  { title: "High Speed WiFi", icon: FaWifi, desc: "Fast and reliable internet connectivity." },
  { title: "24×7 Water", icon: FaHandHoldingWater, desc: "Continuous hot & cold water supply." },
  { title: "Biometric Entry", icon: FaFingerprint, desc: "Access control for authorized residents." },
  { title: "CCTV Surveillance", icon: FaVideo, desc: "Comprehensive camera coverage." },
  { title: "Professional Management", icon: FaUserTie, desc: "Quick grievance resolution and support." },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="container-custom">
        <SectionHeader
          title="Why Choose Us"
          subtitle="We pride ourselves on providing the best possible living experience for girls away from home."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-card p-6 flex flex-col items-center justify-center text-center group hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-dark-bg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300">
                <reason.icon className="text-2xl text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white mb-2 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
