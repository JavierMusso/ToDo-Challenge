const { Folder, Task } = require("../db");

module.exports = {
  async postFolders(req) {
    let { folderName } = req.body;

    if (!folderName) return { error: "Error: a folder name is required." };

    let newFolder = await Folder.create({
      folderName,
    });

    return newFolder;
  },

  async getFolders(req) {
    let { folderId } = req.body;

    if (!folderId) return { error: "Error: a folder Id is required." };

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

  deleteFolders(req) {
    let { folderId } = req.body;

    if (!folderId) return { error: "Error: a folder Id is required." };

    Folder.destroy({
      where: {
        id: folderId,
      },
    });
    return { msg: "Folder deleted succesfully." };
  },
};
