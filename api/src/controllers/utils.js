const { Task, Folder } = require("../db");

module.exports = {
  async getTasks(userId) {
    let foundTasks = await Folder.findAll({
      where: {
        userId,
      },
      include: {
        model: Task,
      },
    });

    if (!foundTasks) return { msg: "No folders created" };

    return foundTasks;
  },
};
