/* eslint-disable no-undef */
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const InviteModel = require('../../src/models/invite');

describe('Invite model', () => {
  const Invite = InviteModel(sequelize, dataTypes);
  const invite = new Invite();

  checkModelName(Invite)('Invite');

  context('properties', () => {
    ['id', 'email_address', 'invite_hash', 'status'].forEach(
      checkPropertyExists(invite),
    );
  });
});
