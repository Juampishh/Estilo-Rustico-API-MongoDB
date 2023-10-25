import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;

    if (!dbURL) {
      throw new Error("DB URL is not defined");
    }
    await mongoose.connect(dbURL);
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};
