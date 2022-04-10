const express = require("express");
const { postTasks, putTasks, deleteTasks } = require("../controllers/tasks");

const router = express.Router();

router.post("/", async (req, res) => {
  return res.json(await postTasks(req));
});

router.put("/", async (req, res) => {
  return res.json(await putTasks(req));
});

router.delete("/", (req, res) => {
  return res.json(deleteTasks(req));
});

module.exports = router;
