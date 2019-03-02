const users = require("./controllers/users");
const scores = require("./controllers/scores");
const sandbox = require("./controllers/sandbox");
const { jwtAuth, postAuth, commentAuth } = require("./auth");
const router = require("express").Router();

router.post("/login", users.validate(), users.login);
router.post("/register", users.validate("register"), users.register);
router.post("/updateJwt", users.update);
router.get("/leaderboard", scores.list);
router.post("/challenge", sandbox.challenge);

module.exports = app => {
  app.use("/api", router);

  app.get("*", (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ message: "bad request" });
    }
    next(err);
  });
};
