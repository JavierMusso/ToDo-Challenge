const { Task, Folder } = require("../db");
const { getTasks } = require("./utils");

module.exports = {
  async postTasks(req) {
    let { task, folderId, userId } = req.body;

    if (!userId) return { error: "Error: a user Id is required." };

    if (!task || !folderId)
      return { error: "Error: task and folderId are required." };

    let folderFound = await Folder.findByPk(folderId);

    if (!folderFound) return { error: "Error: invalid folder." };

    await Task.create({
      task,
      status: "notStarted",
      folderId,
    });

    return getTasks(userId);
  },

  async putTasks(req) {
    let { userId, taskId, task, status } = req.body;

    if (!userId) return { error: "Error: a user Id is required." };

    if (!taskId) return { error: "Error: taskId required." };

    let taskFound = await Task.findByPk(taskId);

    if (!taskFound) return { error: "Error: invalid task." };

    await taskFound.update({
      task,
      status,
    });

    return getTasks(userId);
  },

  async deleteTasks(req) {
    let { taskId, userId } = req.body;

    if (!userId) return { error: "Error: a user Id is required." };

    if (!taskId) return { error: "Error: taskId required." };

    await Task.destroy({
      where: {
        id: taskId,
      },
    });

    return getTasks(userId);
  },
};
