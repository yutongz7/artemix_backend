var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 4000;

try {
    mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("DB connected");
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
});
} catch (error) {
    console.error("Can't connect with DB");
}

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./routes')(app, router);

app.listen(port);
console.log('Server runing on port ', + port);