const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const AuthRouter = require('./routes/AuthRouter.js');
//Role-based Routers
const StudentRouter=require('./routes/StudentRouter.js');
const MessRouter=require('./routes/MessRouter.js');
const WardenRouter=require('./routes/WardenRouter.js');
//Resource-based Routers
const AnnouncementRouter=require('./routes/AnnouncementRouter.js');
const MenuRouter=require('./routes/MenuRouter.js');

require('dotenv').config(); //to load the env variables
require('./models/db.js');

const PORT=process.env.PORT || 8080; //load the PORT from env or use hard-coded port

app.get('/ping', (req,res) => {
    res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors());//will take requests from any ports
app.use('/auth', AuthRouter); 
app.use('/student', StudentRouter);
app.use('/mess', MessRouter);
app.use('/warden', WardenRouter);
app.use('/api', AnnouncementRouter);
app.use('/api', MenuRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})