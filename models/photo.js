// models/photo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Photo = sequelize.define('Photo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    posterImageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  });

  Photo.associate = (models) => {
    Photo.belongsTo(models.User);
    Photo.hasMany(models.Comment);
  };

  return Photo;
};
