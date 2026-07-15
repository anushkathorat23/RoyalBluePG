const FAQ = require('../models/FAQ');

/** @desc Get active FAQs | @route GET /api/faqs */
exports.getFAQs = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const faqs = await FAQ.find(filter).sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Add FAQ | @route POST /api/faqs */
exports.addFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update FAQ | @route PUT /api/faqs/:id */
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Delete FAQ | @route DELETE /api/faqs/:id */
exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
