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
    let voterList = [];
    voter.findAll().then(dbList => {
        console.log(JSON.stringify(dbList, null, 2));
        voterList = dbList.map((voter) => {
            return voter.voter_address;
        });
        console.log(voterList);
        console.log(req.body);
        console.log( 'last element: ' + (parseInt((voterList[voterList.length - 1].split("")).slice(0, -1).join("")) + parseInt(1)) + 'L');
        let address = (parseInt((voterList[voterList.length - 1].split("")).slice(0, -1).join("")) + parseInt(1)) + 'L';
        console.log(address);
        voter.create({
            voter_address: address,
            voter_passphrase: req.body.passphrase,
            voter_firstName: req.body.firstName,
            voter_lastName: req.body.lastName,
            voter_email: req.body.email
        }).then(dbVoter => {
            res.json(dbVoter);
        });
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
