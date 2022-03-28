const express = require("express");
const router = express.Router();

// import routes
const UsersAdmin = require("./users.route");

// Route for admin
router.use("/users", UsersAdmin);

module.exports = router;
