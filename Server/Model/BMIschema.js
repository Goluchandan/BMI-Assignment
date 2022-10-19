const mongoose = require('mongoose');

const BMIschema = mongoose.Schema({ 
    weight : {
        type : Number,
        required : true
    },
    height : {
        type : Number,
        required : true
    },
    bmi : {
        type : Number
    },
    userId : {
        type : String
    }
},{timestamps : true})


const BMIModel = mongoose.model('BMIdata', BMIschema);

module.exports = BMIModel;