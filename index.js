const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const workersRouts = require("./routs/workers");
const workersAccRouts = require("./routs/workersAcc");
const busesRouts = require("./routs/buses");
const waybillsRouts = require("./routs/waybills");
const routsListRouts = require("./routs/routsList");
const stationsRouts = require("./routs/stations");
const newsRouts = require("./routs/news");
const newsListRouts = require("./routs/newsList");
const vacancyRouts = require("./routs/vacancy");
const vacancyListRouts = require("./routs/vacancyList");
const aboutRouts = require("./routs/about");
const aboutListRouts = require("./routs/aboutList");
const userRouts = require("./routs/user");
const registrationRouts = require("./routs/registration");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});
app.get('/', (req, res) => res.render('dashboard.hbs', {
    layout: 'dashboard'
}));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/workers', workersRouts);
app.use('/workersAcc', workersAccRouts);
app.use('/buses', busesRouts);
app.use('/waybills', waybillsRouts);
app.use('/routsList', routsListRouts);
app.use('/stations', stationsRouts);
app.use('/news', newsRouts);
app.use('/newsList', newsListRouts);
app.use('/vacancy', vacancyRouts);
app.use('/vacancyList', vacancyListRouts);
app.use('/about', aboutRouts);
app.use('/aboutList', aboutListRouts);
app.use ('/user', userRouts);
app.use ('/registration', registrationRouts);

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



