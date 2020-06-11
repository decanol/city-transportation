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
const vacancyReplyRouts = require("./routs/vacancyReply");
const loginRouts = require('./routs/login.js');
const logoutRouts = require('./routs/logout.js');
const path = require("path");
const cookieParser = require('cookie-parser');
const UserSession = require('./models/UserSessionSchema.js');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        select:  function(selected, options) {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        }
    }
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => res.render('dashboard.hbs', {
    layout: 'dashboard'
}));
app.use ('/registration', registrationRouts);
app.use ('/login', loginRouts);
app.use ('/logout', logoutRouts);
app.use('/routsList', routsListRouts);
app.use('/newsList', newsListRouts);
app.use('/vacancyList', vacancyListRouts);
app.use(async function (req, res, next) {
    const session = req.cookies.session;
    const sessions = await UserSession.find({session});
    if(sessions.length > 0) {
        next();
    } else {
        res.redirect('/login');
    }
});

app.use('/workers', workersRouts);
app.use('/workersAcc', workersAccRouts);
app.use('/buses', busesRouts);
app.use('/waybills', waybillsRouts);
app.use('/stations', stationsRouts);
app.use('/news', newsRouts);
app.use('/vacancy', vacancyRouts);
app.use('/about', aboutRouts);
app.use('/aboutList', aboutListRouts);
app.use ('/user', userRouts);
app.use ('/vacancyReply', vacancyReplyRouts);

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



