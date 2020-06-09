const {Router} = require("express");
const AboutSchema = require("../models/AboutSchema");
const router = Router();

router.get("/", async (req, res) => {
    const about = await AboutSchema.find({})
        .lean();

    res.render("about", {
        title: "About Info",
        isAbout: true,
        about
    })
});


router.post("/create", async (req, res) => {
    const about = new AboutSchema({
        title_about: req.body.title_about,
        content_about: req.body.content_about
    });

    await about.save();
    res.redirect("/about")

});

router.get("/delete/:id", async (req, res) => {
    const about = await AboutSchema.findById(req.params.id);

    await about.delete();

    res.redirect("/about");
});

module.exports = router;
