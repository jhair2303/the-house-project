"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = require("express-handlebars");

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _morgan = _interopRequireDefault(require("morgan"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _config = _interopRequireDefault(require("./config.js"));

var _imagesRoutes = _interopRequireDefault(require("../routes/images.routes.js"));

var _usersRoutes = _interopRequireDefault(require("../routes/users.routes.js"));

require("../config/passport.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dirname = _path["default"].resolve(); // Initializations


var app = (0, _express["default"])(); // settings

app.set("port", _config["default"].PORT);
app.set("views", _path["default"].join(_dirname, "/src/views"));
app.engine(".hbs", (0, _expressHandlebars.engine)({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs"); // middlewares

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].MONGODB_URI
  })
}));
app.use((0, _connectFlash["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./upload"
})); // Global Variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  app.locals.user = req.user;
  next();
}); // routes

app.use(_imagesRoutes["default"]);
app.use(_usersRoutes["default"]); // static files

app.use(_express["default"]["static"](_path["default"].join(_dirname, "/src/public")));
app.use(function (req, res) {
  res.render("404");
});
var _default = app;
exports["default"] = _default;