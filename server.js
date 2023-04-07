const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const connectDB = require("./config/db");
// Load the environment variables using dotenv package
dotenv.config({ path: "./config/config.env" });

connectDB();

//import/load the API's route files
const measurements = require("./routes/measurements");
const account = require("./routes/accounts");
const clientele = require("./routes/clientele");
const auth = require("./routes/auth");
const topics = require("./routes/topics");
const chatRoom = require("./routes/chatroom");
// const { Socket } = require("dgram");

// Load Express API
const app = express();

/*
This section is used to Load Express Libraries
*/

//Use Body parser and for JSON data
app.use(express.json());
//use cookie parser
app.use(cookieParser());

//use helmet for additional security and such as cross-site attacks
app.use(helmet());
//prevent xss attacks i.e no script tags in our data
app.use(xss());

//Enable CORS
app.use(cors());

// Add request rate limit
const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 70, //max of 100 aPI calls in 10min
});
app.use(rateLimiter);

//Prevent http param pollution
app.use(hpp());

/**
 * This section is used to link express with the external libraries such as middleware libraries
 */
//enable our middleware logger. This may also be disabled for production environment
app.use(logger);

// Morgan logging middleware for only the development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount routers
app.use("/api/v1/measurements", measurements);
app.use("/api/v1/accounts", account);
app.use("/api/v1/clientele", clientele);
app.use("/api/v1/auth", auth);
app.use("/api/v1/topics", topics);
app.use("/api/v1/chat", chatRoom);

//Note: Error handler (middleware) must come after the routers and not before it.
app.use(errorHandler);

//Load the process environments
const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process if unhandled exceptions like DB connection is encountered
  // server.close(() => process.exit(1));
});
