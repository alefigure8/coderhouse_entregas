
export const getProfile = async (req, res) => {
    try {
      const user = res.user;
      if (user) {
        res.render("profile", { user, titulo: "PROFILE" });
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.redirect("/login");
    }
}