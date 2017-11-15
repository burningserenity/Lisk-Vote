module.exports = (sequelize, DataTypes) => {
    const Voter = sequelize.define("Voter", {
        voter_address : {
            type: DataTypes.STRING,
            allowNull: false
        },
        voter_username : {
            type: DataTypes.STRING,
            allowNull: false
        }
        voter_currentHash : {
            type: DataTypes.STRING,
            allowNull: false
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
        voter_firstName : {
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
