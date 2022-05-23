"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotAuthenticated = exports.isAuthenticated = void 0;

var isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error_msg", "No estas autorizado");
  res.redirect("/users/signin");
};

exports.isAuthenticated = isAuthenticated;

var isNotAuthenticated = function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  req.flash("error_msg", "Debes cerrar tu sesión actual");
  res.redirect("/get/posts");
};

exports.isNotAuthenticated = isNotAuthenticated;