'use strict'

module.exports = (sequelize, DataTypes) => {
    const Ballot = sequelize.define("Ballot", {
        ballot_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_active : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        ballot_start : {
            type: 'TIMESTAMP',
            defaultValue: 'now()',
            allowNull: false
        },
        ballot_expiration : {
            type: 'TIMESTAMP',
            allowNull: true
        },
        ballot_registered_voters : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ballot_casts : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    
    Ballot.associate = (models) => {
        Ballot.hasMany(models.Issue, {
            foreignKey: 'ballot_id',
            onDelete: "cascade"
        });
        Ballot.hasMany(models.Position, {
            foreignKey: 'ballot_id',
            onDelete: "cascade"
        });
        Ballot.belongsToMany(models.Voter, {
            through: 'Registration',
            foreignKey: 'ballot_id',
        });
        /*Ballot.belongsToMany(models.Voter, {
            through: 'VotedOn',
            foreignKey: 'ballot_id'
        });*/
    };

    return Ballot;
}
