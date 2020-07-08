const mongoose = require("mongoose");
const chalk = require("chalk");

async function connectMongoose() {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(chalk.green("MongoDB connected:", conn.connection.host));
}

module.exports = connectMongoose;
