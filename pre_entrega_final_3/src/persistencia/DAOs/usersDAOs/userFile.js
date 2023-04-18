import fs from "fs";
import { __dirname } from "../../../utils/path.js";

class UserManager {
  constructor() {
    this.users;
    this.path = __dirname + "/persistencia/files/users.json";
    this.id = 1;
  }

  #generateId() {
    return this.users.length != 0
      ? this.users[this.users.length - 1].id + 1
      : this.id;
  }

  async findAll() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8");
        this.users = await JSON.parse(users);
        return this.users;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addUser(user) {
    try {
      this.users = await this.findAll();
      user.id = this.#generateId();
      console.log(user);
      this.users.push(user);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get one user by id or email
  async getOneUser(option) {
    try {
      const users = await this.findAll();

      if (users.length > 0) {
        if (
          this.users.some((user) =>
            option.id != undefined
              ? user.id == option._id
              : user.email == option.email
          )
        ) {
          const user = users.find((user) =>
            option.id != undefined
              ? user.id == option._id
              : user.email == option.email
          );
          return user;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(id, user) {
    try {
      const users = await this.findAll();
      const isUser = await this.getOneUser(id);
      if (isUser != "Not Found") {
        const index = users.findIndex((user) => user.id == id);
        users[index] = { ...users[index], ...user };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(users, null, 2),
          "utf-8"
        );
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(id) {
    try {
      const users = await this.findAll();
      const isUser = await this.getOneUser(id);
      if (isUser != "Not Found") {
        const deletedUser = users.filter((user) => user.id != id);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(deletedUser, null, 2),
          "utf-8"
        );

        return "User deleted";
      }
      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserManager;
