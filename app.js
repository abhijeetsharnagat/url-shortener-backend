const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const passportSetup = require("./services/authService");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors"); // Import the cors middleware

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Set up session middleware
app.use(
  session({
    secret: "some-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up cors middleware
app.use(cors());

// Set up routes
app.use("/auth", authRoutes);
app.use("/urls", urlRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
