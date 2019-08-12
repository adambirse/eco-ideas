module.exports = (sequelize, DataTypes) => {

    const Idea = sequelize.define('idea', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        text: DataTypes.STRING
    });

    return Idea;
};


