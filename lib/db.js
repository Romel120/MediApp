import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ;

const connect = async () => {
    const connectState = mongoose.connection.readyState ;

    if(connectState === 1) {
        console.log("MongoDB is connected");
        return ;
    }

    if(connectState === 2){
        console.log("MongoDB is connecting...");
        return ;
    }

    try {
        mongoose.connect(MONGODB_URI, {
            dbName : 'Medi-App',
            bufferCommands : true    
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw new Error("Error : " , error) ;
    }
}

export default connect ;