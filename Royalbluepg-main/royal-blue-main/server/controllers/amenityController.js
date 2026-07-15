const Amenity = require('../models/Amenity');

/** @desc Get all amenities | @route GET /api/amenities */
exports.getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find().sort({ order: 1 });
    res.json({ success: true, data: amenities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Add amenity | @route POST /api/amenities */
exports.addAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json({ success: true, data: amenity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update amenity | @route PUT /api/amenities/:id */
exports.updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!amenity) return res.status(404).json({ success: false, message: 'Amenity not found' });
    res.json({ success: true, data: amenity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Delete amenity | @route DELETE /api/amenities/:id */
exports.deleteAmenity = async (req, res) => {
  try {
    await Amenity.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Amenity deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
