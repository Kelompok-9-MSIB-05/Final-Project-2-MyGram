const { Comment, User, Photo } = require("../models");

class CommentController {
  static async createComment(req, res) {
    try {
      const userData = req.UserData;

      const { comment, PhotoId } = req.body;

      const data = await Comment.create({
        comment,
        UserId: userData.id,
        PhotoId,
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllComments(req, res) {
    try {
      const data = await Comment.findAll({
        include: [User, Photo],
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateComment(req, res) {
    try {
      const { comment } = req.body;
      const { commentId } = req.params;

      const data = await Comment.update(
        { comment },
        {
          where: {
            id: commentId,
          },
          returning: true,
        }
      );

      if (!data[0]) {
        throw {
          code: 404,
          message: "Data Not Found",
        };
      }

      res.status(200).json(data[1]);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      const data = await Comment.destroy({
        where: {
          id: commentId,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: "Data Not Found",
        };
      }

      res.status(200).json("Success delete comment");
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports = CommentController;
