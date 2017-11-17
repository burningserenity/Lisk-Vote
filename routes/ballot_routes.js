const router = require("express");
const ballot = require("../models").Ballot;
const registration = require("../models").Registration;
const path = require('path');

// Select all ballots
router.get("/api/ballots", (req, res) => {
    ballot.findAll().then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
});

// Select ballot by id
router.get("/api/ballots/:id", (req, res) => {
    ballot.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbBallot => {
        console.log(dbBallot);
        res.json(dbBallot);
    });
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
        ballot_expiration: req.body.expiration
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
    voter.findOne({
        where: {
            id: req.body.voter_id
        }
    }).then(() => ballot.findOne({
        where: {
            id: req.body.ballot_id
        }
    })).then(() => voter.setBallot({
        ballot_id: req.body.ballot_id,
        voter_id: req.body.voter_id
    }));
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
    });
});
