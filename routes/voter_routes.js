// const express = require('express');
const db = require('../models');

const router = require("express").Router();
const voter = db.Voter;

router.get("/", (req, res) => {
    voter.findAll().then(dbVoter => {
        console.log(dbVoter);
        res.json(dbVoter);
    });
});

module.exports = router;
