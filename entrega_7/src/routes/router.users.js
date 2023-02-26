import { Router } from "express";
import dotenv from 'dotenv'
import UsersManager from "../dao/mongoManagers/UsersManager.js";
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
        const user = {
          firstname,
          lastname,
          email,
          age,
          password
        };
        userManager.addUser(user);
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  });
  
  // LOGIN
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar usuario
      const userManager = new UsersManager()
      const user = await userManager.getUserByEmailAndPassword(email, password);

      //Validar pass
      if (user) {
        //Guardar session
        for (const key in req.body) {
          req.session[key] = req.body[key];
        }

        //Logged
        req.session.logged = true;

        //Admin
        // eslint-disable-next-line no-undef
        if(user.email === process.env.MAIL_ADMIN)
        {
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
  });
  
  //LOGOUT
  router.get("/logout", (req, res) => {
      req.session.destroy( error => {
          if(!error){
              res.redirect("/login")
          } else {
          console.log(error)
          }
      });
  })

export default router;
