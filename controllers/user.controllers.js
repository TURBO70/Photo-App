const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../emails/user.email");

const signUp = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          throw err;
        }
        await userModel.create({ name, email, password: hash, age });
        let token = jwt.sign({ email }, "process.env.JWT2", {
          expiresIn: 60 * 60,
        });
        sendEmail({ email, token, message: ` Hello  ${name} ` });
        res.status(201).json({ message: "email verification sent" });
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            userId: user._id,
            name: user.name,
            email: user.email,
            emailConfirm: user.emailConfirm,
          },
          "process.env.JWT1"
        );
        if (user.emailConfirm == true) {
          res.status(200).json({ message: "Success", token });
        } else {
          res.status(403).json({ message: "Verify your email first" });
        }
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "Email does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, "process.env.JWT2", async (err, decoded) => {
      if (err) {
        res.status(400).json({ message: "Invalid token" });
      } else {
        const user = await userModel.findOne({ email: decoded.email });
        if (user) {
          await userModel.findOneAndUpdate(
            { email: decoded.email },
            { emailConfirm: true }
          );
          res.status(200).json({ message: "Email verified successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signIn,
  signUp,
  emailVerify,
};
