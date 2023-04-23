import { comparePassword, hashearPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jsonWebToken.js";
import { usersDAOs } from "../persistencia/factory.js";
import UserDBDTO from "../persistencia/DTOs/usersDB.dto.js";
import UserResponseDTO from "../persistencia/DTOs/usersResponse.dto.js";

// Get One User by id
export const findUserById = async (id) => {
  try {
    const user = await usersDAOs.getOneUser({ id });
    const userResponse = new UserResponseDTO(user);
    return userResponse;
  } catch (error) {
    throw new Error(error);
  }
};

//get One user by email
export const findUserByEmail = async (email) => {
  try {
    const user = await usersDAOs.getOneUser({ email });
    const userResponse = new UserResponseDTO(user);
    return userResponse;
  } catch (error) {
    throw new Error(error);
  }
};

// Login
export const getUserToken = async (user) => {
  try {
    const userDTO = new UserDBDTO(user);

    const userExist = await usersDAOs.getOneUser({ email: userDTO.email });

    if (!userExist) {
      throw new Error("User or Password incorrect");
    }
    const isValidPass = await comparePassword(
      userDTO.password,
      userExist.password
    );

    if (!isValidPass) {
      throw new Error("User or Password incorrect");
    }

    if (userExist.role == "Admin") {
      userExist.isAdmin = true;
    }
    const userResponse = new UserResponseDTO(userExist);
    const token = await generateToken({ ...userResponse });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Token
export const getToken = async (user) => {
  const userDTO = new UserDBDTO(user);

  const userExist = await usersDAOs.getOneUser({ email: userDTO.email });

  if (userExist.role == "Admin") {
    userExist.isAdmin = true;
  }

  const userResponse = new UserResponseDTO(userExist);
  const token = await generateToken({ ...userResponse });

  return token;
};

// Add User
export const createUser = async (user) => {
  try {
    const userDTO = new UserDBDTO(user);

    const userExist = await usersDAOs.getOneUser({ _id: userDTO.id });

    if (userExist) throw new Error("User not found");

    userDTO.password = await hashearPassword(userDTO.password);

    const newUser = await usersDAOs.addUser(userDTO);
    const userResponse =  new UserResponseDTO(newUser);

    return userResponse;
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
    const userResponse =  new UserResponseDTO(editedUser);
    return userResponse;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const deleteUser = await usersDAOs.deleteUser(id);
    const userResponse =  new UserResponseDTO(deleteUser);
    return userResponse;
  } catch (error) {
    throw new Error(error);
  }
};
