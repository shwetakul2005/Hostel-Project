const express=require('express');
const app=express();
require('dotenv').config(); //to load the env variables

const PORT=process.env.PORT || 8080; //load the PORT from env or use hard-coded port

app.get('/ping', (req,res) => {
    res.send('PONG');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})