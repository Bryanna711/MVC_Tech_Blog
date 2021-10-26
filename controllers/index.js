const router = require("express").Router();
const apiRoutes = require("./api");
const homepageRoutes = require("./homepageRoutes");
const profileRoutes = require("./profileRoutes");


router.use("/api", apiRoutes);
router.use("/", homepageRoutes);
router.use("/profile", profileRoutes);
module.exports = router;