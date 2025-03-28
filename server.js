//express sera require de express
const express = require('express');
const useRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//on lui donne la path de notre varibale d'environement 
require('dotenv').config({path: './config/.env'})
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt 
app.get('*', checkUser); 
app.get('/jwtid', requireAuth, (req, res) => { 
    res.status(200).send(res.locals.user._id)
});

//routes 
app.use('/api/user', useRoutes);

//server 
app.listen(process.env.PORT, () => {
    console.log(`Listening in ${process.env.PORT}`);
})