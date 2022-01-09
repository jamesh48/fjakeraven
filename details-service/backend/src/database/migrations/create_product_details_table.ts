import { QueryInterface } from "sequelize/types";
("use strict");
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable("product_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_details: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("product_details");
  }
};
