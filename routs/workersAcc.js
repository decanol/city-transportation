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


//edit


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

module.exports = router;
