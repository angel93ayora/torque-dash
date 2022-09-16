module.exports = (sequelize, DataTypes) => {
    // define Session
    const ForwardUrl = sequelize.define('ForwardUrl', {
        value: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {});

    return ForwardUrl;
};