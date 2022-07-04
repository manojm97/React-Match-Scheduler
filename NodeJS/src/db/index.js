const mongoose = require("mongoose");

// Connection to Mongo Database
mongoose.connect("mongodb://localhost:27017/fixtures-db", {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB',err));
