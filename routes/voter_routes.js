const express = require('express');
const db = require('../models');

const router = express.Router();
const voter = db.Voter;

/* Root */

router.get("/", (req, res) => {
    voter.findAll().then(dbVoter => {
        console.log(dbVoter);
        res.json(dbVoter);
    });
});


/* API */

// Select all voters
router.get("/api/voters", (req, res) => {
    voter.findAll().then(dbVoter => {
        console.log(dbVoter);
        res.json(dbVoter);
    });
});

// Select a single voter by address
router.get("/api/voters/:address", (req, res) => {
    voter.findOne({
        where: {
            voter_address: req.params.address
        }
    }).then(dbVoter => {
        console.log(dbVoter);
        res.json(dbVoter);
    });
});

// Add a voter
router.post("/api/voters", (req, res) => {
    console.log(req.body);
    voter.create({
        voter_passphrase: req.body.passhprase,
        voter_firstName: req.body.firstName,
        voter_lastName: req.body.lastName,
        voter_email: req.body.email
    }).then(dbVoter => {
        res.json(dbVoter);
    });
});

// Delete a voter
router.delete("/api/voters/:address", (req, res) => {
    voter.destroy({
        where: {
            voter_address: req.params.address
        }
    }).then(dbVoter => {
        res.json(dbVoter);
    });
});

// Update a voter ---- This is only for updating first/last name, email, and/or username
router.put("/api/voters", (req, res) => {
    voter.update(req.body,
        {
            where: {
                address: req.body.address
            }
        }).then(dbVoter => {
            res.json(dbVoter);
    });
});

// Change a voter's stake
router.put("/api/voters/stake/:address", (req, res) => {
    voter.update({
        voter_stake: req.body.stake,
    },{
        where: {
            voter_address: req.params.address
        }
    }).then(dbVoter => {
        res.json(dbVoter);
    });
});

// Anonymise user per ballot
router.put("/api/voters/anon/:address", (req, res) => {
    voter.update({
        voter_currenthash: req.body.currenthash
    }, {
        where: {
            voter_address: req.params.address
        }
    }).then(dbVoter => {
        res.json(dbVoter);
    });
});

module.exports = router;
