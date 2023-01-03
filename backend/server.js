const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./config/databaseConnect");
mongoose.set("strictQuery", true);

// handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config();

connection();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on ${port} port`);
});

//unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Unhandle Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
