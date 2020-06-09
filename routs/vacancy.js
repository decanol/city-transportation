const {Router} = require("express");
const VacancySchema = require("../models/VacancySchema");
const router = Router();

router.get("/", async (req, res) => {
    const vacancy = await VacancySchema.find({})
        .lean();

    res.render("vacancy", {
        title: "Vacancies",
        isVacancy: true,
        vacancy
    })
});


router.post("/create", async (req, res) => {
    const vacancy = new VacancySchema({
        title_vacancy: req.body.title_vacancy,
        content_vacancy: req.body.content_vacancy
    });

    await vacancy.save();
    res.redirect("/vacancy")

});

router.get("/delete/:id", async (req, res) => {
    const vacancy = await VacancySchema.findById(req.params.id);

    await vacancy.delete();

    res.redirect("/vacancy");
});

module.exports = router;
