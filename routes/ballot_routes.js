const router = require("express").Router();
const sequelize = require("../models").sequelize;
const ballot = require("../models").Ballot;
const voter = require("../models").Voter;
const issue = require("../models").Issue;
const position = require("../models").Position;

// Select all ballots
router.get("/api/ballots", (req, res) => {
    ballot.findAll({
        include: [{
            model: issue,
            include: [{
                model: position
            }]
        }]
    }).then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
});

// Select ballot by id
router.get("/api/ballots/:id", (req, res) => {

    ballot.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: issue,
            include: [{
                model: position
            }]
        }]
    }).then(dbBallot => {
        res.json(dbBallot);
    });
});

// Select all ballots a voter is registered for
router.get("/api/ballots/registered/:voter_id", (req, res) => {
    let voterBallots = {};
    sequelize.transaction().then(go => {
        return voter.findOne({
            where: {
                id: req.params.voter_id,
            }
        }).then(dbVoter => {
            return dbVoter.getBallots({
                include: [{
                    model: issue,
                    include: [{
                        model: position
                    }]
                }]
            });
        }).then(dbRegistration => {
            voterBallot = dbRegistration;
            console.log(dbRegistration);
        }).then(() => go.commit())
          .catch(err => console.error("Transaction failed: ", err));
    }).then(() => res.json(voterBallot));
});

// Add new ballot
router.post("/api/ballots", (req, res) => {
    ballot.create({
        ballot_name: req.body.ballot_name,
        ballot_active: req.body.ballot_active,
        ballot_start: req.body.ballot_start,
        ballot_expiration: req.body.ballot_expiration,
        ballot_registered_voters: req.body.ballot_registered_voters
    }).then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
});

// Delete a ballot ---- not necessary to implement
router.delete("/api/ballots/:id", (req, res) => {
    ballot.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
});

// Update a ballot
router.put("/api/ballots/:id", (req, res) => {
    ballot.update({
        ballot_name: req.body.ballot_name,
        ballot_start: req.body.ballot_start,
        ballot_expiration: req.body.ballot_expiration
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
});

// Register voters for ballot
router.put("/api/ballots/register/:id", (req, res) => {
    let selBallot = {};
    let registration = {};
    sequelize.transaction().then(go => {
        return ballot.findOne({
            where: {
                id: req.params.id
            }
        }).then((dbBallot) => {
            selBallot = dbBallot;
            return voter.findOne({
                where: {
                    id: req.body.voter_id
                }
            });
        }).then((resVoter) => {
            return selBallot.addVoter(resVoter);
        }).then(dbRegistration => {
            return registration = dbRegistration;
        }).then(() => {
            ballot.update({
                ballot_registered_voters: selBallot.ballot_registered_voters + 1
            }, {
                where: {
                    id: selBallot.id
                }
            });
        }).then(() => {
            go.commit();
            console.log("Committing transaction...");
        }).catch(err => {
            go.rollback();
            console.error("Transaction failed: ", err)
        });
    }).then(() => {
        res.json(registration);
    });
});

// Activate or Deactivate ballot
router.put("/api/ballots/toggle/:id", (req, res) => {
    ballot.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbBallot => {
        let queryBool = false
        dbBallot.ballot_active ? queryBool = false : queryBool = true;
        ballot.update({
            ballot_active: queryBool
        }, {
            where: {
                id: req.params.id
            }
        });
    }).then((dbToggle) => {
        console.log(dbToggle);
        res.json(dbToggle);
    });
});

module.exports = router;
