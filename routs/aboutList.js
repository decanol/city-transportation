const {Router} = require("express");
const AboutSchema = require("../models/AboutSchema");
const router = Router();

router.get("/", async (req, res) => {
    const about = await AboutSchema.find({})
        .lean();

    res.render("aboutList", {
        layout: 'dashboard',
        title: "About Info",
        about
    })
});


module.exports = router;
