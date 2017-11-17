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
const ballot_routes = require("./routes/ballot_routes.js");
const voter_routes = require("./routes/voter_routes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('client/build'));

app.use(express.static('public'));
app.use(methodOverride("_method"));

app.use("/", voter_routes, ballot_routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'));
});

console.log(`Listening on port ${port}...`);

db.sequelize.sync({force: true}).then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}` );
    });
});
