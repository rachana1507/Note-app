import mongoose from "mongoose"

export const connectDB= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.error("Error connecting to mongodb", error);
        process.exit(1); //Exit with failure
    }
}