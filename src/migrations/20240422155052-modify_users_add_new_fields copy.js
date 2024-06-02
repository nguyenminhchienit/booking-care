"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      "bookings", // table name
      "reason", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
