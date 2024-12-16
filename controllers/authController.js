const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { secretKey, tokenExpiration } = require("../config");

exports.signIn = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { name } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res
      .status(403)
      .json({ message: "Неправильное имя пользователя или пароль" });
  }
  const token = jwt.sign({ sub: user.name }, secretKey, {
    expiresIn: tokenExpiration,
  });
  res.json({ access_token: token, token_type: "bearer" });
};

exports.register = async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ where: { name } });
  if (existingUser) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ name, password: hashedPassword });
  res
    .status(201)
    .json({ message: "Пользователь успешно зарегистрирован", user: newUser });
};
