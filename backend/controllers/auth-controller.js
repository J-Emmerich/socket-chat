const { User } = require("../data/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET, GOOGLE_ID} = require("../config/config");
const {OAuth2Client} = require("google-auth-library")
const googleClient = new OAuth2Client(GOOGLE_ID);

const registerUser = async (username, password) => {
  try {
    if (password.length < 3) {
      throw new Error("Please, provide a better password");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash });
    const payload = {
      user: user.id,
    };
    const token = jwt.sign(payload, SECRET);

    return { user, token };
  } catch (err) {
    throw err;
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (isPasswordCorrect) {
      const payload = {
        user: user.id
      };
      const token = jwt.sign(payload, SECRET);
      return { user, token };
    } else throw new Error("Password don't match");
  } catch (err) {
    throw err;
  }
};

const googleVerify = async (token) => {
try {
  const verify = await googleClient.verifyIdToken({idToken: token, audience: process.env.GOOGLE_ID});
  const payload = verify.getPayload();
  return payload;
} catch (err){
  throw err;
}
}

module.exports = {
  registerUser,
  loginUser,
  googleVerify
};
