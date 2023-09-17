import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO!);
  } catch (error: any) {
    throw new Error(error);
  }
}