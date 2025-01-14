const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

module.exports = (client) => {
  (async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(mongoURL);
      console.log("MongoDB: Successfully connected into databases.");
    } catch (error) {
      console.log(`MongoDB: Cannot connected into our databases: ${error}`);
    }
  })();
};

// file optional, if you need the database no sql i recommended to use this.