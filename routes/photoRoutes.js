// routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');

router.post('/', PhotoController.addPhoto);
router.get('/', PhotoController.getAllPhotos);
router.get('/:id', PhotoController.getPhotoById);
router.put('/:id', PhotoController.updatePhoto);
router.delete('/:id', PhotoController.deletePhotoById);

module.exports = router;
