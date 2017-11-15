module.exports = (sequelize, DataTypes) => {
    const Voter = sequelize.define("Voter", {
        voter_address : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        voter_passphrase : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        voter_currenthash : {
            type: DataTypes.STRING,
            allowNull: true
        },
        voter_stake : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        voter_firstName : {
            type: DataTypes.STRING,
            allowNull: true
        },
        voter_lastName : {
            type: DataTypes.STRING,
            allowNull: true
        },
        voter_email : {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Voter;
}
