//photoseeder
const { Photo } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambahkan data photo di sini
    await Photo.bulkCreate([
      {
        title: 'Beautiful Sunset',
        caption: 'An amazing sunset captured in all its glory.',
        poster_image_url: 'https://example.com/sunset.jpg',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
