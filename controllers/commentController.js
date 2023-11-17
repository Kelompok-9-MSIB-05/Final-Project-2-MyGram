//commentController
const { Comment } = require('../models');

class CommentController {
  static async addComment(req, res) {
    try {
      const { comment, UserId, PhotoId } = req.body;

      const data = await Comment.create({
        comment,
        UserId,
        PhotoId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllComments(req, res) {
    try {
      const data = await Comment.findAll();

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getCommentById(req, res) {
    try {
      const { id } = req.params;

      const data = await Comment.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: 'Comment Not Found',
        };
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async updateComment(req, res) {
    try {
      const { comment } = req.body;
      const { id } = req.params;

      const data = await Comment.update(
        {
          comment,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (!data[0]) {
        throw {
          code: 404,
          message: 'Comment Not Found',
        };
      }

      res.status(201).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deleteCommentById(req, res) {
    try {
      const { id } = req.params;

      const data = await Comment.destroy({
        where: {
          id,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: 'Comment Not Found',
        };
      }

      res.status(200).json('Success delete comment');
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports = CommentController;
