import mongoose from 'mongoose';

const connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return; // Already connected
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'Medi-App',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connect;
