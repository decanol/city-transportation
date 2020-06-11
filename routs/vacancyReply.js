const {Router} = require("express");
const VacanciesAppSchema = require("../models/VacanciesAppSchema");
const format = require("date-fns/format");
const router = Router();

router.get("/", async (req, res) => {
    const vacancyReply = await VacanciesAppSchema.find({})
        .lean();


    // const vacancyReply = workersData.map((el) => ({
    //     ...el, birthday: el.birthday ? format(el.birthday, 'dd.MM.yyyy'): el.birthday}));

    res.render("vacancyReply", {
        title: "Replies",
        isVacancyReply: true,
        vacancyReply
    })
});


//edit


router.post("/create", async (req, res) => {
    const workers = new VacanciesAppSchema({
        gender: req.body.gender,
        name: req.body.name + " " + req.body.surname + " " + req.body.patronym,
        phone: req.body.phone,
        // birthday: req.body.birthday,
        address: req.body.address
    });

    await workers.save();
    res.redirect("/vacancyReply")

});

router.get("/delete/:id", async (req, res) => {
    const workers = await VacanciesAppSchema.findById(req.params.id);

    await workers.delete();

    res.redirect("/vacancyReply");
});

module.exports = router;
