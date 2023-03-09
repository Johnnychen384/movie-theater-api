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
        
        if(Object.keys(targetShows).includes("dataValues")){
            res.status(200).json( targetShows)
        } else {
            res.status(200).send("No Show Found.")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding target show.")
    }

})


router.get("/genres/:genre", async (req, res) => {
    try{
        const targetGenreArr = await Show.findAll({
            where: {
                genre: req.params.genre
            }
        })
        
        if(targetGenreArr.length > 0){
            res.status(200).json(targetGenreArr)
        } else {
            res.status(200).send("No genre found.")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding genre.")
    }
})


router.put("/:id/watched", async (req, res) => {
    try{
        const {title, rating} = req.body
        const targetUser = await User.findByPk(req.params.id)
        const watchedShow = await targetUser.getShows()

        if(watchedShow.length < 1) res.status(200).send("No shows found.")

        const targetShow = watchedShow.filter(show => show.title === title)

        if(targetShow.length > 0){
            await targetShow[0].update({rating: rating})
            res.status(200).json(watchedShow)

        } else {
            res.status(200).send("Could not find specific show.")
        }
        

    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding User.")
    }
})


router.put("/:showid/updates", async (req, res) => {
    try {
        const targetShow = await Show.findByPk(req.params.showid)
        if(!targetShow) res.status(200).send("Wrong show id")
        
        if(targetShow.status === "canceled") {
            await targetShow.update({status: "on-going"})
            
        } else {
            await targetShow.update({status: "canceled"})
        }

        res.status(200).json(targetShow)

    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding show.")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const targetShow = await Show.findByPk(req.params.id)
        if(!targetShow) res.status(200).send("Wrong show id")
        
        await targetShow.destroy()
        const allShows = await Show.findAll()

        res.status(200).json(allShows)

    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding show.")
    }
})

module.exports = router