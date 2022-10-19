
const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://BMI1234:bmi1234@cluster0.teyklgl.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Server is Successfully Connected to MONGO DB Database");
})

db.on("error", (err) => {
    console.log("Error: " + err);
})


module.exports = mongoose;