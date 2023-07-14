const express = require('express');
const app = express()
const subscriberModel = require('./models/subscribers')
// Middleware to serve static files from the "public" folder
app.use(express.static('public'));
// Your code goes here

  app.get('/',(req,res)=>{
    res.send('index.html')
  })

// on /subscribers will give array of all subscribers in form of array
  app.get('/subscribers', async(req,res)=>{
    try{
      const subscribersList = await subscriberModel.find()
      res.json(subscribersList)
    }catch(err){
      res.status(500,err)
    }
  })

  // on /subscribers/names will give array of all (name and subscribedChannel) in form of json inside array
  app.get('/subscribers/names', async(req,res)=>{
    try{
      const subscribersList = await subscriberModel.find({},{'_id': 0,name: 1,subscribedChannel: 1})
      res.json(subscribersList)
    }catch(err){
      res.status(500,err)
    }
  })

// on /subscribers/:id where id is params in url insted of :id required _id PRESENT in db if _id is pnt present will return an error else it will return json object 
  app.get('/subscribers/:id',async(req,res)=>{
    const id = req.params.id;
    try{
     const subscribersList = await subscriberModel.findById(id)
      res.send(subscribersList)
    }catch(err){
      res.status(400).json({message: err.message})
    }
  })










module.exports = app;
