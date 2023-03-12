import { usersModels } from "../model/Users.model.js";

/*
CarManager
  -getCarts
  -getCartById
  -addCarts
  -updateCart
  -deleteCart
  -deleteProduct
  -emptyCart
*/

class UsersManager {
  constructor() {
    this.users = [];
  }

  async getUserByEmailAndPassword(email, password) {
    try {
      const user = await usersModels.findOne({ email, password });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Obtener usuario por mail
  async getUserByEmail(email) {
    try {
      const user = await usersModels.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Crear usuario
  async addUser(user) {
    try {
      const newUser = usersModels.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const user = await usersModels.findOne({ id }).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsersManager;
