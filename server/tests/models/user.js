/* eslint-disable no-undef */
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../src/models/user');

describe('User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('User');

  context('properties', () => {
    ['id', 'email_address', 'password'].forEach(
      checkPropertyExists(user),
    );
  });

});
