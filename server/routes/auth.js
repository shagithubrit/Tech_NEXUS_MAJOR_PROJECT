const express = require("express");

const router = express.Router();

// //middlewares
// const { authCheck, adminCheck } = require("../middlewares/auth");

// //controller
// const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// router.post("/create-or-update-user", authCheck, createOrUpdateUser);
// router.post("/current-user", authCheck, currentUser);
// router.post("/current-admin", authCheck, adminCheck, currentUser);

// module.exports = router;
router.get("/create-or-update-user", (req, res) => {
  res.json({
    data: "hey you jyust hit create or update user api endpoint",
  });
});

module.exports = router;