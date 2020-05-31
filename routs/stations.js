const {Router} = require("express");
const StationsSchema = require("../models/StationsSchema");
const router = Router();

router.get("/", async (req, res) => {
    const stations = await StationsSchema.find({})
        .lean();

    res.render("stations", {
        title: "stations",
        isStations: true,
        stations
    })
});


//edit


router.post("/create", async (req, res) => {
    const stations = new StationsSchema({
        stations: req.body.stations
    });

    await stations.save();
    res.redirect("/stations")

});

router.get("/delete/:id", async (req, res) => {
    const stations = await StationsSchema.findById(req.params.id);

    await stations.delete();

    res.redirect("/stations");
});

module.exports = router;
