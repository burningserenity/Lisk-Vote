'use strict';

module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define("Position", {
        position_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        position_tally : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    // Issue has many Positions

    return Position;
}
