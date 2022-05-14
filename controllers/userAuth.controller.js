const db = require("../models");
const User = db.user;
const Role = db.role;

exports.userAuth = (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { isActive: req.body.isActive } },
    { upsert: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "User activataion updated" });
  });
};

exports.allRoles = (req, res) => {
  Role.find({}).exec((err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      roles: role,
    });
  });
};
