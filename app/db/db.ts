import mongoose from 'mongoose';

const mongoDBUrl = process.env.MONGODB_URL;
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
export const connectDB = async () => {
  if (cached.conn) return;
  if (!cached.promise) cached.promise = mongoose.connect(mongoDBUrl as string);
  cached.conn = await cached.promise;
};

class DB {
  private static instance: typeof mongoose | null = null;
  private static mongoDBUrl = process.env.MONGODB_URL;
  static getDbInstance = async (): Promise<typeof mongoose | null> => {
    if (!this.instance) {
      this.instance = await mongoose.connect(this.mongoDBUrl as string);
    }
    return this.instance;
  };
}

export const db = await DB.getDbInstance();
