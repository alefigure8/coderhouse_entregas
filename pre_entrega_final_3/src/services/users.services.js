import { comparePassword, hashearPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jsonWebToken.js";
import { usersDAOs } from "../persistencia/factory.js";

// Get One User by id
export const findUserById = async (id) => {
  try {
    const user = await usersDAOs.getOneUser({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

//get One user by email
export const findUserByEmail = async (email) => {
  try {
    const user = await usersDAOs.getOneUser({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Login
export const getUserToken = async (user) => {
  try {
    const userExist = await usersDAOs.getOneUser({ email: user.email });

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

    if (userExist.role == "Admin") {
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
};


// CORRECTION
export const regenerateToken = async (user) => {

  const token = await generateToken(user);

  return token;
};

// Add User
export const createUser = async (user) => {
  try {
    const userExist = await usersDAOs.getOneUser({ _id: user.id });

    if (userExist) throw new Error("User not found");

    user.password = await hashearPassword(user.password);
    user.cartId = null;

    const newUser = await usersDAOs.addUser(user);
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

    const editedUser = await usersDAOs.updateUser(id, user);
    return editedUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const deleteUser = await usersDAOs.deleteUser(id);
    return deleteUser;
  } catch (error) {
    throw new Error(error);
  }
};
