module.exports = (sequelize, DataTypes) => {
    // define Session
    const ForwardUrl = sequelize.define('ForwardUrl', {
        value: {
            type: DataTypes.TEXT,
            unique: true
        }
    }, {});

    return ForwardUrl;
};