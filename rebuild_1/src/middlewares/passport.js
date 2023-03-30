import passport from "passport"

export const githubAuthenticate= passport.authenticate("github", { scope: ["user:email"], session:false })

export const githubAuthenticateFailure= passport.authenticate("github", { failureRedirect: "/register", session:false })