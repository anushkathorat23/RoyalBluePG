import { useState, useEffect } from 'react';
import { enquiryAPI } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { FiDownload, FiCheck, FiX } from 'react-icons/fi';

const statusColors = {
  'new': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'contacted': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  'resolved': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  'rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
};

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await enquiryAPI.getAll();
      setEnquiries(res.data.data);
    } catch (error) {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await enquiryAPI.updateStatus(id, status);
      setEnquiries(enquiries.map(enq => enq._id === id ? { ...enq, status } : enq));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleExport = async () => {
    try {
      const res = await enquiryAPI.export();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'royalblue-enquiries.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Export failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-[#0f1117] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden text-sm">
      <Toaster />
      
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-transparent">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Enquiries</h2>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-lg font-medium transition-colors"
        >
          <FiDownload /> Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-[#0f1117] border-b border-gray-100 dark:border-gray-800">
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Date</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Name</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Contact</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Details</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-400text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                <td className="p-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800 dark:text-white">{enq.fullName}</div>
                  <div className="text-xs text-gray-500">{enq.occupation}</div>
                </td>
                <td className="p-4">
                  <div className="text-gray-800 dark:text-gray-300">{enq.phone}</div>
                  <div className="text-xs text-gray-500">{enq.email}</div>
                </td>
                <td className="p-4">
                  <div className="text-gray-800 dark:text-gray-300">{enq.roomPreference}</div>
                  <div className="text-xs text-gray-500">From: {enq.moveInDate ? new Date(enq.moveInDate).toLocaleDateString() : 'N/A'}</div>
                </td>
                <td className="p-4">
                  <select
                    value={enq.status}
                    onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border outline-none ${statusColors[enq.status]} cursor-pointer appearance-none text-center`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                   {/* Actions placeholder */}
                   <span className="text-xs text-gray-400">Updated: {new Date(enq.updatedAt).toLocaleTimeString()}</span>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">No enquiries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEnquiries;
