import UsersManager from "../DAL/mongoManagers/UsersManager.js";
import { comparePassword, hashearPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jsonWebToken.js";

const userManager = new UsersManager();

// Get One User by id
export const findUserById = async (id) => {
  try {
    const user = await userManager.getOneUser({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

//get One user by email
export const findUserByEmail = async (email) => {
  try {
    const user = await userManager.getOneUser({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Login
export const getUserToken = async (user) => {
  try {
    const userExist = await userManager.getOneUser({ email: user.email });

    if (!userExist) {
      throw new Error("User or Password incorrect");
    }

    const isValidPass = await comparePassword(
      user.password,
      userExist.password
    );
    if (!isValidPass) {
      throw new Error("User or Password incorrect");
    }

    if (user.role == "admin") {
      userExist.isAdmin = true;
    } else {
      userExist.isAdmin = false;
    }

    const token = await generateToken(userExist);

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const getToken = async (user) => {
  if (user.role == "admin") {
    user.isAdmin = true;
  } else {
    user.isAdmin = false;
  }

  const token = await generateToken(user);

  return token;
}

// Add User
export const createUser = async (user) => {
  try {
    const userExist = await userManager.getOneUser({ _id: user.id });

    if (userExist) throw new Error("User not found");

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
