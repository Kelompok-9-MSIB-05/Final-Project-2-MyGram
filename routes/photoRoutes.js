const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.post('/', photoController.createPhoto);
router.get('/', photoController.getAllPhotos);
router.put('/:photoId', photoController.updatePhoto);
router.delete('/:photoId', photoController.deletePhoto);

module.exports = router;
