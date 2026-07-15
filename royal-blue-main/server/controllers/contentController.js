const Content = require('../models/Content');

/** @desc Get all content | @route GET /api/content */
exports.getContent = async (req, res) => {
  try {
    const content = await Content.find();
    // Transform to nested object: { hero: { title: '...', subtitle: '...' }, about: { ... } }
    const structured = {};
    content.forEach((item) => {
      if (!structured[item.section]) structured[item.section] = {};
      structured[item.section][item.key] = item.value;
    });
    res.json({ success: true, data: structured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update content | @route PUT /api/content */
exports.updateContent = async (req, res) => {
  try {
    const { section, key, value } = req.body;
    const content = await Content.findOneAndUpdate(
      { section, key },
      { value },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
