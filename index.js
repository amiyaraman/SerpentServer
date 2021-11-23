import express, { application } from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Serpent",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, () => {
    console.log("DataBase Connected");
}
)
const userSchema = new mongoose.Schema({ 
  
  UserId: String,
  Password: String,
  UserType: String,
});
const User =  mongoose.model("userlogininfos", userSchema);
app.post("/login",(req,res)=>{
    console.log(req.body);
    const { username, userpassword } = req.body;
    console.log(User.UserID);

    User.findOne({ UserId: username }, function(err, user) {
      console.log(user);
      console.log(user.Password);
      console.log(userpassword);
      if (user) {
        if (userpassword === user.Password) {
          res.send({ message: "Login Success", user: user });
        } else {
          res.send("Password MisMatched");
        }
      } else {
        console.log(err);
        console.log(userpassword);
        res.send("User Not Found");
      }
    });
    
})
app.listen(9002,()=>{
    console.log("BE started at port 9002")
})
