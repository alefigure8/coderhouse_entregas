import UsersManager from "../dao/mongoManagers/UsersManager.js";

export const auth = async(req, res, next) => {
  const logged = req.session.logged;
  const email = req.session.email;
  const isAdmin = req.session.isAdmin;

  if (logged) {
    const userManager = new UsersManager();
    const user = await userManager.getUserByEmail(email);
    user.isAdmin = isAdmin;
    res.user = user;
    next();
  } else {
    res.user = undefined;
    next();
  }
};
