import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import encrypt from "../lib/password.js";

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, req.flash("error_msg", "Usuario no encontrado"));
      } else {
        const match = await encrypt(password);
        if (match === user.password) {
          return done(null, user, req.flash("success_msg", "Has iniciado sesión"));
        } else {
          return done(null, false, req.flash("error_msg", "Contraseña incorrecta"));
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).lean()
  done(null, user)
});
