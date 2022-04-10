const express = require("express");
const {
  postFolders,
  getFolders,
  deleteFolders,
} = require("../controllers/folders");

const router = express.Router();

router.post("/", async (req, res) => {
  return res.json(await postFolders(req));
});

router.get("/", async (req, res) => {
  return res.json(await getFolders());
});

router.delete("/", async (req, res) => {
  return res.json(await deleteFolders(req));
});

module.exports = router;
