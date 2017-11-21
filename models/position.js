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

    Position.associate = (models) => {
        // Issue has many Positions
        Position.belongsTo(models.Issue, {
            foreignKey: "issue_id"
        });
        Position.belongsTo(models.Ballot, {
            foreignKey: "ballot_id"
        });
    };

    return Position;
}
