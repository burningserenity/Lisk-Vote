const router = require("express").Router();
const sequelize = require("../models").sequelize;
const ballot = require("../models").Ballot;
const voter = require("../models").Voter;
const issue = require("../models").Issue;
const position = require("../models").Position;
const faker = require('faker');

// ballot.findAll().then(ballots => console.log(ballots));

// let count = 30;

// while ( count-- ) {
//     ballot.create({
//         ballot_name: faker.name.firstName(),
//         ballot_active: true,
//         ballot_start: faker.date.past(),
//         ballot_expiration: faker.date.future(),
//         ballot_registered_voters: 1
//     })
//     .then(result => console.log(console.log(result)))
//     .catch(err => console.log(err));
// }


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
    });
});

// Add a new ballot with issues and positions on the issues
/*router.post("/api/ballots", (req, res) => {
    ballot.create({
        ballot_name: req.body.ballot_name,
        ballot_active: req.body.ballot_active,
        ballot_start: req.body.ballot_start,
        ballot_expiration: req.body.ballot_expiration,
        ballot_registered_voters: req.body.ballot_registered_voters
    }).then(dbBallot => {
        return req.body.Issues.Issues.forEach((i, dbIssue) => {
            issue.create({
                issue_name: dbIssue[i].issue_name,
                ballot_id: dbBallot.id
            });
        });
    }).then(dbIssue => {
        return req.body.Positions.Positions.forEach((i, dbPosition) => {
            position.create({
                position_name: dbPosition[i].position_name,
                ballot_id: dbPosition[i].ballot_id,
                issue_id: dbPosition[i].issue_id
            });
        });
    }).then(() => {
        res.redirect("/api/ballots");
    });
}); */

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
    console.log(req.body.id);
    console.log(req.body.voter_id);
    console.log(req.params.id);
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

// Cast a vote
router.put("/api/ballots/vote/:ballot_id", (req, res) => {
    sequelize.transaction().then(go => {
        let voting = {};
        let election = {};
        return voter.findOne({
            where: {
                // This should be replaced with session token
                id: req.body.voter_id
            }
        }).then(currVoter => {
            voting = currVoter;
            return currVoter.getBallots({
                where: {
                    id: req.params.ballot_id
                }
            });
        }).then(voterBallots => {
            if (voterBallots == "") {
                go.rollback();
                console.error(`Voter ${voting.id} is not registered to vote on ballot ${req.params.ballot_id}.`);
                res.json(`Voter ${voting.id} is not registered to vote on ballot ${req.params.ballot_id}.`)
            }
            election = voterBallots;
            console.log(`\n${JSON.stringify(req.body, null, 2)}\n`);
            return req.body.position.forEach(currPosition => {
                console.log(currPosition);
                position.findOne({
                    where: {
                        id: currPosition
                    }
                }).then(found => {
                    found.update({
                        position_tally: (parseInt(found.position_tally) + parseInt(voting.voter_stake))    
                    });
                });
            });
        }).then(() => {
            console.log(election);
            console.log(election);
            console.log(election);
            console.log(election);
            console.log(election);
            return ballot.update({
                ballot_casts: (parseInt(election[0].ballot_casts) + 1)
            }, {
                where: {
                    id: election[0].id
                }
            });
        }).then(() => {
            return voting.removeBallot(election);
        }).then(() => go.commit())
            .catch(err => {
                go.rollback();
                console.error("Ballot cast failed: ", err)}
            );
    }).then(dbCast => {
        console.log(dbCast);
        res.json(dbCast);
    });
});

module.exports = router;
