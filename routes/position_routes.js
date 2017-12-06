const router = require("express").Router();
const issue = require("../models").Issue;
const ballot = require("../models").Ballot;
const position = require("../models").Position;

// Create a position to take on an issue
router.post("/api/positions", (req, res) => {
    position.create({
        position_name: req.body.position_name,
        ballot_id: req.body.ballot_id,
        issue_id: req.body.issue_id
    }).then(dbPosition => {
        console.log(dbPosition);
        res.json(dbPosition);
    });
});

// Get all positions belonging to an issue
router.get("/api/issues/:issue_id", (req, res) => {
    position.findAll({
        where: {
            issue_id: req.params.issue_id
        },
        include: [{
            model: issue
        }]
    }).then(dbPosition => {
        console.log(dbPosition);
        res.json(dbPosition)
    });
});

// Update a position if the ballot it belongs to is inactive
router.put("/api/positions/:id", (req, res) => {
    position.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: issue,
            include: [{
                model: ballot
            }]
        }]
    }).then(dbPosition => {
        if (dbPosition.Issue.Ballot.ballot_active)
            return res.json(`Cannot update position ${dbPosition.id}; ballot is active.`);

        dbPosition.update({
            position_name: req.body.position_name
        }).then(() => res.json(dbPosition));
    });
});

// Delete a position if the ballot it belongs to is inactive
router.delete("/api/positions/:id", (req, res) => {
    position.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: issue,
            include: [{
                model: ballot
            }]
        }]
    }).then(dbPosition => {
        if (dbPosition.Issue.Ballot.ballot_active)
            return res.json(`Cannot delete position ${dbPosition.id}; ballot is active.`);

        dbPosition.destroy().then(() => res.json(dbPosition));
    });
});

module.exports = router;
