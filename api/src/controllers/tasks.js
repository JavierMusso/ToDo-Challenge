const { Task, Folder } = require("../db");

module.exports = {
  async postTasks(req) {
    let { task, folderId } = req.body;

    if (!task || !folderId)
      return { error: "Error: task and folderId are required." };

    let folderFound = await Folder.findByPk(folderId);

    if (!folderFound) return { error: "Error: invalid folder." };

    const newTask = await Task.create({
      task,
      status: "not started",
      folderId,
    });

    return newTask;
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

    return { msg: "Task updated succesfully." };
  },

  deleteTasks(req) {
    let { taskId } = req.body;

    if (!taskId) return { error: "Error: taskId required." };

    Task.destroy({
      where: {
        id: taskId,
      },
    });
    return { msg: "Task deleted succesfully." };
  },
};
