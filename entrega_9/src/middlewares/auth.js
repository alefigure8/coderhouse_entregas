//import UsersManager from "../dao/mongoManagers/UsersManager.js";

export const auth = async(req, res, next) => {
  if (req?.session?.logged) {
    res.user = req.session;
    next();
  } else {
    res.user = undefined;
    next();
  }
};
