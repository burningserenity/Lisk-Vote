const router = require("express").Router();
const issue = require("../models").Issue;

// Create an issue to vote on
router.post("/api/issues", (req, res) => {
    issue.create({
        issue_name: req.body.issue_name,
        ballot_id: req.body.ballot_id
    }).then(dbIssue => {
        console.log(dbIssue);
        res.json(dbIssue);
    });
});

// Get issues associated with a ballot
router.get("/api/issues/:ballot_id", (req, res) => {
    issue.findAll({
        where: {
            ballot_id: req.params.ballot_id
        }
    }).then(dbIssue => {
        console.log(dbIssue);
        res.json(dbIssue);
    });
});

router.put("/api/issues/:id", (req, res) => {
    issue.findOne({
        where: {
            id: req.params.id
        },
        include: [{model: Ballot}]
    }).then((dbIssue) => {
        if ( dbIssue.Ballot.ballot_active )
            return res.json('Ballot is active');
        
        dbIssue.update({
            issue_name: req.body.issue_name
        }).then(() => res.json(dbIssue.Ballot) );
    });
});

router.delete("/api/issues/:id", (req, res) => {
    // Check to make sure ballot it belongs to isn't active?
    issue.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbIssue => {
        console.log(dbIssue);
        res.json(dbIssue);
    });
});

module.exports = router;
