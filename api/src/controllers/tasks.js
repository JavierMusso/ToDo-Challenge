const { Task, Folder } = require("../db");

module.exports = {
  async postTasks(req) {
    let { task, folderId } = req.body;

    if (!task || !folderId)
      return { error: "Error: task and folderId are required." };

    let folderFound = await Folder.findByPk(folderId);

    if (!folderFound) return { error: "Error: invalid folder." };

    await Task.create({
      task,
      status: "notStarted",
      folderId,
    });

    let response = await Folder.findAll({
      include: {
        model: Task,
      },
    });

    if (!response) return { msg: "No folders created" };

    return response;
  },

  async putTasks(req) {
    let { taskId, task, status } = req.body;

    if (!taskId) return { error: "Error: taskId required." };

    let taskFound = await Task.findByPk(taskId);

    if (!taskFound) return { error: "Error: invalid task." };

    taskFound.update({
      task,
      status,
    });

    let folderFound = await Folder.findAll({
      include: {
        model: Task,
      },
    });

    if (!folderFound) return { msg: "No folders created" };

    return folderFound;
  },

  async deleteTasks(req) {
    let { taskId } = req.body;

    if (!taskId) return { error: "Error: taskId required." };

    await Task.destroy({
      where: {
        id: taskId,
      },
    });

    let folderFound = await Folder.findAll({
      include: {
        model: Task,
      },
    });

    if (!folderFound) return { msg: "No folders created" };

    return folderFound;
  },
};
