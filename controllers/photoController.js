const { Photo, User, Comment } = require("../models");

class PhotoController {
  static async createPhoto(req, res) {
    try {
      const userData = req.UserData;

      const { poster_image_url, title, caption } = req.body;

      const data = await Photo.create({
        poster_image_url,
        title,
        caption,
        UserId: userData.id,
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllPhotos(req, res) {
    try {
      const data = await Photo.findAll({
        include: [User, Comment],
      });

      res.status(200).json({ photos: data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updatePhoto(req, res) {
    try {
      const { title, caption, poster_image_url } = req.body;
      const { photoId } = req.params;

      const data = await Photo.update(
        { title, caption, poster_image_url },
        {
          where: {
            id: photoId,
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

      res.status(200).json({ photo: data[1][0] });
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deletePhoto(req, res) {
    try {
      const { photoId } = req.params;

      const data = await Photo.destroy({
        where: {
          id: photoId,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: "Data Not Found",
        };
      }

      res.status(200).json("Success delete photo");
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports = PhotoController;
