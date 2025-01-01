
import mongoose from "mongoose";

export const connectToMongoDB = async ()=>{
    try{
        console.log("mongo_uri:", process.env.MONGO_URI);
        const conn =await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected:${conn.connection.host}`);
    }
catch(err){
    console.log("error connecting to mongodb",error.message);
    process.exit(1);
}
}