const router = require('express').Router();
const { getImages, uploadImage, deleteImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getImages);
router.post('/', protect, upload.single('image'), uploadImage);
router.delete('/:id', protect, deleteImage);

module.exports = router;
