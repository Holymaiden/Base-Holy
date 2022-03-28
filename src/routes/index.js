const express = require("express");
const router = express.Router();

// Authentication Middlewares
const {
  authAdminMiddleware,
  authUserMiddleware,
} = require("../middlewares/auth.middleware");

// Auth Controller and Validation
const { Login } = require("../controllers/auth/login.controller");
const { register } = require("../controllers/auth/register.controller");
const loginValidation = require("../validations/auth/login.validation");
const registerValidation = require("../validations/auth/register.validation");

// import routes
const Admin = require("./admin/index.route");

// Route for Auth
router.post("/login", loginValidation, Login);
router.post("/register", registerValidation, register);

// Route for admin
router.use("/admin", authAdminMiddleware, Admin);

module.exports = router;
