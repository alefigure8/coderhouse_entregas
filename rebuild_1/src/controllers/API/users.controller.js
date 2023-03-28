import {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/users.services.js";

// Get user by id
export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    // Chequear si el usuario existe
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create user
export const postUser = async (req, res) => {
  try {
    // Chequear si el usuario existe
    if (await findUserByEmail(req.body.email)) {
      return res.status(500).json({ error: "User already exist" });
    }

    // Chequear si hay datos vacios
    if (
      Object.values(req.body).includes("") ||
      Object.values(req.body).includes(undefined)
    ) {
      return res.status(500).json({ error: "All fields are ired" });
    }

    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update user
export const putUser = async (req, res) => {
  try {
    // Chequear si el usuario existe
    if (!(await findUserById(req.params.id))) {
      return res.status(404).json({ error: "User not found" });
    }

    // Chequear si hay datos vacios
    if (
      Object.values(req.body).includes("") ||
      Object.values(req.body).includes(undefined)
    ) {
      return res.status(500).json({ error: "All fields are required" });
    }

    const user = await updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete user
export const deleteUserById = async (req, res) => {
  try {
    // Chequear si el usuario existe
    if (await findUserById(req.params.id)) {
      const user = await deleteUser(req.params.id);
      return res.status(200).json(user);
    }

    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
