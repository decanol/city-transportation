const {Router} = require("express");
const WorkersAccSchema = require("../models/WorkersAccSchema");
const BusesSchema = require("../models/BusesSchema");
const WorkersSchema = require("../models/WorkersSchema");
const format = require("date-fns/format");
const router = Router();

router.get("/", async (req, res) => {
    const workersAccData = await WorkersAccSchema.find({})
        .lean();

    const buses = await BusesSchema.find().lean();
    const workers = await WorkersSchema.find().lean();

    const workersAcc = workersAccData.map((el) => ({
        ...el, accept_date: format(el.accept_date, 'dd.MM.yyyy')}));

    res.render("workersAcc", {
        title: "workers acc",
        isWorkersAcc: true,
        workersAcc,
        buses,
        workers
    })
});

router.post("/create", async (req, res) => {
    const workersAcc = new WorkersAccSchema({
        reg_number: req.body.reg_number,
        post: req.body.post,
        accept_date: req.body.accept_date,
        tail_number: req.body.tail_number
    });

    await workersAcc.save();
    res.redirect("/workersAcc")

});

router.get("/delete/:id", async (req, res) => {
    const workersAcc = await WorkersAccSchema.findById(req.params.id);

    await workersAcc.delete();

    res.redirect("/workersAcc");
});

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
