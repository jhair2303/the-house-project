import { Router } from "express";
import User from "../models/User.js";
import encrypt from "../lib/password.js";
import passport from "passport";
import Image from "../models/Image.js";
import { transporter } from "../lib/mailer.js";
import { uploadImage } from "../lib/cloudinary.js";
import fs from "fs-extra";
import random from "../lib/random.js";
import { isAuthenticated, isNotAuthenticated } from "../helpers/auth.js"

const router = Router();

router.get("/users/my-profile", isAuthenticated, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).lean();
  const image = await Image.find({ user_id: user._id });
  user.count = image.length;
  await User.findByIdAndUpdate({ _id: user._id }, { count: user.count });
  res.render("user/profile", { user });
});

router.get("/users/edit-profile", isAuthenticated, (req, res) => {
  const user = req.user;
  res.render("user/editprofile", { user });
});

router.post("/users/edit-profile", isAuthenticated, async (req, res) => {
  const { name, email, password } = req.body;
  if (name !== "" && email !== "" && password === "") {
    if (req.files) {
      let photo;
      const result = await uploadImage(req.files.image.tempFilePath);
      photo = result.secure_url;
      await fs.remove(req.files.image.tempFilePath);
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { email, name, photo }
      ).lean();
      req.flash("success_msg", "Datos actualizados correctamente")
      res.redirect("/users/my-profile");
    } else {
      await User.findOneAndUpdate({ _id: req.user._id }, { email, name });
      req.flash("success_msg", "Datos actualizados correctamente")
      res.redirect("/users/my-profile");
    }
  } else if (name !== "" && email !== "" && password !== "") {
    if (req.files) {
      let photo;
      const result = await uploadImage(req.files.image.tempFilePath);
      photo = result.secure_url;
      await fs.remove(req.files.image.tempFilePath);
      const pass = await encrypt(password);
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { email, name, photo, password: pass }
      ).lean();
      req.flash("success_msg", "Datos actualizados correctamente")
      res.redirect("/users/my-profile");
    } else {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { email, name, password }
      );
      req.flash("success_msg", "Datos actualizados correctamente")
      res.redirect("/users/my-profile");
    }
  } else {
    res.redirect("user/profile", { user });
  }
});

router.get("/users/signin", isNotAuthenticated, (req, res) => {
  res.render("user/signin");
});

router.get("/users/signup", isNotAuthenticated, (req, res) => {
  res.render("user/signup");
});

router.post("/users/signin", isNotAuthenticated, (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/get/posts",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })(req, res, next);
});

router.post("/users/signup", isNotAuthenticated, async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 5) {
    errors.push({ text: "La contraseña debe tener al menos 5 caracteres" });
  }
  if (errors.length > 0) {
    res.render("user/signup", {
      errors,
      email,
      name,
      password,
      confirm_password,
    });
  } else {
    const bEmail = await User.findOne({ email });
    if (bEmail) {
      req.flash("error_msg", "El correo ya se encuentra en uso");
      res.redirect("/users/signup");
    } else {
      const newUser = await User({ email, name, password });
      newUser.password = await encrypt(password);
      newUser.photo =
        "https://res.cloudinary.com/dil3klrac/image/upload/v1653084677/posts/ab6g7h4hfhcvymsolzg1.png";
      await newUser.save();
      await transporter.sendMail({
        from: '"Te has registrado en House Page" <house.company.col@gmail.com>',
        to: newUser.email,
        subject: "Felicidades te has registrado",
        html: `<div>
                  <h2 style="margin-bottom: 35px">House Website</h2>    
                  <h3>Hola ${newUser.name}</h3>
                  <p>Te damos la bienvenida a la página oficial de <b>Los de la casa</b></P>
                  <p>Gracias por preferirnos.</P>
                  <a href=""">Ir al sitio</a>
                  <footer style="margin-top:30px">
                  <h3>Contacto:</h3>
                  <p>House Company</p>
                  <p>house.company.col@gmail.com</p>
                  </footer>
              </div>`,
      });
      req.flash("success_msg", "Te has registrado");
      res.redirect("/users/signin");
    }
  }
});

router.get("/users/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Has cerrado tu sesión");
  res.redirect("/users/signin");
});

router.get("/users/reseat-password", isNotAuthenticated, (req, res) => {
  res.render("user/reseat");
});

router.post("/users/reseat-password", isNotAuthenticated, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error_msg", "El correo no pertenece a un usuario registrado");
    res.redirect("/users/signin");
  } else {
    const password = random();
    user.password = await encrypt(password);
    await transporter.sendMail({
      from: '"Recuperación de contraseña" <house.company.col@gmail.com>',
      to: user.email,
      subject: "Recupera tu contraseña",
      html: `<div>
                <h2 style="margin-bottom: 35px">House Website</h2>    
                <h3>Hola ${user.name}</h3>
                <p>Tu nueva contraseña es ${password}</b></P>
                <p>Gracias por preferirnos.</P>
                <a href=""">Ir al sitio</a>
                <footer style="margin-top:30px">
                <h3>Contacto:</h3>
                <p>House Company</p>
                <p>house.company.col@gmail.com</p>
                </footer>
            </div>`,
    });
    user.save();
    res.render("user/signin", { email });
  }
});

export default router;
