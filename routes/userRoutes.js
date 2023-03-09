const express = require('express')
const router = express.Router()
const { User, Show }= require("../models/index")

router.get("/", async (req, res) => {
    
    try{
        const allUsers = await User.findAll()
        
        if(allUsers.length > 0){
            res.status(200).json(allUsers)
        } else {
            res.status(200).send("No Users")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding all Users.")
    }

})

router.get("/:id/shows", async (req, res) => {

    try{

        const userWithShows = await User.findByPk(req.params.id)

        if(Object.keys(userWithShows).includes("dataValues")){
            const shows = await userWithShows.getShows()
            res.status(200).json(shows)
        } else {
            res.status(200).send("No User Found.")
        }

    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding this User.")
    }


})


router.get("/:id", async (req, res) => {
    
    try{
        const targetUser = await User.findByPk(req.params.id)
        
        if(Object.keys(targetUser).includes("dataValues")){
            res.status(200).json(targetUser)
        } else {
            res.status(200).send("No User Found.")
        }


    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding this User.")
    }

})


router.put("/:id", async (req, res) => {
    try{
        const currentUser = await User.findByPk(req.params.id);
        const showArr = await Show.findAll();
        const watchedShow = req.body.title

        for(let show of showArr){
            const showValues = Object.values(show)

            if(showValues[0].title === watchedShow) {
                currentUser.addShow(show.dataValues.id)
            }
        }

        const watchedShowsArr = await currentUser.getShows()

        res.status(200).json(watchedShowsArr)

    } catch(err) {
        console.error(err)
        res.status(404).send("There is a problem with finding this User.")
    }
})



module.exports = router