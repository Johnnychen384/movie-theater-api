const express = require("express")
const app = express()
const {db} = require("./db")
const userRouter = require("./routes/userRoutes")
const showRouter = require("./routes/showsRoute")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users", userRouter)
app.use("/shows", showRouter)



app.listen(3000, () => {
    db.sync();
    console.log("Connected to port 3000")
})