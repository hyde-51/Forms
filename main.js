const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3000;
const User = require("./models/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/Users")
  .then(() => {
    console.log("connection successfull");
  }).catch((e) => {
    console.log(`no connection`);
  });

app.get("/", (req, res) => {
  res.sendFile("public/login.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("public/login.html", { root: __dirname });
});

app.get("/register", (req, res) => {
  res.sendFile("public/register.html", { root: __dirname });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("❌ User not found");
    }

    if (user.password !== password) {
      return res.status(401).send("❌ Incorrect password");
    }
    console.log(`✅ Logged in as: ${user.username}`);

    res.redirect("/logout.html");
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Login failed");
  }
});


app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log("User saved:", newUser);
    res.redirect("/login"); // redirect after success
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).send("Error registering user");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
