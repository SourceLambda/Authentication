'use strict';

const { UserSchema, USER_TABLE } = require("./../models/user.model");
/**More models should be placed here If I created new models like:
const { UserSchema, USER_TABLE } = require("./../models/anotherone.model");
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    /**More models should be placed here If I created new models like:
    await queryInterface.createTable(ANOTHER_TABLE, AnotherSchema);
    */
  },
  // I can use the following to implement rollbacks like git with the commits. It rollback what up made
  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE);
    /**More models should be placed here If I created new models like:
    await queryInterface.drop(ANOTHER_TABLE);
    */
  }
};
