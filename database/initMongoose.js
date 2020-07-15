const mongoose = require("mongoose");
const chalk = require("chalk");

async function connectMongoose() {
  // To make sure the Mongoose Connection is only called once in
  // the API routes, check if its ready state is true.
  if (mongoose.connections[0].readyState) return;

  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(
    chalk.green("MongoDB connected with Mongoose:", conn.connection.host)
  );
}

module.exports = connectMongoose;
