'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      {
        title: 'Beautiful Sunset',
        caption: 'Nature is amazing!',
        poster_image_url: 'https://example.com/sunset.jpg',
        UserId: UserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan data photo lainnya jika diperlukan
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Photos', null, {});
  }
};
