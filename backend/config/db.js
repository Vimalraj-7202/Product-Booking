// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Needed to load .env if not already loaded in index.js

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is undefined. Check your .env file.');
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: 'test', // Optional: specify DB name if not already in URI
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
