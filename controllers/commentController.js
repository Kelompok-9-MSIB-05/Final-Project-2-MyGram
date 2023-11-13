const { Comment, Photo, User } = require('../models');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:commentController');
const { SECRET_KEY } = require('../config');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { comment, PhotoId } = req.body;
    const token = req.headers.token;

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Create comment for the authenticated user
    const newComment = await Comment.create({
      comment,
      UserId: decoded.userId,
      PhotoId,
    });

    debug('Comment created successfully');
    return res.status(201).json({
      comment: {
        id: newComment.id,
        comment: newComment.comment,
        UserId: newComment.UserId,
        PhotoId: newComment.PhotoId,
        updatedAt: newComment.updatedAt,
        createdAt: newComment.createdAt,
      },
    });
  } catch (error) {
    debug('Error creating comment:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all comments for the authenticated user
exports.getAllComments = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Fetch comments for the authenticated user
    const comments = await Comment.findAll({
      where: { UserId: decoded.userId },
      include: [
        {
          model: Photo,
          attributes: ['id', 'title', 'caption', 'poster_image_url'],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'profile_image_url', 'phone_number'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'username', 'profile_image_url', 'phone_number'],
        },
      ],
    });

    debug('Fetched all comments successfully');
    return res.status(200).json({ comments });
  } catch (error) {
    debug('Error fetching comments:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a comment (user can only update their own comments)
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment: newComment } = req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    // Check if the user owns the comment
    if (comment.UserId !== decoded.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the comment
    await comment.update({
      comment: newComment,
    });

    debug('Comment updated successfully');
    return res.status(200).json({
      comment: {
        id: comment.id,
        comment: comment.comment,
        UserId: comment.UserId,
        PhotoId: comment.PhotoId,
        updatedAt: comment.updatedAt,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    debug('Error updating comment:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a comment (user can only delete their own comments)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    // Check if the user owns the comment
    if (comment.UserId !== decoded.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the comment
    await comment.destroy();

    debug('Comment deleted successfully');
    return res.status(200).json({ message: 'Your comment has been successfully deleted' });
  } catch (error) {
    debug('Error deleting comment:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
