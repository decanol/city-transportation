const {Router} = require("express");
const WaybillsSchema = require("../models/WaybillsSchema");
const WorkersAccSchema = require("../models/WorkersAccSchema");
const BusesSchema = require("../models/BusesSchema");
const format = require("date-fns/format");
const router = Router();

router.get("/", async (req, res) => {
    const waybillsData = await WaybillsSchema.find({})
        .lean();

    const tail_number = await BusesSchema.find().lean();
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
        tail_number,
        conductors,
        drivers
    })
});

router.post("/create", async (req, res) => {
    const waybills = new WaybillsSchema({
        way_number: req.body.way_number,
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

module.exports = router;
