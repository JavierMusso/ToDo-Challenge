const { Router } = require("express");
const tasksRoutes = require("./tasks");
const foldersRoutes = require("./folders");
const usersRoutes = require("./users");

const router = Router();

router.use("/tasks", tasksRoutes);
router.use("/folders", foldersRoutes);
router.use("/users", usersRoutes);

module.exports = router;
