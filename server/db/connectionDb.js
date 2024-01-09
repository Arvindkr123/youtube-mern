import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    const res = await mongoose.connect(process.env.DB_URL + "/youtube");
    console.log("connection is established at host : ", res.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};

export default connectionDb;
