const Testimonial = require('../models/Testimonial');

/** @desc Get active testimonials | @route GET /api/testimonials */
exports.getTestimonials = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Add testimonial | @route POST /api/testimonials */
exports.addTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update testimonial | @route PUT /api/testimonials/:id */
exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Delete testimonial | @route DELETE /api/testimonials/:id */
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
