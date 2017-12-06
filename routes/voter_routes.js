const voter = require('../models').Voter;
const ballot = require("../models").Ballot;
const registration = require("../models").Registration;
const router = require("express").Router();
const path = require('path');

// Select all voters
router.get("/api/voters/all", (req, res) => {
    voter.findAll().then(dbVoter => {
        //console.log(dbVoter);
        res.json(dbVoter);
    });
});

// Select a single voter by query
router.get("/api/voters", (req, res) => {
    if (req.query.address) {
        voter.findOne({
            where: {
                voter_address: req.query.address
            }
        }).then(dbVoter => {
            console.log(dbVoter);
            res.json(dbVoter);
        });
    }
    else if (req.query.passphrase) {
        voter.findOne({
            where: {
                voter_passphrase: req.query.passphrase
            }
        }).then(dbVoter => {
            console.log(dbVoter);
            res.json(dbVoter);
        });
    }
    else (res.redirect("/api/voters/all"));
});

// Select a single voter by passphrase ---- will become hash of passphrase
router.get("/api/voters?pass=:passphrase", (req, res) => {
    voter.findOne({
        where: {
            voter_passphrase: req.params.passphrase
        }
    }).then(dbVoter => {
        console.log(req.params.passhprase);
        res.json(dbVoter);
    });
});

router.get("/api/voters?addr=:address", (req, res) => {
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
    let address = "";
    voter.findAll().then(dbList => {
        voterList = dbList.map((voter) => {
            return voter.voter_address;
        });
        voterList.length < 1 ? address = '100000000000000L' :
            address = (parseInt((voterList[voterList.length - 1].split("")).slice(0, -1).join("")) + parseInt(1)) + 'L';
        console.log(address);
        voter.create({
            voter_address: address,
            voter_passphrase: req.body.passphrase,
            voter_firstName: req.body.firstName,
            voter_lastName: req.body.lastName,
            voter_email: req.body.email
        }).then(dbVoter => {
            res.redirect('/openvotes');
        });
    });
});

// Delete a voter ---- not necessary to implement
router.delete("/api/voters/:address", (req, res) => {
    voter.destroy({
        where: {
            voter_address: req.params.address
        }
    }).then(dbVoter => {
        res.json(dbVoter);
    });
});

// Update a voter ---- This is only for updating first/last name, and/or email... neither password nor address can ever be changed.
router.put("/api/voters", (req, res) => {
    voter.update(req.body,
        {
            where: {
                voter_address: req.body.address
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

// TODO: Get voters not registered for a ballot
// TODO: Prevent voters from being re-registered for the same ballot

module.exports = router;
