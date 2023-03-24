import { usersModels } from "../model/Users.model.js";
//import CartManager from "./CartManager.js";

class UsersManager {
  // async getUserByEmailAndPassword(email, password) {
  //   try {
  //     const user = await usersModels.findOne({ email, password });
  //     return user;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // Obtener usuario por mail
  // async getUserByEmail(email) {
  //   try {
  //     const user = await usersModels.findOne({ email }).lean();
  //     return user;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // // Crear usuario
  // async addUser(user) {
  //   try {
  //     //Create cart
  //     const cartManager = new CartManager();
  //     const newCart = await cartManager.addCart();
  //     const userWithCart = { ...user, cartId: newCart._id };

  //     //Create user
  //     const newUser = usersModels.create(userWithCart);

  //     return newUser;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // POST USER
  async addUser(user) {
    try {
      const newUser = usersModels.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  // async getUserById(id) {
  //   try {
  //     const user = await usersModels.findOne({ id }).lean();
  //     return user;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // GET USER
  async getOneUser(option) {
    try {
      const user = await usersModels.findOne(option).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // UPDATE
  async updateUser(user){
    try {
      const newuser = await usersModels.findByIdAndUpdate(user._id, user, {new: true});
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
