// controllers/photoController.js
const { Photo } = require('../models');

class PhotoController {
  static async addPhoto(req, res) {
    try {
      const userData = req.UserData;
      const { title, caption, poster_image_url } = req.body;

      const data = await Photo.create({
        title,
        caption,
        poster_image_url,
        UserId: userData.id,
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPhoto(req, res) {
    try {
      const { title, caption, poster_image_url, UserId } = req.body;
      const photo = await Photo.create({ title, caption, poster_image_url, UserId });

      // Mengambil ID yang baru dibuat
      const newPhoto = await Photo.findByPk(photo.id);

      res.status(201).json(newPhoto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllPhotos(req, res) {
    try {
      const data = await Photo.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const userData = req.UserData;

      const data = await Photo.findOne({
        where: {
          id,
          UserId: userData.id,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: 'Data Not Found',
        };
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async updatePhoto(req, res) {
    try {
      const { title, caption, poster_image_url } = req.body;
      const { id } = req.params;

      const data = await Photo.update(
        {
          title,
          caption,
          poster_image_url,
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
          message: 'Data Not Found',
        };
      }

      res.status(201).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deletePhotoById(req, res) {
    try {
      const { id } = req.params;

      const data = await Photo.destroy({
        where: {
          id,
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: 'Data Not Found',
        };
      }

      res.status(200).json('Success delete photo');
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports = PhotoController;
