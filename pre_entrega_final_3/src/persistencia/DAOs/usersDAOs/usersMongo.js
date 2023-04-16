import { usersModels } from "../../mongoDB/model/users.model.js";

class UsersManager {

  // POST USER
  async addUser(user) {
    try {
      const newUser = usersModels.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  // GET USER BY ID
  async getOneUser(option) {
    try {
      const user = await usersModels.findOne(option).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // UPDATE
  async updateUser(id, user){
    try {
      const newuser = await usersModels.findByIdAndUpdate(id, user, {new: true}).lean();
      return newuser;
    } catch (error) {
      throw new Error(error);
    }
  }
  // DELETE
  async deleteUser(id){
    try {
      const deleteUser = await usersModels.findByIdAndDelete(id, { new: true});
      return deleteUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsersManager;
