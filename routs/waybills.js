const {Router} = require("express");
const WaybillsSchema = require("../models/WaybillsSchema");
const WorkersAccSchema = require("../models/WorkersAccSchema");
const BusesSchema = require("../models/BusesSchema");
const RoutsListSchema = require("../models/RoutsListSchema");
const format = require("date-fns/format");
const router = Router();

router.get("/", async (req, res) => {
    const waybillsData = await WaybillsSchema.find({})
        .lean();

    const tail_number = await BusesSchema.find().lean();
    const rout_number = await RoutsListSchema.find().lean();
    const conductors = await WorkersAccSchema.find({post: 'Conductor'}).populate('worker').lean();
    const drivers = await WorkersAccSchema.find({post: 'Driver'}).populate('worker').lean();

    const waybills = waybillsData.map((el) => ({
        ...el,
        waybills_date: format(el.waybills_date, 'dd.MM.yyyy')
    }));

    res.render("waybills", {
        title: "waybills",
        isWaybills: true,
        waybills,
        rout_number,
        tail_number,
        conductors,
        drivers
    })
});

router.post("/create", async (req, res) => {
    const waybills = new WaybillsSchema({
        rout_number: req.body.rout_number,
        tail_number: req.body.tail_number,
        waybills_date: req.body.waybills_date,
        done_trips: req.body.done_trips,
        drivers: req.body.drivers,
        conductors: req.body.conductors
    });

    await waybills.save();
    res.redirect("/waybills")

});

router.get("/delete/:id", async (req, res) => {
    const waybills = await WaybillsSchema.findById(req.params.id);

    await waybills.delete();

    res.redirect("/waybills");
});

//---------Edit

router.get("/edit/:id", async (req, res) => {
    const waybills = await WaybillsSchema.findById(req.params.id).lean();
    waybills.waybills_date = format(waybills.waybills_date, 'dd.MM.yyyy');

    const tail_number = await BusesSchema.find().lean();
    const rout_number = await RoutsListSchema.find().lean();
    const conductors = await WorkersAccSchema.find({post: 'Conductor'}).populate('worker').lean();
    const drivers = await WorkersAccSchema.find({post: 'Driver'}).populate('worker').lean();


    res.render("edit-waybills", {
        title: "Waybills",
        isWaybills: true,
        tail_number,
        rout_number,
        conductors,
        drivers,
        waybills,
        id: waybills._id
    })
});

router.post("/edit/:id", async (req, res) => {
    const waybills = await WorkersAccSchema.findById(req.params.id);
    await waybills.update({
        rout_number: req.body.rout_number,
        tail_number: req.body.tail_number,
        waybills_date: req.body.waybills_date,
        done_trips: req.body.done_trips,
        drivers: req.body.drivers,
        conductors: req.body.conductors
    });
    await waybills.save();

    res.redirect("/waybills")
});

module.exports = router;
