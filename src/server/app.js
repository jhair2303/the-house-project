import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import fileUpload from "express-fileupload";
import config from "./config.js";
import imagesRoutes from "../routes/images.routes.js";
import usersRoutes from "../routes/users.routes.js";
import "../config/passport.js";

const __dirname = path.resolve();

// Initializations
const app = express();

// settings
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "/src/views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  app.locals.user = req.user;
  next();
});

// routes
app.use(imagesRoutes);
app.use(usersRoutes);

// static files
app.use(express.static(path.join(__dirname, "/src/public")));

app.use((req, res) => {
  res.render("404");
});

export default app;
