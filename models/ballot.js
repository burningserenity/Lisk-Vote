
module.exports = (sequelize, DataTypes) => {
    const Ballot = sequelize.define("Ballot", {
        ballot_name : {
            type: DataTypes.STRING,
            unique: true,
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
        }
    });
    
    Ballot.associate = (models) => {
        Ballot.hasMany(models.Issue, {
            onDelete: "cascade"
        });
        Ballot.belongsToMany(models.Voter, {
            through: 'Registration'
        });
    };

    return Ballot;
}
