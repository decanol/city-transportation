// const {Router} = require("express");
// const BusesSchema = require("../models/RoutsSchema");
// const format = require("date-fns/format");
// const router = Router();
//
// router.get("/", async (req, res) => {
//     const busesData = await BusesSchema.find({})
//         .lean();
//
//
//     const buses = busesData.map((el) => ({
//         ...el,
//         release_date: format(el.release_date, 'dd.MM.yyyy'),
//         last_repair_date: format(el.last_repair_date, 'dd.MM.yyyy')
//     }));
//
//     res.render("buses", {
//         title: "buses",
//         isBuses: true,
//         buses
//     })
// });
//
//
// //edit
//
//
// router.post("/create", async (req, res) => {
//     const buses = new BusesSchema({
//         tail_number: req.body.tail_number,
//         gov_number: req.body.gov_number,
//         brand: req.body.brand,
//         release_date: req.body.release_date,
//         mileage: req.body.mileage,
//         last_repair_date: req.body.last_repair_date
//     });
//
//     await buses.save();
//     res.redirect("/buses")
//
// });
//
// router.get("/delete/:id", async (req, res) => {
//     const buses = await BusesSchema.findById(req.params.id);
//
//     await buses.delete();
//
//     res.redirect("/buses");
// });
//
// module.exports = router;
