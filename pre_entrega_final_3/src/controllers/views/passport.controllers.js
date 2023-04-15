import {findUserByEmail, getToken} from '../../services/users.services.js'

export const githubAuth = async (req, res) => {
    try {
      // Buscar usuario
      const user = await findUserByEmail(req.user.email);

      //Validar pass
      if (user) {
        const token = await getToken(user);

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
          signed: true,
        });

        res.redirect("/profile");
      } else {
        res.redirect("/errorLogin");
      }
    } catch (error) {
      console.log(error);
    }
  }