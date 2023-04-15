import passport from "passport";

export const githubAuthenticate = passport.authenticate("github", {
  scope: ["user:email"],
  session: false,
});

export const githubAuthenticateFailure = passport.authenticate("github", {
  failureRedirect: "/register",
  session: false,
});

export const jwtAuthenticate = passport.authenticate("current", {
  session: false,
  scope: ["user:email"]
});

export const jwtAuthenticateAdmin = passport.authenticate("admin", {
  session: false,
  scope: ["user:email"]
});