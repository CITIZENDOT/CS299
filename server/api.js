const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "Email/Password in Incorrect.",
      });
    }
    console.log(user.email, user.id);
    try {
      if (await bcrypt.compare(password, user.passwordHash)) {
        const accessToken = jwt.sign(
          {
            email: user.email,
            _id: user._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" } // 1 hour
        );
        user.accessToken = accessToken;
        user.save();
        return res.status(200).json({
          accessToken: accessToken,
          email: user.email,
        });
      } else {
        return res.status(403).json({
          message: "Email/Password is Incorrect.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  return;
});

router.post("/signUp", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    if (user) {
      return res.status(409).json({
        message:
          "Email already registered. Please register with another email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(
      {
        email: email,
        passwordHash: hashedPassword,
      },
      (err, _obj) => {
        if (err) {
          return res.status(500).json({
            message: "Couln't create User. Please contact administrator.",
          });
        } else {
          return res.status(200).json({
            message: "User created successfully. ",
          });
        }
      }
    );
  });
  return;
});

module.exports = router;
