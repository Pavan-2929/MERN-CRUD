import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Mongoose Connected"))
    .catch((error) => console.log(error));
};

export default connectToDb;
