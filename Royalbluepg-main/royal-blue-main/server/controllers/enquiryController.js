const Enquiry = require('../models/Enquiry');
const transporter = require('../config/email');

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

/** @desc Get all enquiries | @route GET /api/enquiries */
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Submit enquiry (public) | @route POST /api/enquiries */
exports.submitEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.validatedBody || req.body);

    // Send email notification to admin (non-blocking)
    try {
      await transporter.sendMail({
        from: `"Royal Blue PG" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry from ${enquiry.fullName}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(enquiry.fullName)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
          <p><strong>College/Company:</strong> ${escapeHtml(enquiry.college || 'N/A')}</p>
          <p><strong>Occupation:</strong> ${escapeHtml(enquiry.occupation)}</p>
          <p><strong>Room Preference:</strong> ${escapeHtml(enquiry.roomPreference || 'N/A')}</p>
          <p><strong>Move-in Date:</strong> ${escapeHtml(enquiry.moveInDate || 'N/A')}</p>
          <p><strong>Duration:</strong> ${escapeHtml(enquiry.duration || 'N/A')}</p>
          <p><strong>Message:</strong> ${escapeHtml(enquiry.message || 'N/A')}</p>
        `,
      });
    } catch (emailError) {
      console.log('Email notification failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update enquiry status | @route PUT /api/enquiries/:id */
exports.updateEnquiry = async (req, res) => {
  try {
    const { status } = req.validatedBody || req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Export enquiries to Excel | @route GET /api/enquiries/export */
exports.exportEnquiries = async (req, res) => {
  try {
    const ExcelJS = require('exceljs');
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Enquiries');

    sheet.columns = [
      { header: 'Name', key: 'fullName', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'College/Company', key: 'college', width: 20 },
      { header: 'Occupation', key: 'occupation', width: 15 },
      { header: 'Room Preference', key: 'roomPreference', width: 15 },
      { header: 'Move-in Date', key: 'moveInDate', width: 15 },
      { header: 'Duration', key: 'duration', width: 12 },
      { header: 'Message', key: 'message', width: 30 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Style header row
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3F51B5' } };

    enquiries.forEach((enq) => {
      sheet.addRow({
        ...enq.toObject(),
        moveInDate: enq.moveInDate ? new Date(enq.moveInDate).toLocaleDateString() : 'N/A',
        createdAt: new Date(enq.createdAt).toLocaleString(),
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=enquiries.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
