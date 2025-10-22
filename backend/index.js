const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //since the react application runs on a different port and the server 
// that is listening for requests shouldnt say that the port that the request is coming from is unrecognized
const AuthRouter = require('./routes/AuthRouter.js');

require('dotenv').config(); //to load the env variables
require('./models/db.js');
const PORT=process.env.PORT || 8080; //load the PORT from env or use hard-coded port

app.get('/ping', (req,res) => {
    res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors());//will take requests from any ports
app.use('/auth', AuthRouter); 
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})