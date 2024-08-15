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
    await db.collection("ast").find().toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insert', async(req, res) => {
    
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    }).catch((e)=>console.log(e))
 
})

app.post('/signin', async(req, res) => {
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

app.post('/findmany', async(req, res) => {
    await db.collection("details2").find().toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

let matches = {
    match1: { match: "CIC Hackers vs ECE Rockers", runs: 0, wickets: 0, overs: 0.0 },
    match2: { match: "IT Techies vs Royal Civils ", runs: 0, wickets: 0, overs: 0.0 }
  };

  app.get('/livescore', (req, res) => {
    const matchId = req.query.matchId || 'match1';
    const match = matches[matchId];
    
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  });

  app.post('/score', (req, res) => {
    const { matchId, runs, wickets, overs } = req.body;
  
    if (!matches[matchId]) {
      return res.status(404).json({ error: 'Match not found' });
    }
  
    matches[matchId] = {
      ...matches[matchId],
      runs: parseInt(runs),
      wickets: parseInt(wickets),
      overs: parseFloat(overs)
    };
  
    res.json({ message: 'Score updated successfully', match: matches[matchId] });
  });

//   app.post('/updateone', async(req, res) => {
//     await db.collection("ast").findOneAndUpdate({Name:req.body.Gmail},{$set:{Password:req.body,Password}})
//     .then((result)=>{
//         res.json({message: 'updated successfully',values:result});
//     })
//     .catch((e)=>console.log(e))
// })

// app.get('/slots', async (req, res) => {
//   try {
//     const slots = await db.collection('slots').find().toArray();
//     res.json(slots);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching slots', error });
//   }
// });

// app.put('/slots/:id', async (req, res) => {
//   const { id } = req.params;
//   const { booked } = req.body;

//   try {
//     const result = await db.collection('slots').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { booked: booked } }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: 'Slot not found' });
//     }

//     res.json({ message: 'Slot updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating slot', error });
//   }
// });

app.get('/slots', (req, res) => {
  const updatedSlots = slots.map(slot => ({
    ...slot,
    booked: !!bookedSlots[slot.id],
  }));
  res.json(updatedSlots);
});

app.post('/slot', (req, res) => {
  const { matchid } = req.body;

  if (bookedSlots[matchid]) {
    return res.json({ message: "Match Already Booked" });
  }

  bookedSlots[matchid] = true;
  return res.json({ message: "Match Booked" });
});

app.post('/insertmany', async(req, res) => {
  await db.collection("details2").insertMany(req.body)
  .then((result)=>{
      res.json(result)
  })
  .catch((e)=>console.log(e))
})

let bookedSlots = {}; 



const slots = [
  { id: 'match1', name: '15 Aug Morning session', booked: false },
  { id: 'match2', name: '15 Aug Evening session', booked: false },
  { id: 'match3', name: '16 Aug Morning session', booked: false },
  { id: 'match4', name: '16 Aug Evening session', booked: false },
];

app.delete('/slot', (req, res) => {
  const { matchid } = req.body;

  if (!bookedSlots[matchid]) {
    return res.json({ message: "Match Not Found" });
  }

  delete bookedSlots[matchid];
  return res.json({ message: "Match Deleted" });
});
  

connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})