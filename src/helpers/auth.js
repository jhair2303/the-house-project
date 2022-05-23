export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "No estas autorizado")
    res.redirect("/users/signin");
  };

export const isNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Debes cerrar tu sesión actual")
    res.redirect("/get/posts")
}  