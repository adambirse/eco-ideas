const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate((user, options) => {

        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });

    return User;
};


