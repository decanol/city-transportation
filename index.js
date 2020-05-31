const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const workersRouts = require("./routs/workers");
const workersAccRouts = require("./routs/workersAcc");
const busesRouts = require("./routs/buses");
const waybillsRouts = require("./routs/waybills");
// const routsRouts = require("./routs/routs");
const routsListRouts = require("./routs/routsList");
const stationsRouts = require("./routs/stations");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/workers', workersRouts);
app.use('/workersAcc', workersAccRouts);
app.use('/buses', busesRouts);
app.use('/waybills', waybillsRouts);
// app.use('/routs', routsRouts);
app.use('/routsList', routsListRouts);
app.use('/stations', stationsRouts);

async function start() {
    try {
        await mongoose.connect("mongodb+srv://decanol:tronsister@cluster0-qtvy0.mongodb.net/todos", {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log("Server's been started")
        });

    } catch (e) {
        console.log(e);
    }
}

start();



