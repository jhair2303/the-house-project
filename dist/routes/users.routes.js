"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../models/User.js"));

var _password = _interopRequireDefault(require("../lib/password.js"));

var _passport = _interopRequireDefault(require("passport"));

var _Image = _interopRequireDefault(require("../models/Image.js"));

var _mailer = require("../lib/mailer.js");

var _cloudinary = require("../lib/cloudinary.js");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _random = _interopRequireDefault(require("../lib/random.js"));

var _auth = require("../helpers/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get("/users/my-profile", _auth.isAuthenticated, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user, image;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findOne({
              email: req.user.email
            }).lean();

          case 2:
            user = _context.sent;
            _context.next = 5;
            return _Image["default"].find({
              user_id: user._id
            });

          case 5:
            image = _context.sent;
            user.count = image.length;
            _context.next = 9;
            return _User["default"].findByIdAndUpdate({
              _id: user._id
            }, {
              count: user.count
            });

          case 9:
            res.render("user/profile", {
              user: user
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/users/edit-profile", _auth.isAuthenticated, function (req, res) {
  var user = req.user;
  res.render("user/editprofile", {
    user: user
  });
});
router.post("/users/edit-profile", _auth.isAuthenticated, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, name, email, password, photo, result, _photo, _result, pass;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

            if (!(name !== "" && email !== "" && password === "")) {
              _context2.next = 21;
              break;
            }

            if (!req.files) {
              _context2.next = 15;
              break;
            }

            _context2.next = 5;
            return (0, _cloudinary.uploadImage)(req.files.image.tempFilePath);

          case 5:
            result = _context2.sent;
            photo = result.secure_url;
            _context2.next = 9;
            return _fsExtra["default"].remove(req.files.image.tempFilePath);

          case 9:
            _context2.next = 11;
            return _User["default"].findOneAndUpdate({
              _id: req.user._id
            }, {
              email: email,
              name: name,
              photo: photo
            }).lean();

          case 11:
            req.flash("success_msg", "Datos actualizados correctamente");
            res.redirect("/users/my-profile");
            _context2.next = 19;
            break;

          case 15:
            _context2.next = 17;
            return _User["default"].findOneAndUpdate({
              _id: req.user._id
            }, {
              email: email,
              name: name
            });

          case 17:
            req.flash("success_msg", "Datos actualizados correctamente");
            res.redirect("/users/my-profile");

          case 19:
            _context2.next = 45;
            break;

          case 21:
            if (!(name !== "" && email !== "" && password !== "")) {
              _context2.next = 44;
              break;
            }

            if (!req.files) {
              _context2.next = 38;
              break;
            }

            _context2.next = 25;
            return (0, _cloudinary.uploadImage)(req.files.image.tempFilePath);

          case 25:
            _result = _context2.sent;
            _photo = _result.secure_url;
            _context2.next = 29;
            return _fsExtra["default"].remove(req.files.image.tempFilePath);

          case 29:
            _context2.next = 31;
            return (0, _password["default"])(password);

          case 31:
            pass = _context2.sent;
            _context2.next = 34;
            return _User["default"].findOneAndUpdate({
              _id: req.user._id
            }, {
              email: email,
              name: name,
              photo: _photo,
              password: pass
            }).lean();

          case 34:
            req.flash("success_msg", "Datos actualizados correctamente");
            res.redirect("/users/my-profile");
            _context2.next = 42;
            break;

          case 38:
            _context2.next = 40;
            return _User["default"].findOneAndUpdate({
              _id: req.user._id
            }, {
              email: email,
              name: name,
              password: password
            });

          case 40:
            req.flash("success_msg", "Datos actualizados correctamente");
            res.redirect("/users/my-profile");

          case 42:
            _context2.next = 45;
            break;

          case 44:
            res.redirect("user/profile", {
              user: user
            });

          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/users/signin", _auth.isNotAuthenticated, function (req, res) {
  res.render("user/signin");
});
router.get("/users/signup", _auth.isNotAuthenticated, function (req, res) {
  res.render("user/signup");
});
router.post("/users/signin", _auth.isNotAuthenticated, function (req, res, next) {
  _passport["default"].authenticate("local.signin", {
    successRedirect: "/get/posts",
    failureRedirect: "/users/signin",
    failureFlash: true
  })(req, res, next);
});
router.post("/users/signup", _auth.isNotAuthenticated, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var errors, _req$body2, name, email, password, confirm_password, bEmail, newUser;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = [];
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, confirm_password = _req$body2.confirm_password;

            if (password != confirm_password) {
              errors.push({
                text: "Las contraseñas no coinciden"
              });
            }

            if (password.length < 5) {
              errors.push({
                text: "La contraseña debe tener al menos 5 caracteres"
              });
            }

            if (!(errors.length > 0)) {
              _context3.next = 8;
              break;
            }

            res.render("user/signup", {
              errors: errors,
              email: email,
              name: name,
              password: password,
              confirm_password: confirm_password
            });
            _context3.next = 29;
            break;

          case 8:
            _context3.next = 10;
            return _User["default"].findOne({
              email: email
            });

          case 10:
            bEmail = _context3.sent;

            if (!bEmail) {
              _context3.next = 16;
              break;
            }

            req.flash("error_msg", "El correo ya se encuentra en uso");
            res.redirect("/users/signup");
            _context3.next = 29;
            break;

          case 16:
            _context3.next = 18;
            return (0, _User["default"])({
              email: email,
              name: name,
              password: password
            });

          case 18:
            newUser = _context3.sent;
            _context3.next = 21;
            return (0, _password["default"])(password);

          case 21:
            newUser.password = _context3.sent;
            newUser.photo = "https://res.cloudinary.com/dil3klrac/image/upload/v1653084677/posts/ab6g7h4hfhcvymsolzg1.png";
            _context3.next = 25;
            return newUser.save();

          case 25:
            _context3.next = 27;
            return _mailer.transporter.sendMail({
              from: '"Te has registrado en House Page" <house.company.col@gmail.com>',
              to: newUser.email,
              subject: "Felicidades te has registrado",
              html: "<div>\n                  <h2 style=\"margin-bottom: 35px\">House Website</h2>    \n                  <h3>Hola ".concat(newUser.name, "</h3>\n                  <p>Te damos la bienvenida a la p\xE1gina oficial de <b>Los de la casa</b></P>\n                  <p>Gracias por preferirnos.</P>\n                  <a href=\"\"\">Ir al sitio</a>\n                  <footer style=\"margin-top:30px\">\n                  <h3>Contacto:</h3>\n                  <p>House Company</p>\n                  <p>house.company.col@gmail.com</p>\n                  </footer>\n              </div>")
            });

          case 27:
            req.flash("success_msg", "Te has registrado");
            res.redirect("/users/signin");

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/users/logout", function (req, res) {
  req.logout();
  req.flash("success_msg", "Has cerrado tu sesión");
  res.redirect("/users/signin");
});
router.get("/users/reseat-password", _auth.isNotAuthenticated, function (req, res) {
  res.render("user/reseat");
});
router.post("/users/reseat-password", _auth.isNotAuthenticated, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var email, user, password;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = req.body.email;
            _context4.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 9;
              break;
            }

            req.flash("error_msg", "El correo no pertenece a un usuario registrado");
            res.redirect("/users/signin");
            _context4.next = 17;
            break;

          case 9:
            password = (0, _random["default"])();
            _context4.next = 12;
            return (0, _password["default"])(password);

          case 12:
            user.password = _context4.sent;
            _context4.next = 15;
            return _mailer.transporter.sendMail({
              from: '"Recuperación de contraseña" <house.company.col@gmail.com>',
              to: user.email,
              subject: "Recupera tu contraseña",
              html: "<div>\n                <h2 style=\"margin-bottom: 35px\">House Website</h2>    \n                <h3>Hola ".concat(user.name, "</h3>\n                <p>Tu nueva contrase\xF1a es ").concat(password, "</b></P>\n                <p>Gracias por preferirnos.</P>\n                <a href=\"\"\">Ir al sitio</a>\n                <footer style=\"margin-top:30px\">\n                <h3>Contacto:</h3>\n                <p>House Company</p>\n                <p>house.company.col@gmail.com</p>\n                </footer>\n            </div>")
            });

          case 15:
            user.save();
            res.render("user/signin", {
              email: email
            });

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;