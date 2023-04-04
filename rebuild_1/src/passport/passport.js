import passport from "passport";
import { Strategy as githubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import {
  findUserByEmail,
  findUserById,
  createUser,
} from "../services/users.services.js";
import { cookieExtractor } from "../utils/passport.js";
import { config } from "../utils/config.js";

//Serialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//Deserialize
passport.deserializeUser(async (id, done) => {
  const usuario = await findUserById(id);
  done(null, usuario);
});



// **** GITHUB **** //
passport.use(
  "github",
  new githubStrategy(
    {
      clientID: config.githubClientId,
      clientSecret: config.githubClientSecret,
      callbackURL: "http://localhost:8080/callbackGithub",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findUserByEmail(profile._json.email);
      if (!user) {
        const newUser = {
          firstname: profile._json.name.split(" ")[0],
          lastname: profile._json.name.split(" ")[1],
          email: profile._json.email,
          password: " ",
        };
        const userDB = await createUser(newUser);
        return done(null, userDB);
      }
      done(null, user);
    }
  )
);

// **** JWT **** //

passport.use(
  "current",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.jwtSecret,
    },
    async (payload, done) => {
      if(!payload)
        return done(null, false);
      return done(null, payload);
    }
  )
);
