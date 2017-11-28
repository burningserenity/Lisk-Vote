const router = require("express").Router();
const sequelize = require("../models").sequelize;
const voter = require("../models").Voter;
const passport = require("passport");

router.get("/login", (req, res, next) => {
    passport.use(new LocalStrategy(
        (voter_address, voter_passphrase, done){
            voter.findOne({voter_address: voter_address}, (err, voter) {
                if (err) return done(err);
                if (!voter) return done(null, false, { message: 'Incorrect address'});
                if (!voter.validPassword(voter_passphrase)) return done(null, false, { message : 'Incorrect passphrase'});
                return done(null, voter);
            });
        }));
});
