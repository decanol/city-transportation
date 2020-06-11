const {Router} = require("express");
const router = Router();

router.get("/", async (req, res) => {
    res.redirect('/login');
});



module.exports = router;
