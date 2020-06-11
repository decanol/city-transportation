const {Router} = require("express");
const RoutsListSchema = require("../models/RoutsListSchema");
const StationsSchema = require("../models/StationsSchema");
const router = Router();

router.get("/", async (req, res) => {
    const routsList = await RoutsListSchema.find({}).populate('stations')
        .lean();

    const stations = await StationsSchema.find().lean();

    res.render("routsList", {
        title: "routsList",
        isRoutsList: true,
        routsList,
        stations
    })
});

router.post("/create", async (req, res) => {
    const routsList = new RoutsListSchema({
        rout_number: req.body.rout_number,
        rout_mileage: req.body.rout_mileage,
        trip_time: req.body.trip_time,
        planned_trips_number: req.body.planned_trips_number,
        stations: req.body.stations
    });

    await routsList.save();
    res.redirect("/routsList")

});

router.get("/delete/:id", async (req, res) => {
    const routsList = await RoutsListSchema.findById(req.params.id);

    await routsList.delete();

    res.redirect("/routsList");
});

module.exports = router;


//---------Edit

router.get("/edit/:id", async (req, res) => {
    const workerAcc = await WorkersAccSchema.findById(req.params.id).lean();
    workerAcc.accept_date = format(workerAcc.accept_date, 'dd.MM.yyyy');

    const buses = await BusesSchema.find().lean();
    const workers = await WorkersSchema.find().lean();

    res.render("edit-workers-acc", {
        title: "workersAcc",
        isWorkersAcc: true,
        buses,
        workers,
        workerAcc,
        id: workerAcc._id
    })
});

router.post("/edit/:id", async (req, res) => {
    const workerAcc = await WorkersAccSchema.findById(req.params.id);
    await workerAcc.update({
        reg_number: req.body.reg_number,
        post: req.body.post,
        accept_date: req.body.accept_date,
        tail_number: req.body.tail_number
    });
    await workerAcc.save();

    res.redirect("/workersAcc")
});

module.exports = router;
