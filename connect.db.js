import mongoose from "mongoose";

const dbUserName = "trilokchy999";
const dbPassword = encodeURIComponent("Trich@1009");
const dbHost = "cluster0.iy5cruv.mongodb.net";
const dbName = "my-restaurant";
const dbOptions = "retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`
    );
    console.log(`DB connection established...`);
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1); //1 means exit with failure
  }
};

export default connectDB;
// mongodb+srv://trilokchy999:<password>@cluster0.iy5cruv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
