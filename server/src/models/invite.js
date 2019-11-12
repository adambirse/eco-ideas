module.exports = (sequelize, DataTypes) => {

  const Invite = sequelize.define('Invite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    invite_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['created', 'sent', 'accepted'],
      allowNull: false,
    },
  });
  return Invite;
};


