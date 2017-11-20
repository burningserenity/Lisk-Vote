const router = require("express").Router();
const issue = require("../models").Issue;
const ballot = require("../models").Ballot;
const position = require("../models").Position;

// Create a position to take on an issue
router.post("/api/positions", (req, res) => {
    position.create({
        position_name: req.body.position_name,
        issue_id: req.body.issue_id
    }).then(dbPosition => {
        console.log(dbPosition);
        res.json(dbPosition);
    });
});

router.get("/api/issues/:issue_id", (req, res) => {
    position.findAll({
        where: {
            issue_id: req.params.issue_id
        }
    }).then(dbPosition => {
        console.log(dbPosition);
        res.json(dbPosition)
    });
});
