const express = require('express')
const router = express.Router();
const BMIschema = require('../Model/BMIschema');


router.post("/:userId/post/bmidata", (req, res) => {
    const userId = req.params.userId;
    var  height = parseInt(req.body. height) * 0.3048 
    var weight = parseInt(req.body.weight);
    var bmi = weight / ( height *  height);
    let payload = {
         height:  height.toFixed(3),
        weight: weight,
        bmi : bmi.toFixed(2),
        userId : userId,
    }
    const task = new BMIschema(payload)
    task.save((err, success) => {
        if(err){
            return res.status(500).send({message : "something went wrong"})
        }
        return res.status(201).send(success)
    })

})

router.get("/:userId/get/bmidata", async (req, res) => {
    const userId = req.params.userId
    const bodyMassIndex = await BMIschema.find({userId})
    res.send(bodyMassIndex);
})


module.exports = router;