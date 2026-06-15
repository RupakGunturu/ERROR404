import cors from 'cors';
import express from 'express';
import { connectToDB, db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', (req, res) => {
    res.json("server is running successfully!");
})

app.post('/ast', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    await db.collection("ast").find().toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insert', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    }).catch((e)=>console.log(e))
 
})

app.post('/signin', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    console.log(req.body)
    await db.collection("newuser").findOne({Gmail:req.body.Gmail})
    .then((result)=>{
        console.log(result)
        if(result?.Password===req.body.Password){
            res.json({message:"login sucess", values:result})
        } else {
            res.json({error:"user not found"})
        }
    })
    .catch((e)=>console.log(e))
})

app.post('/signup', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    console.log(req.body)
    await db.collection("newuser").insertOne({Gmail:req.body.Gmail,Password:req.body.Password,Phone:req.body.Phone,Registerno:req.body.Register})
    .then((result)=>{
        console.log(result)
        if(result){
            res.json({message:"Signup sucess", values:result})
        } else {
            res.json({error:"Failed"})
        }
    })
    .catch((e)=>console.log(e))
})

app.post('/admin-signin', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    await db.collection("newuser").findOne({Gmail:req.body.Gmail})
    .then((result)=>{
        if(result?.Password===req.body.Password){
            res.json({message:"login success", values:result})
        } else {
            res.json({error:"Invalid credentials"})
        }
    })
    .catch((e)=>console.log(e))
})

app.post('/findmany', async(req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    await db.collection("details2").find().toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insertmany', async(req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not connected' });
  await db.collection("details2").insertMany(req.body)
  .then((result)=>{
      res.json(result)
  })
  .catch((e)=>console.log(e))
})

async function seedDefaults() {
    if (!db) return;
    const matchCount = await db.collection("matches").countDocuments();
    if (matchCount === 0) {
        await db.collection("matches").insertMany([
            { matchId: 'match1', team1: 'CIC Hackers', team2: 'ECE Rockers', match: 'CIC Hackers vs ECE Rockers', runs: 0, wickets: 0, overs: 0.0 },
            { matchId: 'match2', team1: 'IT Techies', team2: 'Royal Civils', match: 'IT Techies vs Royal Civils', runs: 0, wickets: 0, overs: 0.0 },
        ]);
    }
    const slotCount = await db.collection("slots").countDocuments();
    if (slotCount === 0) {
        await db.collection("slots").insertMany([
            { id: 'match1', name: '15 Aug Morning session', booked: false },
            { id: 'match2', name: '15 Aug Evening session', booked: false },
            { id: 'match3', name: '16 Aug Morning session', booked: false },
            { id: 'match4', name: '16 Aug Evening session', booked: false },
        ]);
    }
}

app.get('/livescore', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    const matchId = req.query.matchId || 'match1';
    try {
        const match = await db.collection("matches").findOne({ matchId });
        if (match) {
            res.json(match);
        } else {
            res.status(404).json({ error: 'Match not found' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/score', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    const { matchId, runs, wickets, overs, team1Name, team2Name } = req.body;
    try {
        const existing = await db.collection("matches").findOne({ matchId });
        if (!existing) {
            return res.status(404).json({ error: 'Match not found' });
        }
        const t1 = team1Name || existing.team1;
        const t2 = team2Name || existing.team2;
        await db.collection("matches").updateOne({ matchId }, {
            $set: {
                team1: t1,
                team2: t2,
                match: t1 + " vs " + t2,
                runs: runs !== undefined && runs !== '' ? parseInt(runs) : existing.runs,
                wickets: wickets !== undefined && wickets !== '' ? parseInt(wickets) : existing.wickets,
                overs: overs !== undefined && overs !== '' ? parseFloat(overs) : existing.overs,
            }
        });
        const updated = await db.collection("matches").findOne({ matchId });
        res.json({ message: 'Score updated successfully', match: updated });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/slots', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    try {
        const slots = await db.collection("slots").find().toArray();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slots', error });
    }
});

app.post('/slot', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    const { matchid } = req.body;
    try {
        const slot = await db.collection("slots").findOne({ id: matchid });
        if (!slot) {
            return res.json({ message: "Match Not Found" });
        }
        if (slot.booked) {
            return res.json({ message: "Match Already Booked" });
        }
        await db.collection("slots").updateOne({ id: matchid }, { $set: { booked: true } });
        return res.json({ message: "Match Booked" });
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot', error });
    }
});

app.delete('/slot', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database not connected' });
    const { matchid } = req.body;
    try {
        const slot = await db.collection("slots").findOne({ id: matchid });
        if (!slot || !slot.booked) {
            return res.json({ message: "Match Not Found" });
        }
        await db.collection("slots").updateOne({ id: matchid }, { $set: { booked: false } });
        return res.json({ message: "Match Deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slot', error });
    }
});

connectToDB(async () => {
    await seedDefaults();
    app.listen(9000, () => {
        console.log("server running at 9000");
    });
});