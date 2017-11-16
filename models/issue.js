'use strict';

module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("Issue", {
        issue_name : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        ballot_name : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Issue.associate = (models) => {
        Issue.belongsTo(models.Ballot, {
            foreignKey: 'in_ballot',
            targetKey: 'ballot_name'
        });
    };

    return Issue;
}
