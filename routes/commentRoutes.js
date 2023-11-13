const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authentication } = require('../middleware/auth');

router.post('/', authentication, commentController.createComment);
router.get('/', authentication, commentController.getAllComments);
router.put('/:id', authentication, commentController.updateComment);
router.delete('/:id', authentication, commentController.deleteComment);

module.exports = router;
