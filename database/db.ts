import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0,
}

export const connectToMongo = async () => {
    if (mongoConnection.isConnected === 1) return;
    if(mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if(mongoConnection.isConnected === 1) return console.log('MongoDB is already connected.');
        await mongoose.disconnect();
    }
    const connection = await mongoose.connect(process.env.MONGODB_URL || '');
    mongoConnection.isConnected = 1;
    console.log('MongoDB connected');
    return connection;
}

export const disconnectFromMongo = async () => {
    if(mongoConnection.isConnected === 0) return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('MongoDB disconnected');
}