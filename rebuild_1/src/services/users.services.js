import UsersManager from "../DAL/mongoManagers/UsersManager.js";
import { hashearPassword } from "../utils/bcrypt.js";

const userManager = new UsersManager();

// Get One User
export const findUserById = async (id) => {
  try {
    const user = await userManager.getOneUser({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// GET USER BY EMAIL
export const findUserByEmail = async (email) => {
  try {
    const user = await userManager.getOneUser({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Add User
export const createUser = async (user) => {
  try {
    user.password = await hashearPassword(user.password);
    const newUser = await userManager.addUser(user);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Update User
export const updateUser = async (id, user) => {
  try {
    if (Object.keys(user) == "password")
      user.password = await hashearPassword(user.password);

    const editedUser = await userManager.updateUser(id, user);
    return editedUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const deleteUser = await userManager.deleteUser(id);
    return deleteUser;
  } catch (error) {
    throw new Error(error);
  }
};
