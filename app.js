const express = require("express");
const app = express();
const morgan = require("morgan");
const debug = require("debug")("app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserRouter = require('./routes/userRoutes');

dotenv.config();

// Connect to database
let mongoURI = process.env.DB_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    debug("MongoDB connected");
  })
  .catch((err) => {
    debug("MongoDB connection error: ", err);
  });

// Applying middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use('/api', UserRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => debug(`App listening on port ${port}`));
