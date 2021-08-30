const express= require('express'); //used to create api endpoints
const mongoose=require('mongoose'); //to work with mongoDB server

// express object
const app= express(); 



// applying middleware to convert unreadable data to js object
app.use(express.json());



// creating  and starting the server
app.listen(5500,()=>{
    console.log('server is running');
})

// user will send 2 things
// type of request
// url

// localhost:8000/dummy --> using get request
// /dummy is the url eg. www.facebook.com/home
// request and response objects

//these functions are called url endpoints or API endpoints
app.get("/dummy", (req,res)=>{  //function(req,res) can also be written  instead of =>

    res.send({message:'GET working' });

})
app.post("/create", (req,res)=>{  

    console.log(req.body);
    res.send({message:'POST working' });

})

// REQUEST METHODS
// GET--> used to get some data from user
// POST--> creating data/ sending data/ storing data from client side
// PUT--> create/ update data ---> whole record
// PATCH---> update data ---> a particular part of record
// DELETE---> delete data


// API testing tool can be used to test our code when we don't have a frontend to get requests