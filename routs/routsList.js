const {Router} = require("express");
const RoutsListSchema = require("../models/RoutsListSchema");
const router = Router();

router.get("/", async (req, res) => {
    const routsListData = await RoutsListSchema.find({})
        .lean();

    res.render("routsList", {
        title: "routsList",
        isRoutsList: true,
        routsListData
    })
});


//edit


router.post("/create", async (req, res) => {
    const routsList = new RoutsListSchema({
        rout_number: req.body.rout_number,
        start_station: req.body.start_station,
        finish_station: req.body.finish_station,
        station: req.body.station,
        mileage: req.body.mileage
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
