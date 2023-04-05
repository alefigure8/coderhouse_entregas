import {
    getUserToken
  } from "../../services/users.services.js";

  export const postAuth = async (req, res) => {
    try {
      const token = await getUserToken(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }