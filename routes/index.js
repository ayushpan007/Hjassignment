const express = require('express');
const router = express.Router();
const pingRoutes = require('./ping');
const generateTokenRoutes=require("./generateToken")
const userRoutes=require("./user")
const blogRoutes=require("./blog")


pingRoutes(router);
generateTokenRoutes(router)
userRoutes(router)
blogRoutes(router)


module.exports = router;