// models/comment.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'UserId' });
      Comment.belongsTo(models.Photo, { foreignKey: 'PhotoId' });
    }
  }

  Comment.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
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
      PhotoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Photo',
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
      modelName: 'Comment',
    }
  );

  return Comment;
};
