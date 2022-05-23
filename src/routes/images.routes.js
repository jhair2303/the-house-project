import { Router } from "express";
import Image from "../models/Image.js";
import { home } from "../controllers/home.js";
import { uploadImage, deleteImage } from "../lib/cloudinary.js";
import fs from "fs-extra";
import User from "../models/User.js";
import time from "../helpers/timeago.js";
import { isAuthenticated } from "../helpers/auth.js"

const router = Router();

router.get("/", home);

router.get("/get/posts", isAuthenticated, async (req, res) => {
  const images = await Image.find()
    .sort({ timestamp: -1 })
    .lean({ virtuals: true });
  res.render("posts/posts", { images });
});

router.get("/get/my-posts", isAuthenticated, async (req, res) => {
  const { _id } = req.user;
  const images = await Image.find(_id)
    .sort({ timestamp: -1 })
    .lean({ virtuals: true });
  res.render("posts/mypost", { images });
});

router.get("/get/post/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const img = await Image.findById(id).lean();
  let date = time(img.timestamp);
  img.timestamp = date;
  const user = await User.findById({ _id: img.user_id }).lean();
  res.render("posts/post", { img, user });
});

router.post("/send/post", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const { _id } = req.user;
  let image;
  const result = await uploadImage(req.files.image.tempFilePath);
  image = {
    url: result.secure_url,
    public_id: result.public_id,
  };
  await fs.remove(req.files.image.tempFilePath);
  const newImage = await Image({ title, description, image, user_id: _id });
  await newImage.save();
  res.redirect("/get/posts");
});

router.get("/update/post/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const img = await Image.findById(id).lean();
  res.render("posts/update", { img });
});

router.post("/update/post/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await Image.findByIdAndUpdate(id, { title, description });
  res.redirect("/get/posts");
});

router.get("/remove/post/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  if (!image) {
    req.flash("error_msg", "La imagen no existe")
    res.redirect("/get/posts");
  }

  if (image) {
    const img = String(image.user_id);
    const user = String(req.user._id);
    if (img == user) {
      const removed = await Image.findByIdAndDelete(id);
      await deleteImage(removed.image.public_id);
      res.redirect("/get/posts");
    } else {
      req.flash("error_msg", "No puedes remover esta imagen");
      res.redirect("/get/posts");
    }
  }
});

router.get("/add/post", isAuthenticated, (req, res) => res.render("posts/add"));

export default router;
