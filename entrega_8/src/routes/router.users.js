import { Router } from "express";
import dotenv from "dotenv";
import { hashPass, comparePassword } from "../utils.js";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import passport from "passport";

// Config
const router = Router();
dotenv.config();

// RUTAS FILES STORE
// const users = [];

// // REGISTRO
// router.post("/register", (req, res) => {
//   try {
//     const { firstname, lastname, email, age, password } = req.body;

//     // Verificar si el usuario está registrado
//     const existeUser = users.some((user) => user.email === email);

//     if (existeUser) {
//       res.redirect("/errorRegister");
//     } else {
//       const user = {
//         firstname,
//         lastname,
//         email,
//         age,
//         password,
//       };
//       users.push(user);
//       res.redirect("/login");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// // LOGIN
// router.post("/login", (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Buscar usuario
//     const user = users.find((user) => user.email == email);

//     //Validar pass
//     if (user && user.password === password) {
//       //Guardar session
//       for (const key in req.body) {
//         req.session[key] = req.body[key];
//       }
//       res.redirect("/profile");
//     } else {
//       res.redirect("/errorLogin");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// //LOGOUT
// router.get("/logout", (req, res) => {
//     req.session.destroy( error => {
//         if(!error){
//             res.redirect("/login")
//         } else {
//         console.log(error)
//         }

//     });
// })

// RUTAS MONGODB

// REGISTRO
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, age, password } = req.body;

    // Verificar si el usuario está registrado
    const userManager = new UsersManager();
    const existeUser = await userManager.getUserByEmail(email);

    if (existeUser) {
      res.redirect("/errorRegister");
    } else {
      const newPass = await hashPass(password);

      const user = {
        firstname,
        lastname,
        email,
        age,
      };

      userManager.addUser({ ...user, password: newPass });
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

// GITHUB PASSPORT
router.get(
  "/github",
  passport.authenticate("github", {scope: ["user:email"]})
);

router.get(
  "/callbackGithub",
  passport.authenticate("github", { failureRedirect: "/register" }),
  async (req, res) => {
    try {
      // Buscar usuario
      const userManager = new UsersManager();
      const user = await userManager.getUserByEmail(req.user.email);
  
      //Validar pass
      if (user) {
          //Guardar en sesion los datos del usuario desde MongoDB
          for (const key in user) {
            req.session[key] = user[key];
          }
  
          //Logged
          req.session.logged = true;
  
          //Admin
          // eslint-disable-next-line no-undef
          if (user.email === process.env.MAIL_ADMIN) {
            req.session.isAdmin = true;
          } else {
            req.session.isAdmin = false;
          }
  
          res.redirect("/profile");
        } else {
          res.redirect("/errorLogin");
        }  
    } catch (error) {
      console.log(error);
    }
  }
);

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const userManager = new UsersManager();
    const user = await userManager.getUserByEmail(email);

    //Validar pass
    if (user) {
      //Compare pass
      const isValidPass = await comparePassword(password, user.password);

      if (isValidPass) {
        //Guardar en sesion los datos del usuario desde MongoDB
        for (const key in user) {
          req.session[key] = user[key];
        }

        //Logged
        req.session.logged = true;

        //Admin
        // eslint-disable-next-line no-undef
        if (user.email === process.env.MAIL_ADMIN) {
          req.session.isAdmin = true;
        } else {
          req.session.isAdmin = false;
        }

        res.redirect("/profile");
      } else {
        res.redirect("/errorLogin");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.redirect("/login");
    } else {
      console.log(error);
    }
  });
});

export default router;
