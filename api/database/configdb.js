import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(
            process.env.MONGO_DB_HOST,
            { dbName: process.env.MONGO_DB_NAME }
        );
        console.log("Banco conectado com sucesso!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default { connect };