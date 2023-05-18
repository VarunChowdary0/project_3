const express=require('express')
const mongoose=require('mongoose')
const app=express();

mongoose.connect('mongodb://127.0.0.1:27017/Node_trails')
    .then(()=>{
        console.log("Connected");
    })
    .catch((err)=>{
        console.log("error occoured :=>",err);
    })
const duplicateSchema=new mongoose.Schema({
                Email:String,
                DOB:String,
                Username:String,
})
const userSchema=new mongoose.Schema({
                Name:String,
                Email:String,
                DOB:String,
                Username:String,
                Password:String
            })
const UserModel=mongoose.model('trailData',userSchema)
            app.use(express.static('public'));
app.use(express.json());

app.set('view engine','ejs');
app.set('views', './views')

app.get('/SignUp',(req,res)=>{
    res.render('signUp');
})
app.get('/SignIN',(req,res)=>{
    res.render('signIN');
})
app.get('/profile',(req,res)=>{
    res.render('profile');
})
app.post('/API',(req,res)=>{
   const Userdata=req.body;
   const checkdup={
            Email:Userdata.Email,
            DOB:Userdata.DOB,
            Username:Userdata.Username,
   }

   console.log(checkdup);
   UserModel.find(checkdup)
    .then(feed =>{
        if(feed.length===0){
            UserModel.create(Userdata);
            res.status(200).json({})
        }
        else{
            res.status(404).json({});
            console.log("Dipication found..")
        }
    })
   
});
app.post('/verify',(req,res)=>{
    const verify=req.body;
    // stored request in verify
    // console.log(verify);
    // console.log(verify.Username);
    UserModel.find(verify)
    .then(result =>{
        if(result.length===0)
        {
            console.log("not found");
            res.status(404).json(result);
            
        }
        else{
            console.log(result);
            res.status(200).json({})
            app.post('/verify',(req,res)=>{
    const verify=req.body;
    // stored request in verify
    // console.log(verify);
    // console.log(verify.Username);
    UserModel.find(verify)
    .then(result =>{
        if(result.length===0)
        {
            console.log("not found");
            res.status(404).json(result);
            
        }
        else{
            console.log(result);
            res.status(200).json(result);
        }
    })
    .catch(err=>{
        console.log("Caught error: ",err);
    })

})
        }
    })
    .catch(err=>{
        console.log("Caught error: ",err);
    })

})
app.listen(1000,()=>{
    console.log("App server running..........")
})