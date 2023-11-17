//commentSeeders
const { Comment } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        comment: 'Fotonya bagus sekali',
        UserId: 8,
        PhotoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
