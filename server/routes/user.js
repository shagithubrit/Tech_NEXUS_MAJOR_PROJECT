const express = require("express");

const router = express.Router();

// //middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// //controller
// const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user/cart", authCheck, getUserCart); //get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress);

//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);


// router.post("/create-or-update-user", authCheck, createOrUpdateUser);
// router.post("/current-user", authCheck, currentUser);
// router.post("/current-admin", authCheck, adminCheck, currentUser);

// module.exports = router;
// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you jyust hit user api endpoint",
//   });
// });

module.exports = router;
