//commentRoutes
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.post('/', CommentController.addComment);
router.get('/', CommentController.getAllComments);
router.get('/:id', CommentController.getCommentById);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteCommentById);

module.exports = router;
