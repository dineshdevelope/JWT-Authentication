const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3001;

const secretKey = "abcdef";

const users = [];
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).res.send("Request  Denied");
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashPassword });
    console.log(users);
    res.status(201).send("User Created Sucessfully");
  } catch (error) {
    res.status(500).send("Error Creating User");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = users.find((u) => u.username === username);
    console.log(user);
    if (!user) return res.status(400).send("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Password");
    const token = jwt.sign({ username: user.username }, secretKey);
    res.send({ token });
  } catch (error) {
    res.status(500).send("Error Loging in");
  }
});

app.get("/profile", verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Backend is Running On http://localhost:${PORT}`);
});
