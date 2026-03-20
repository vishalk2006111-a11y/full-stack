const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://vishal20170068015:jxS0UN11XcwmVqPc@vishal.cjj4knb.mongodb.net/mydb")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send("User Saved");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
app.get("/users", async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const users = await User.find(filter);
    res.json(users);

  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});