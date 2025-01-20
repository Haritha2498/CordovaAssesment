const express=require('express');
const app=express();
const port=3001;
const { mongoose }=require('mongoose');
const cors = require("cors");

app.use(
    cors({ 
      origin: "http://localhost:3000",
    })
  );

app.use(express.json())


mongoose.connect(
    "mongodb://localhost:27017/TASK"
)

const database=mongoose.connection;
database.on("error",(error)=>
{
    console.log("error",+error)
});
database.once("connected",()=>
{
    console.log("database connected");
})
const taskdetails=require('./models/task')


app.get('/tasks',async(req,res)=>{

    try{
        const details = await taskdetails.find({});
        res.json(details);
    }
    catch (error) {
    console.log(error);
    res.status(500).json();
  }
})

app.post("/tasks", async (req, res) => {
  try {
    console.log("adding task")
    const data = req.body;
    const result = await taskdetails.create(data);
    res.status(201).json(result);
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json();
  }
});



app.put("/tasks/:id", async (req, res) => {

    console.log("editing;")
  const data = req.body;
  console.log(data);
  const tasktitle = req.params.id;
  console.log(tasktitle);
  
  try {
    const result = await taskdetails.findOneAndUpdate(
      {title: tasktitle },
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send("Task updated ");
  } catch (error) {
    res.status(500).send("Server error");
  }
});


app.delete('/tasks/:id',async(req,res)=>{
    try{
        console.log("delete");
        const data=req.params.id;
        console.log(data);
        const result=await taskdetails.findOneAndDelete({ title: data })
        if (!result) {
        return res.status(404).send("Task not found");
    }
    res.send("Task deleted successfully");
  } catch (error) {
    res.status(500).send("error");
  }
})


// app.get("/filtertask",(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })


app.listen(port,()=>
{
    console.log("server is running on port : "+port);
})