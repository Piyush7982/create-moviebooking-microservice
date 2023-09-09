const {BookingStatus}= require("../util/common")
const {INITIATED,BOOKED,PENDING,CANCELLED}= BookingStatus.status
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      showId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalTickets: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values:[INITIATED,BOOKED,PENDING,CANCELLED],
        defaultValue:PENDING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};