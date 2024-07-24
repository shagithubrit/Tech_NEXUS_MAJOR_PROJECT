const admin= require("../firebase")

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token

  //here we try to identify the token from the frontend after login for user validation...
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser)
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expaired token",
    });
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};