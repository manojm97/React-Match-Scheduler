const mongoose = require("mongoose");

// Connection to Mongo Database
mongoose.connect("mongodb://localhost:27017/fixtures-db", {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
