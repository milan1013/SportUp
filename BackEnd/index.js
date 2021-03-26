const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
require("dotenv").config();

async function boot() {
  mongoose.connect(
    process.env.MONGO_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;

      app.use(express.json());
      app.use(cors());
      app.use("/content", express.static("images"));
      app.use("/v1/auth", authRouter);
      app.use("/v1/user", userRouter);
      app.use("/v1/event", eventRouter);
      app.get("/", (req, res) => {
        res.send({
          message: "SportUp Back End API",
        });
      });
    }
  );
}

boot();

app.listen(process.env.PORT);
