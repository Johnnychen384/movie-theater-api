const express = require('express')
const router = express.Router()
const { User, Show }= require("../models/index")

router.get("/", async (req, res) => {
    
    try{
        const allShows = await Show.findAll()
        
        if(allShows.length > 0){
            res.status(200).json(allShows)
        } else {
            res.status(200).send("No Shows")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding all Shows.")
    }

})




module.exports = router