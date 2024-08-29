import { MongoClient } from "mongodb";

let db;
async function connectToDB(cb) {
    const url = "mongodb+srv://sivagovindharao:pkp123@cluster0.yfa6d.mongodb.net/"
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("players");
    cb();
}

// connectToDB()

export { connectToDB, db };