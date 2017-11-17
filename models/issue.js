'use strict';

module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("Issue", {
        issue_name : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    Issue.associate = (models) => {
        Issue.hasMany(models.Position, {
            onDelete: "cascade"
        });
    };

    return Issue;
}
