module.exports = (sequelize, DataTypes) => {
    const Ballot = sequelize.define("Ballot", {
        ballot_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_issue : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_issue_position : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_issue_score : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ballot_cast_by : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_user : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ballot_active : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        ballot_expiration : {
            type: 'TIMESTAMP',
            allowNull: true
        }
    });
    return Ballot;
}
