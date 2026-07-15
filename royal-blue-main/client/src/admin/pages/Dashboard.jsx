import { useState, useEffect } from 'react';
import { FiUsers, FiMessageSquare, FiImage } from 'react-icons/fi';
import { enquiryAPI, galleryAPI, testimonialAPI } from '../../services/api';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-[#0f1117] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    photos: 0,
    testimonials: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [enqRes, galRes, testRes] = await Promise.all([
          enquiryAPI.getAll(),
          galleryAPI.getAll(),
          testimonialAPI.getAll(true)
        ]);
        
        setStats({
          enquiries: enqRes.data.data.length,
          photos: galRes.data.data.length,
          testimonials: testRes.data.data.length
        });
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Enquiries" value={stats.enquiries} icon={FiUsers} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard title="Gallery Photos" value={stats.photos} icon={FiImage} colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
        <StatCard title="Testimonials" value={stats.testimonials} icon={FiMessageSquare} colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
      </div>

      <div className="bg-white dark:bg-[#0f1117] rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Welcome to Royal Blue PG Admin Panel</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Use the sidebar to navigate and manage different sections of your website. 
          You can view student enquiries, update gallery images, manage testimonials, and more.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
