const express=require("express");
const app=express();
const path=require("path");

const hbs=require("hbs");
const collection=require("./mongodb")
const templatepath=path.join(__dirname,'../template');
app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatepath);
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("login");
})
app.get("/siginin",(req,res)=>{
    res.render("siginin");
})
app.post("/siginin",async (req,res)=>{
    const data={
        name:req.body.name,   
        password:req.body.password
    }
    await collection.insertMany([data]);
    res.render("home");
})
app.post('/login',(req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    collection.findOne({ name: username, password: password })
    .then((user) => {
      if (!user) {
        console.log('User not found');
        res.send('Invalid username or password');
      } else {
        console.log('User signed in:', user);
        res.render('home');
      }
    })
    .catch((error) => {
      console.log('Error finding user:', error);
      res.send('Error signing in');
    });
});

app.listen(3006, () => {
    console.log(`App listening at http://localhost:3006`);
  });