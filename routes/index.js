const router = require('express').Router();

const authRoutes = require("./auth-routes");
//const apiRoutes = require("./api-routes");
//const userRoutes = require("./user-routes");

router.use("/api/auth", authRoutes);
//router.use(apiRoutes);
//router.use(userRoutes);


module.exports = router;