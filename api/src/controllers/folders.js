const { Folder, Task } = require("../db");

module.exports = {
  async postFolders(req) {
    let { folderName } = req.body;
    console.log(req.body);

    if (!folderName) return { error: "Error: a folder name is required." };

    await Folder.create({
      folderName,
    });

    let folderFound = await Folder.findAll({
      include: {
        model: Task,
      },
    });

    if (!folderFound) return { msg: "No folders created" };

    return folderFound;
  },

  async getFolders() {
    let folderFound = await Folder.findAll({
      include: {
        model: Task,
      },
    });

    if (!folderFound) return { msg: "No folders created" };

    return folderFound;
  },

  putTasks() {
    return { msg: "hola put" };
  },

  async deleteFolders(req) {
    let { folderId } = req.body;

    if (!folderId) return { error: "Error: a folder Id is required." };

    await Task.destroy({
      where: {
        folderId: folderId,
      },
    });

    await Folder.destroy({
      where: {
        id: folderId,
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
