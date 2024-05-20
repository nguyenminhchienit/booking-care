"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      "bookings", // table name
      "status", // new field name
      {
        type: Sequelize.ENUM("processing", "cancel", "completed"),
        allowNull: false,
        defaultValue: "processing",
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
