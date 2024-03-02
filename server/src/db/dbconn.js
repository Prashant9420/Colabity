import mongoose from "mongoose";

const dbConn = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database connected successfully. HOST: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
};
export { dbConn };
