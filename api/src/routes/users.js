const express = require("express");
const { postUser, getUser } = require("../controllers/users");

const router = express.Router();

router.post("/", async (req, res) => {
  return res.json(await postUser(req));
});

router.get("/", async (req, res) => {
  return res.json(await getUser(req));
});

module.exports = router;
