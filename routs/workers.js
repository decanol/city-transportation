const {Router} = require("express");
const WorkersSchema = require("../models/WorkersSchema");
const format = require("date-fns/format");
const router = Router();

router.get("/", async (req, res) => {
    const workersData = await WorkersSchema.find({})
        .lean();


    const workers = workersData.map((el) => ({
        ...el, birthday: format(el.birthday, 'dd.MM.yyyy')}));

    res.render("workers", {
        title: "workers",
        isWorkers: true,
        workers
    })
});

//------------------------------------------------------------------------don't touch

//edit... a kuda?
// router.get("/workers", async (req, res) => {
//     const workersData = await Todo.find({})
//         .lean();
//
//
//     const workers = workersData.map((el) => ({...el, birthday: format(el.birthday, 'dd.MM.yyyy')}));
//
//     res.render("edit-workers", {
//         title: "Home",
//         isWorkers: true,
//         workers
//     })
// });

router.post("/create", async (req, res) => {
    const workers = new WorkersSchema({
        gender: req.body.gender,
        name: req.body.name + " " + req.body.surname + " " + req.body.patronym,
        reg_number: req.body.reg_number,
        phone: req.body.phone,
        birthday: req.body.birthday,
        address: req.body.address
    });

    await workers.save();
    res.redirect("/workers")

});

router.get("/delete/:id", async (req, res) => {
    const workers = await WorkersSchema.findById(req.params.id);

    await workers.delete();

    res.redirect("/workers");
});

module.exports = router;
