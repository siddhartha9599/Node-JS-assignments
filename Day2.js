const express= require('express'); //used to create api endpoints
const mongoose=require('mongoose'); //to work with mongoDB server

// express object
const app= express(); 



// applying middleware to convert unreadable data to js object
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/pokeapi', {useNewUrlParser:true},()=>{
    console.log('mongo server connected');
}) //{useNewUrlParser:true}---> old default url parser can give error in some PC's

// creating  and starting the server
app.listen(5500,()=>{
    console.log('server is running');
})

// for connceting to a collection
// schema--> structure and rules and regulations of a collection
// model---> to connect the schema to the collection
// both have to be created to different collections

const pokemonSchema= new mongoose.Schema({
    // what properties to be created in the schema
    // it is just like create table in sql
    name:String,
    type:String,
    imageUrl:String
})

// model will be used to to update,insert etc data
const pokemonModel= new mongoose.model('pokemons', pokemonSchema);  //(collection, schema)




// endpoint to get all pokemons
app.get("/pokemons", async( req,res)=>{

    // find will find and retrieve the data needed
    
    let pokemons=await pokemonModel.find({});

    res.send(pokemons);
})


// endpoint to fetch a single pokemon based on id
app.get("/pokemon/:id", async(req,res)=>{

    let id=req.params.id;
    let pokemon=await pokemonModel.find({_id:id});
    res.send(pokemon);
})


// endpoint to fetch a single pokemon based on type
app.get("/pokemon/type/:type", async(req,res)=>{

    let type=req.params.type;
    let pokemon=await pokemonModel.find({type:type});
    res.send(pokemon);
})




// endpoint to create a new pokemon

app.post("/pokemon", (req,res)=>{

    let pokemon=req.body;

    let pokemonObj= new pokemonModel(pokemon);

    pokemonObj.save((err,data)=>{
        if (err===null){
            res.send({message:"Pokemon created"});
        }
    });
   
})

// endpoint to delete a pokemon
// :id is a url parameter, : is important
// passing data through URL from client side
app.delete('/pokemon/:id', (req,res)=>{

    let id= req.params.id;
    // _id is the property name in mongDb and id is the variable we gave
    pokemonModel.deleteOne({_id:id}, (err,data)=>{
        if(err===null){
            res.send({message:"Deleted Pokemon"});

        }
    })
})

//  endpoint to update a pokemon
// pass the value to be updated and the id (wherere to update)

app.put("/pokemon/:id", (req,res)=>{
    let id= req.params.id;
    let pokemon=req.body;

    pokemonModel.updateOne({_id:id}, pokemon,(err,data)=>{ //where to update(id) data to update(pokemon)
        if(err===null){
            res.send('Pokemon Updated');
        }
    }) 
})