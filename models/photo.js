// models/photo.js

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../models'); // Sesuaikan dengan struktur proyek Anda

class Photo extends Model {
  static associate(models) {
    Photo.belongsTo(models.User, { foreignKey: 'UserId' });
    Photo.hasMany(models.Comment, { foreignKey: 'PhotoId' });
  }
}

Photo.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Title cannot be empty',
      },
    },
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Caption cannot be empty',
      },
    },
  },
  poster_image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Poster image URL cannot be empty',
      },
      isUrl: {
        args: true,
        msg: 'Invalid URL format for poster image',
      },
    },
  },
  UserId: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Photo',
});

module.exports = Photo;
