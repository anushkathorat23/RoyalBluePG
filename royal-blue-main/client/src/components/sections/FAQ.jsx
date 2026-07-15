import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';

const MOCK_FAQS = [
  { _id: '1', question: 'Is food available?', answer: 'Currently, we do not provide food services. However, there is a fully equipped kitchen available for residents to prepare their own meals. There are also many restaurants and tiffin services nearby.' },
  { _id: '2', question: 'Is WiFi included?', answer: 'Yes! High-speed WiFi is included in all our room packages at no extra cost. We provide reliable internet connectivity.' },
  { _id: '3', question: 'Are visitors allowed?', answer: 'Visitors are allowed in the common area during designated visiting hours (10 AM - 8 PM). For security reasons, all visitors must register at the reception desk. Overnight guests are not permitted.' },
  { _id: '4', question: 'Is AC available?', answer: 'Yes, all our rooms are air-conditioned. We have both AC and Non-AC room options available to suit your preference and budget.' },
  { _id: '5', question: 'How secure is the PG?', answer: 'Security is our top priority. We have 24/7 CCTV surveillance, biometric entry system, security guards, and a strict visitor policy. The building is exclusively for female residents.' },
];

const FAQAccordion = ({ faq, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        className={`w-full text-left px-6 py-5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
          isOpen
            ? 'bg-primary-500 text-white shadow-md'
            : 'glass-card hover:bg-gray-50 dark:hover:bg-dark-border text-gray-800 dark:text-gray-200'
        }`}
        onClick={onClick}
      >
        <span className="font-semibold pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 ${isOpen ? 'text-white' : 'text-primary-500'}`}
        >
          <FiChevronDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-dark-card/50 rounded-b-2xl border-x border-b border-gray-100 dark:border-dark-border -mt-2 pt-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [faqs] = useState(MOCK_FAQS);
  const [openId, setOpenId] = useState(faqs[0]?._id);

  return (
    <section className="section-padding bg-white dark:bg-dark-card border-none">
      <div className="container-custom">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our facilities, rules, and enquiry process."
        />

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <FAQAccordion
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
