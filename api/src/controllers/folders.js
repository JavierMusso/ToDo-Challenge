const { Folder, Task } = require("../db");
const { getTasks } = require("./utils");

module.exports = {
  async postFolders(req) {
    let { folderName, userId } = req.body;

    if (!userId) return { error: "Error: a user Id is required." };

    if (!folderName) return { error: "Error: a folder name is required." };

    await Folder.create({
      folderName,
      userId,
    });

    return getTasks(userId);
  },

  async getFolders(req) {
    let { userId } = req.query;
    if (!userId) return { error: "Error: a user Id is required." };

    return getTasks(userId);
  },

  async deleteFolders(req) {
    let { folderId, userId } = req.body;

    if (!userId) return { error: "Error: a user Id is required." };
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

    return getTasks(userId);
  },
};
