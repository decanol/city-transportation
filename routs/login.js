const {Router} = require("express");
const crypto = require('crypto');
const UserSchema = require("../models/UserSchema");
const UserSessionSchema = require("../models/UserSessionSchema");
const router = Router();
const SECRET = 'fkjsadkjfle3r4FDSwrdaf$Rf23';

router.get("/", async (req, res) => {
    res.render("login", {
        layout: 'dashboard'
    })
});


router.post("/", async (req, res) => {
    const user = await UserSchema.findOne({login: req.body.login}).lean();
    if (user && user.password === crypto.createHash('md5').update(req.body.password).digest('hex')) {
        const session = crypto.createHash('md5').update(`${user._id}:${SECRET}:${Date.now()}`).digest('hex');
        const userSession = new UserSessionSchema({
            user_id: user._id,
            session
        });
        await userSession.save();
        res.cookie('session', session, {maxAge: 900000, httpOnly: true});
        res.redirect('/workers');
    } else {
        res.redirect('/login');
    }
});


module.exports = router;
