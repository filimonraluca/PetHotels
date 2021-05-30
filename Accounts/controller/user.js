const User = require("../model/User");
const bcrypt = require("bcrypt");
var ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("./validation/user");
const statusCodes = require("../config/configurations").statusCodes;

async function registerUser(req, res) {
  const { error } = registerValidation(req.body);
  if (error != null) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { message: error.details[0].message } };
  }
  try {
    if (req.body.googleId) {
      let user = await User.findOne({ googleId: req.body.googleId });
      if (user) {
        res.status(statusCodes.CONFLICT);
        return {
          success: false,
          data: { message: "User already exists", user: user },
        };
      } else {
        const newUser = new User({
          googleId: req.body.googleId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
        user = await User.create(newUser);
        res.status(statusCodes.OK);
        return { success: true, data: { user } };
      }
    } else {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(statusCodes.CONFLICT);
        return {
          success: false,
          data: { message: "You already have an account", user: user },
        };
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        email: req.body.email,
        phone: req.body.phone,
      });
      user = await User.create(newUser);
      res.status(statusCodes.OK);
      return { success: true, data: { user } };
    }
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { err } };
  }
}

async function loginUser(req, res) {
  const { error } = loginValidation(req.body);
  if (error != null)
    return { success: false, data: { message: error.details[0].message } };
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return { success: false, data: { message: "Email does not exists" } };
    if (!user.password)
      return {
        success: false,
        data: { message: "You are logged in with google!" },
      };
    //verify password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return { success: false, data: { message: "Invalid password" } };

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return { success: true, data: { user, token } };
  } catch (err) {
    return { success: false, data: { err } };
  }
}

async function loginGoogleUser(req, res) {
  console.log("HEREEE");
  try {
    let user = await User.findOne({ googleId: req.body.googleId });
    if (!user) {
      const response = await registerUser(req, res);
      return response;
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return { success: true, data: { user, token } };
  } catch (err) {
    return { success: false, data: { err } };
  }
}
async function getUsers(req, res) {
  try {
    let users = await User.find();
    res.status(statusCodes.OK);
    return { success: true, data: users };
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { err } };
  }
}

async function getUserById(req, res) {
  try {
    let user = await User.findById(req.params.userId);
    if (user) {
      res.status(statusCodes.OK);
      return { success: true, data: user };
    } else {
      res.status(statusCodes.NOT_FOUND);
      return { success: false, data: "User not found!" };
    }
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST);
    return { success: false, data: { err } };
  }
}

async function changeUserInfo(req, res) {
  const result = await getUserById(req, res);
  if (result.success) {
    const user = result.data;
    console.log(req.body.lastName);
    if (
      req.body.firstName &&
      req.body.lastName &&
      req.body.email &&
      req.body.phone
    ) {
      if (req.body.password != user.password) {
        res.status(statusCodes.NOT_ALLOWED);
        return { success: false, data: { message: "Method not allowed" } };
      }
      try {
        let doc = await User.findOneAndUpdate(
          { _id: new ObjectId(req.params.userId) },
          req.body,
          {
            new: true,
          }
        );
        res.status(statusCodes.OK);
        return { success: true, data: { doc } };
      } catch (err) {
        res.status(statusCodes.BAD_REQUEST);
        return { success: false, data: { err } };
      }
    } else {
      res.status(statusCodes.NOT_ALLOWED);
      return { success: false, data: { message: "Method not allowed" } };
    }
  } else return { success: false, data: { message: "User not found" } };
}

async function deleteUser(req, res) {
  const result = await getUserById(req, res);
  if (result.success) {
    try {
      const del_res = await User.deleteOne({
        _id: new ObjectId(req.params.userId),
      });
      res.status(statusCodes.OK);
      return {
        success: true,
        data: { message: "Successfully deleted account!" },
      };
    } catch (err) {
      res.status(statusCodes.NOT_FOUND);
      return { success: false, data: { err } };
    }
  } else return result;
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  changeUserInfo,
  deleteUser,
  loginGoogleUser,
};
