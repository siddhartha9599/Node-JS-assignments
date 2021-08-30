const express=require('express');
const mongoose=require('mongoose');


const app=express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/emp_api",{useNewUrlParser:true},()=>{
    console.log("mongo server connected");
})

const empSchema=new mongoose.Schema({
   emp_name:String,
   emp_salary:Number,
   emp_add:String,
   emp_phone:Number
  
})

const empModel= new mongoose.model('employees',empSchema);

// endpoint-1 to add details of a new employee
app.post("/employee",(req,res)=>{

    let emp=req.body;
    let empObj=new empModel(emp);

    empObj.save((err,data)=>{
        if(err===null){
            res.send({message:"New Employee Created"});
            
        }
    });
})

// endpoint-2 to get details of all the employees
app.get("/employees",async (req,res)=>{

    let emp=await empModel.find();
    res.send(emp);
    console.log(emp);
})


// endpoint-3 to get details employees based on id
app.get("/employee/:id",async (req,res)=>{

    let id=req.params.id;
    let emp_id=await empModel.find({_id:id});
    res.send(emp_id);
    console.log(emp_id);

})

// endpoint-4 to get details employees based on salary
app.get("/employee/emp_salary/:emp_salary",async (req,res)=>{

    let emp_salary=req.params.emp_salary;
    let emp_sal=await empModel.find({emp_salary:emp_salary});
    res.send(emp_sal);
    console.log(emp_sal);

})





// endpoint-5  to delete details of an employee 
app.delete("/employee/:id",(req,res)=>{

    let id=req.params.id;
    empModel.deleteOne({_id:id},(err,data)=>{

        if(err===null){
            res.send({message:"Employee Details Deleted"});
        }
    })
})


// creation and start of server 
app.listen(8000,()=>{
    console.log("server is running");
})
