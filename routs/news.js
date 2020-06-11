const {Router} = require("express");
const NewsSchema = require("../models/NewsSchema");
const router = Router();

router.get("/", async (req, res) => {
    const news = await NewsSchema.find({})
        .lean();

    res.render("news", {
        title: "news",
        isNews: true,
        news
    })
});


router.post("/create", async (req, res) => {
    const news = new NewsSchema({
        title_news: req.body.title_news,
        content_news: req.body.content_news
    });

    await news.save();
    res.redirect("/news")

});

router.get("/delete/:id", async (req, res) => {
    const news = await NewsSchema.findById(req.params.id);

    await news.delete();

    res.redirect("/news");
});

//---------Edit

router.get("/edit/:id", async (req, res) => {
    const news = await NewsSchema.findById(req.params.id).lean();

    res.render("edit-news", {
        title: "news Edit",
        isNews: true,
        news,
        id: news._id
    })
});

router.post("/edit/:id", async (req, res) => {
    const news = await NewsSchema.findById(req.params.id);
    await news.update({
        title_news: req.body.title_news,
        content_news: req.body.content_news
    });
    await news.save();

    res.redirect("/news")
});

module.exports = router;
