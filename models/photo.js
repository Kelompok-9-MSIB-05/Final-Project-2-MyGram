'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: 'UserId' });
      Photo.hasMany(models.Comment, { foreignKey: 'PhotoId' });
    }
  }

  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
        },
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
        },
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
          isUrl: {
            args: true,
            message: 'Invalid URL format',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );

  return Photo;
};