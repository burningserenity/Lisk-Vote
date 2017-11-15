// Dependencies
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

// Express configuration
const app = express();
// Heroku uses Heroku's port, the default Lisk testnet port is 7000
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('node_modules/cirrus-ui/dist/cirrus.min.css'));
app.use(express.static('public'));
app.use(methodOverride("_method");

app.listen(port) {
    console.log(`Listening on port ${port}...`);
}
