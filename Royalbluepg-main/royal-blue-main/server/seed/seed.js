require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const FAQ = require('../models/FAQ');
const Amenity = require('../models/Amenity');
const Testimonial = require('../models/Testimonial');
const Content = require('../models/Content');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await FAQ.deleteMany({});
    await Amenity.deleteMany({});
    await Testimonial.deleteMany({});
    await Content.deleteMany({});

    // Seed Admin
    await Admin.create({
      username: 'admin',
      email: 'admin@royalbluepg.com',
      password: 'admin123',
      role: 'superadmin',
    });
    console.log('✅ Admin seeded');

    // Seed FAQs
    await FAQ.insertMany([
      { question: 'Is food available?', answer: 'Currently, we do not provide food services. However, there is a fully equipped kitchen available for residents to prepare their own meals. There are also many restaurants and tiffin services nearby.', order: 1 },
      { question: 'Is WiFi included?', answer: 'Yes! High-speed WiFi is included in all our room packages at no extra cost. We provide reliable internet connectivity for your studies and entertainment needs.', order: 2 },
      { question: 'Are visitors allowed?', answer: 'Visitors are allowed in the common area during designated visiting hours (10 AM - 8 PM). For security reasons, all visitors must register at the reception desk. Overnight guests are not permitted.', order: 3 },
      { question: 'Is AC available?', answer: 'Yes, all our rooms are air-conditioned. We have both AC and Non-AC room options available to suit your preference and budget.', order: 4 },
      { question: 'How secure is the PG?', answer: 'Security is our top priority. We have 24/7 CCTV surveillance, biometric entry system, security guards, and a strict visitor policy. The building is exclusively for female residents.', order: 5 },
      { question: 'Is there parking?', answer: 'Yes, we have a dedicated parking area for two-wheelers. Limited car parking is also available on a first-come, first-served basis.', order: 6 },
    ]);
    console.log('✅ FAQs seeded');

    // Seed Amenities
    await Amenity.insertMany([
      { name: 'Air Conditioned Rooms', icon: 'TbAirConditioning', order: 1 },
      { name: 'Kitchen', icon: 'MdKitchen', order: 2 },
      { name: 'RO Water (Aquaguard)', icon: 'MdWaterDrop', order: 3 },
      { name: 'Washing Machine', icon: 'MdLocalLaundryService', order: 4 },
      { name: 'Refrigerator', icon: 'TbFridge', order: 5 },
      { name: 'Attached Washroom', icon: 'FaBath', order: 6 },
      { name: 'Cupboard', icon: 'MdStorage', order: 7 },
      { name: 'Study Table', icon: 'MdTableBar', order: 8 },
      { name: 'Chair', icon: 'MdChair', order: 9 },
      { name: 'High-Speed WiFi', icon: 'FaWifi', order: 10 },
      { name: 'Geyser', icon: 'MdHotTub', order: 11 },
      { name: 'CCTV', icon: 'MdVideocam', order: 12 },
      { name: 'Power Backup', icon: 'MdBolt', order: 13 },
      { name: 'Daily Room Cleaning', icon: 'MdCleaningServices', order: 14 },
      { name: 'Biometric Entry', icon: 'MdFingerprint', order: 15 },
      { name: 'Double Sharing Rooms', icon: 'MdBed', order: 16 },
    ]);
    console.log('✅ Amenities seeded');

    // Seed Testimonials
    await Testimonial.insertMany([
      { name: 'Priya Sharma', rating: 5, review: 'Amazing PG! The rooms are clean, AC works perfectly, and the staff is very helpful. I feel completely safe here. Best decision I made for my college accommodation!', college: 'Delhi University', isActive: true },
      { name: 'Ananya Patel', rating: 5, review: 'Royal Blue PG is like a home away from home. The facilities are top-notch, WiFi is fast, and the biometric entry makes me feel secure. Highly recommended!', college: 'BITS Pilani', isActive: true },
      { name: 'Sneha Reddy', rating: 4, review: 'Living here has been a great experience. The kitchen is well-maintained, rooms are spacious, and the location is very convenient. The management is professional and responsive.', college: 'Working Professional', isActive: true },
      { name: 'Kavya Singh', rating: 5, review: 'I was worried about finding safe accommodation in a new city, but Royal Blue PG exceeded all my expectations. The CCTV coverage and 24/7 security give my parents peace of mind too!', college: 'IIT Delhi', isActive: true },
    ]);
    console.log('✅ Testimonials seeded');

    // Seed Content
    await Content.insertMany([
      { section: 'hero', key: 'title', value: 'ROYAL BLUE PG' },
      { section: 'hero', key: 'subtitle', value: 'Premium Girls Hostel with Safe, Comfortable & Affordable Living' },
      { section: 'about', key: 'title', value: 'About Royal Blue PG' },
      { section: 'about', key: 'content', value: 'Royal Blue PG provides premium accommodation exclusively for girls. We focus on safety, hygiene, comfort, and a peaceful environment for students and working professionals. Our rooms are well maintained with modern amenities and 24×7 security.' },
      { section: 'contact', key: 'phone', value: '+91 98765 43210' },
      { section: 'contact', key: 'whatsapp', value: '+91 98765 43210' },
      { section: 'contact', key: 'email', value: 'info@royalbluepg.com' },
      { section: 'contact', key: 'address', value: '123, Royal Blue Building, Near ABC College, Sector 15, New Delhi - 110001' },
      { section: 'contact', key: 'hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 5:00 PM' },
    ]);
    console.log('✅ Content seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin credentials: admin@royalbluepg.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
