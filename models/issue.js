'use strict';

module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("Issue", {
        issue_name : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Issue.associate = (models) => {
        // Ballot has many Issues
        Issue.hasMany(models.Position, {
            onDelete: "cascade"
        });
    };

    return Issue;
}
