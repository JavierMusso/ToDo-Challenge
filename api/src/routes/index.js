const { Router } = require("express");
const tasksRoutes = require("./tasks");
const foldersRoutes = require("./folders");

const router = Router();

router.use("/tasks", tasksRoutes);
router.use("/folders", foldersRoutes);

module.exports = router;
