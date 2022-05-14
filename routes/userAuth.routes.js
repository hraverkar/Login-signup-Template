const { verifySignUp } = require("../middleware");
const { authJwt }  = require("../middleware");
const controller = require("../controllers/userAuth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/userAuth",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.userAuth
  );

  app.get(
    "/api/auth/allRoles",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allRoles
  );
};