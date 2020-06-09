const {Router} = require("express");
const VacancySchema = require("../models/VacancySchema");
const router = Router();

router.get("/", async (req, res) => {
    const vacancy = await VacancySchema.find({})
        .lean();

    res.render("vacancyList", {
        layout: 'dashboard',
        title: "Vacancy List",
        vacancy
    })
});


module.exports = router;
