'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Rides', 'otp', {
      type: Sequelize.STRING,
      allowNull: false,
       defaultValue: '0000'
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Rides', 'otp');
  }
};
