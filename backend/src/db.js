import { MongoClient } from "mongodb";
import 'dotenv/config';

let db;
let client;
async function connectToDB(cb) {
    try {
        const url = process.env.MONGODB_URI;
        if (!url) throw new Error("MONGODB_URI is not set in .env file");
        client = new MongoClient(url);
        await client.connect();
        db = client.db("players");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB connection failed:", err.message);
        console.log("Server will not start — fix the connection and try again.");
        return;
    }
    cb();
}

export { connectToDB, db };