const express = require("express");
const router = express.Router();

const {
  create,
  destroy,
  getAll,
  update,
} = require("../../controllers/admin/users.controller");

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
