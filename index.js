const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routing = require("./routing/routs");
const authRouting = require("./auth/authentication");

require("dotenv").config();

const URLdb = process.env.URLdb;
const URLadmindb = process.env.URLadmindb;
const PORT = process.env.PORT || 99;

module.exports = class myMongoDBServer {
  constructor() {
    this.server = null;
  }
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandler();
    await this.initDataBase();
    this.startListening();
  }
  initServer = () => {
    this.server = express();
  };
  initMiddlewares = () => {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(morgan("combined"));
  };
  initRoutes = () => {
    this.server.use("/", routing);
    this.server.use("/get", routing);
    this.server.use("/auth", authRouting);
    // this.server.use("/contacts", editContacts);
  };
  initErrorHandler = () => {
    this.server.use((err, req, res, next) => {
      console.error("ErrorHandler:", err.message);
      res.status(500).send("Something broke!");
    });
  };
  initDataBase = async () => {
    try {
      await mongoose.connect(URLdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Post connection successful!");
      await mongoose.connect(URLadmindb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Admin connection successful!");
    } catch (error) {
      console.log("Connecting error:", error.message);
      process.exit(1);
    }

    // const db = mongoose.connection;
    // db.on("error", console.log(ERRoR));
  };
  startListening = () => {
    this.server.listen(PORT, () => {
      console.log("myMongoDBServer listening on port:", PORT);
    });
  };
};
