import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';

const MOCK_TESTIMONIALS = [
  { _id: '1', name: 'Priya Sharma', college: 'Delhi University', rating: 5, review: 'Amazing PG! The rooms are clean, AC works perfectly, and the staff is very helpful. I feel completely safe here. Best decision I made for my college accommodation!' },
  { _id: '2', name: 'Ananya Patel', college: 'BITS Pilani', rating: 5, review: 'Royal Blue PG is like a home away from home. The facilities are top-notch, WiFi is fast, and the biometric entry makes me feel secure. Highly recommended!' },
  { _id: '3', name: 'Sneha Reddy', college: 'Working Professional', rating: 4, review: 'Living here has been a great experience. The kitchen is well-maintained, rooms are spacious, and the location is very convenient. The management is professional and responsive.' },
  { _id: '4', name: 'Kavya Singh', college: 'IIT Delhi', rating: 5, review: 'I was worried about finding safe accommodation in a new city, but Royal Blue PG exceeded all my expectations. The CCTV coverage and 24/7 security give my parents peace of mind too!' },
];

const Testimonials = () => {
  const [testimonials] = useState(MOCK_TESTIMONIALS);

  return (
    <section className="section-padding bg-light-bg dark:bg-dark-bg border-none">
      <div className="container-custom">
        <SectionHeader
          title="What Our Residents Say"
          subtitle="Read the experiences of girls who call Royal Blue PG their second home."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id} className="h-auto">
                <div className="glass-card p-8 h-full flex flex-col relative border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-card-hover transition-all duration-300">
                  <FaQuoteLeft className="text-4xl text-primary-100 dark:text-dark-bg absolute top-6 right-6" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-6 text-accent-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? '' : 'text-gray-300 dark:text-gray-600'} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 dark:text-gray-300 italic mb-8 flex-1 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.college}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
