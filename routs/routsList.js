const {Router} = require("express");
const RoutsListSchema = require("../models/RoutsListSchema");
const StationsSchema = require("../models/StationsSchema");
const router = Router();

router.get("/", async (req, res) => {
    const routsListData = await RoutsListSchema.find({})
        .lean();

    const stations = await StationsSchema.find().lean();

    res.render("routsList", {
        title: "routsList",
        isRoutsList: true,
        routsListData,
        stations
    })
});


//edit


router.post("/create", async (req, res) => {
    const routsList = new RoutsListSchema({
        rout_number: req.body.rout_number
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
