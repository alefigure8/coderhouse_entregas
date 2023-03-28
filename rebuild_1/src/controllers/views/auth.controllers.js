import { createUser, getUserToken } from "../../services/users.services.js";

export const getLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.redirect("/errorLogin");
  }
};

export const postLogin = async (req, res) => {
  try {
    if (
      Object.values(req.body).includes("") ||
      Object.values(req.body).includes(undefined)
    ) {
      return res.status(500).redirect("/login");
    }

    const token = await getUserToken(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      signed: true,
    });

    res.redirect("/profile");
  } catch (error) {
    res.redirect("/errorLogin");
  }
};

export const getLogout = async (req, res) => {
  res.clearCookie("token").redirect("/login");
};

export const getRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.redirect("/errorRegister");
  }
};

export const postRegister = async (req, res) => {
  try {
    if (
      Object.values(req.body).includes("") ||
      Object.values(req.body).includes(undefined)
    ) {
      return res.status(500).redirect("/register");
    }

    await createUser(req.body);
    res.redirect("/products");
  } catch (error) {
    res.redirect("/errorRegister");
  }
};

export const getErrorRegister = async (req, res) => {
  res.render("errorRegister");
};

export const getErrorLogin = async (req, res) => {
  res.render("errorLogin");
};
