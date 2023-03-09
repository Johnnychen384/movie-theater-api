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


router.get("/:id", async (req, res) => {
    
    try{
        const targetShows = await Show.findByPk(req.params.id)
        
        if(Object.keys( targetShows).includes("dataValues")){
            res.status(200).json( targetShows)
        } else {
            res.status(200).send("No Show Found.")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding target show.")
    }

})


module.exports = router