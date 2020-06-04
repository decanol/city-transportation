// const {Router} = require("express");
// const RoutsSchema = require("../models/RoutsSchema");
// const router = Router();
//
// router.get("/", async (req, res) => {
//     const routs = await RoutsSchema.find({})
//         .lean();
//
//     const tail_number = await BusesSchema.find().lean();
//     const rout_number = await RoutsListSchema.find().lean();
//     const conductors = await WorkersAccSchema.find({post: 'Conductor'}).populate('worker').lean();
//     const drivers = await WorkersAccSchema.find({post: 'Driver'}).populate('worker').lean();
//
//     res.render("routs", {
//         title: "routs",
//         isBuses: true,
//         routs
//     })
// });
//
//
// //edit
//
//
// router.post("/create", async (req, res) => {
//     const routs = new RoutsSchema({
//         routs_number: req.body.routs_number,
//         rout: req.body.rout, //get first & last item from rout
//     });
//
//     await roust.save();
//     res.redirect("/routs")
//
// });
//
// router.get("/delete/:id", async (req, res) => {
//     const routs = await RoutsSchema.findById(req.params.id);
//
//     await routs.delete();
//
//     res.redirect("/routs");
// });
//
// module.exports = router;
