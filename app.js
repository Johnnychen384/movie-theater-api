const express = require("express")
const app = express()
const {db} = require("./db")
const userRouter = require("./routes/userRoutes")


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter)



app.listen(3000, () => {
    db.sync();
    console.log("Connected to port 3000")
})