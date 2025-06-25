import mongoose from "mongoose";

export const dbConn = () => {
  const MONGO_DB_URI = process.env.MONGO_DB_URI;
  mongoose.connect(MONGO_DB_URI)
    .then(() => {
      console.log("MongoDB is Connected...");
    })
    .catch((error) => {
      console.log("Error while mongoDB connection : ", error);
    })
}