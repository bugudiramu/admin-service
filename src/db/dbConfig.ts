import mongoose, { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions;

const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGO_DB_DEV_URI as string, connectionOptions)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log('Error in connecting to DB', err));
};

export default connectToDB;
