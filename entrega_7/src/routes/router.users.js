import { Router } from "express";
import { usersModels } from "../dao/model/Users.model.js";
const router = Router();

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
      const existeUser = await usersModels.find({email});
  
      if (existeUser.length != 0) {
        res.redirect("/errorRegister");
      } else {
        const user = {
          firstname,
          lastname,
          email,
          age,
          password
        };
        usersModels.create(user);
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  });
  
  // LOGIN
  router.post("/login", (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar usuario
      const user = usersModels.find({email, password});
  
      //Validar pass
      if (user.length != 0) {
        //Guardar session
        for (const key in req.body) {
          req.session[key] = req.body[key];
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
