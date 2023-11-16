'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        comment: 'Amazing photo!',
        UserId: UserId,
        PhotoId: PhotoId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan data comment lainnya jika diperlukan
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
