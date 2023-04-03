
export const getProfile = async (req, res) => {
    try {
      const user = req.user;
      if (user) {
        res.render("profile", { user, titulo: "PROFILE" });
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.redirect("/login");
    }
}