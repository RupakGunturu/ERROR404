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
    await db.collection("ast").findOne({Gmail:req.body.Gmail})
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

connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})