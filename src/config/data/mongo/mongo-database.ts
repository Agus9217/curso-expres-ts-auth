import { connect } from "mongoose";

interface Options {
  mongoUrl: string;
  dbName?: string;
}

export class MongoDatabase {
  static async connectDb({ mongoUrl, dbName }: Options) {
    try {
      await connect(mongoUrl, {
        dbName: dbName,
      });

      console.log("Database is connected");

      return true;
    } catch (error) {
      console.log("Mongo database connection error");
      throw new Error(`Mongo database connection error: ${error}`);
    }
  }
}
