const { Task, Folder, User } = require("../db");
const bcrypt = require("bcrypt");

module.exports = {
  async postUser(req) {
    let { username, password } = req.body;

    if (!username || !password)
      return { error: "Error: username and password required." };

    let encryptedPassword = bcrypt.hashSync(password, 10);

    const [user, created] = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: encryptedPassword,
      },
    });

    if (created) return { msg: "User created succesfully.", userId: user.id };

    return { msg: "User already exist.", userId: user.id };
  },

  async getUser(req) {
    let { username, password } = req.query;

    if (!username || !password)
      return { error: "Error: username and password required." };

    let user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) return { error: "Error: invalid user." };

    if (!bcrypt.compareSync(password, user.password))
      return { error: "Error: invalid password." };

    return user.id;
  },
};
