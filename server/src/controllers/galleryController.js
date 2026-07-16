const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');

/** @desc Get all gallery images | @route GET /api/gallery */
exports.getImages = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Upload image | @route POST /api/gallery */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }

    const image = await Gallery.create({
      imageUrl: req.file.path || req.file.location,
      publicId: req.file.filename,
      category: req.body.category,
      caption: req.body.caption || '',
      order: req.body.order || 0,
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Delete image | @route DELETE /api/gallery/:id */
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete from Cloudinary if publicId exists
    if (image.publicId) {
      try { await cloudinary.uploader.destroy(image.publicId); } catch (e) { /* ignore */ }
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
