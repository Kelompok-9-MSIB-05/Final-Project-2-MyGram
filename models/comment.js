// models/comment.js

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config'); // Sesuaikan dengan struktur proyek Anda

class Comment extends Model {
  static associate(models) {
    Comment.belongsTo(models.User, { foreignKey: 'UserId' });
    Comment.belongsTo(models.Photo, { foreignKey: 'PhotoId' });
  }
}

Comment.init({
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PhotoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Comment cannot be empty',
      },
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
}, {
  sequelize,
  modelName: 'Comment',
});

module.exports = Comment;
