const router = require('express').Router();

const authRoutes = require("./auth-routes");
const apiRoutes = require("./api-routes");
const userRoutes = require("./user-routes");

router.use("/api/auth", authRoutes);
router.use("/api/places", apiRoutes);
router.use("/api/users", userRoutes);


module.exports = router;