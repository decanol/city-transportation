const {Router} = require("express");
const UserSchema = require("../models/UserSchema");
const router = Router();

router.get("/", async (req, res) => {
    const user = await UserSchema.find({})
        .lean();

    res.render("registration", {
        title: "Registration",
        layout: 'dashboard',
        isRegistration: true,
        user
    })
});


router.post("/create", async (req, res) => {
    const user = new UserSchema({
        login: req.body.login,
        password: req.body.password
    });

    await user.save();
    res.redirect("/login")

});

router.get("/delete/:id", async (req, res) => {
    const user = await UserSchema.findById(req.params.id);

    await user.delete();

    res.redirect("/logIn");
});

module.exports = router;
