// Dependencies
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");

// Express configuration
const app = express();
// Heroku uses Heroku's port, the default Lisk testnet port is 7000
const port = process.env.PORT || 7000;

const db = require("./models");
const voter_routes = require("./routes/voter_routes.js");
const ballot_routes = require("./routes/ballot_routes.js");
const issue_routes = require("./routes/issue_routes.js");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('client/build'));

app.use(express.static('public'));
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


app.use("/", voter_routes, ballot_routes, issue_routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'));
});

console.log(`Listening on port ${port}...`);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}` );
    });
});
