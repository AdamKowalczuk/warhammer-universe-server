const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
// ATLAS_URI=mongodb+srv://warhammer:warhammer1234@nodeblog.q1wij.mongodb.net/node-blog?retryWrites=true&w=majority
// ATLAS_URI=mongodb+srv://blog:blog1234@cluster0.c2zkj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const postsRouter = require("./controllers/posts");

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
