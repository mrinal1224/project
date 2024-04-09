const router = require('express').Router()
const Theatre = require('../models/theatreModel')


// Add a Theatre

router.post('/add-theatre' , async(req , res)=>{
    try {

       const newTheatre =  new Theatre(req.body)
       await newTheatre.save()
       res.send({
        success: true,
        message: "New theatre has been added!"
    })
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


router.put('/update-theatre',  async (req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.delete('/delete-theatre', async (req, res) => {
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});





module.exports = router;