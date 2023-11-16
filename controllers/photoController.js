const { Photo } = require('../models');

class PhotoController {
  static async addPhoto(req, res) {
    try {
      const { title, caption, poster_image_url, UserId } = req.body;
      const data = await Photo.create({ title, caption, poster_image_url, UserId });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
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
      const data = await Photo.findByPk(id);
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
        { title, caption, poster_image_url },
        {
          where: { id },
          returning: true,
        }
      );
      if (!data[0]) {
        throw {
          code: 404,
          message: 'Data Not Found',
        };
      }
      res.status(200).json(data[1][0]);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deletePhoto(req, res) {
    try {
      const { id } = req.params;
      const data = await Photo.destroy({ where: { id } });
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
