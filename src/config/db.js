import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        const connectDB = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }

}

export default connectDB;