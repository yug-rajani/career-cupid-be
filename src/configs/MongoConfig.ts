import "dotenv/config";
import mongoose from "mongoose";

// Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
const MONGODB_URI = process.env.MONGODB_URI;

//console.log(MONGODB_URI);

export function connectToDB() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open to the given URL");
  });

  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection is disconnected");
  });
}
