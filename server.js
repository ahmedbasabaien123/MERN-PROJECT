//express sera require de express
const express = require('express');
const useRoutes = require('./routes/user.routes');
//on lui donne la path de notre varibale d'environement 
require('dotenv').config({path: './config/.env'})
require('./config/db');
const app = express();





//routes 
app.use('/api/user', useRoutes);

//server 
app.listen(process.env.PORT, () => {
    console.log(`Listening in ${process.env.PORT}`);
})