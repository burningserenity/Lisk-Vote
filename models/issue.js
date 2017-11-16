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
        Issue.belongsTo(models.Ballot, {
            foreignKey: 'in_ballot',
            targetKey: 'ballot_name'
        });
        Issue.hasMany(models.Position, {
            onDelete: "cascade"
        });
    };

    return Issue;
}
