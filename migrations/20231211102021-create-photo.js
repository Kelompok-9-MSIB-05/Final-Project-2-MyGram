'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.STRING,
      },
      poster_image_url: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })

    await queryInterface.addConstraint('Photos', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'photo_user_id_fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Photos', 'user_id_fk')
    await queryInterface.dropTable('Photos')
  },
}
