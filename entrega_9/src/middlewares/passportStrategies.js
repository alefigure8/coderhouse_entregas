import passport from "passport";
import { Strategy as githubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import dotenv from "dotenv";
import {cookieExtractor} from "../utils.js";

// Config
dotenv.config();

// **** GITHUB **** //
passport.use(
  "github",
  new githubStrategy(
    {
      // eslint-disable-next-line no-undef
      clientID: process.env.GITHUBCLIENTID,
      // eslint-disable-next-line no-undef
      clientSecret: process.env.GITHUBCLIENTSECRET,
      callbackURL: "http://localhost:8080/auth/users/callbackGithub",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userManager = new UsersManager();
      const user = await userManager.getUserByEmail(profile._json.email);
      if (!user) {
        const newUser = {
          firstname: profile._json.name.split(" ")[0],
          lastname: profile._json.name.split(" ")[1],
          email: profile._json.email,
          password: " ",
        };
        const userDB = await userManager.addUser(newUser);
        return done(null, userDB);
      }

      done(null, user);
    }
  )
);

//Serialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//Deserialize
passport.deserializeUser(async (_id, done) => {
  const userManager = new UsersManager();
  const usuario = await userManager.getUserById(_id);
  done(null, usuario);
});


// **** JWT **** //

passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      // eslint-disable-next-line no-undef
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      done(null, payload);
    }
  )
);