const {Router} = require("express");
const NewsSchema = require("../models/NewsSchema");
const router = Router();

router.get("/", async (req, res) => {
    const news = await NewsSchema.find({})
        .lean();

    res.render("newsList", {
        layout: 'dashboard',
        title: "newsList",
        news
    })
});


module.exports = router;
