//express sera require de express
const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');  //console.log(req.file);
//renome le fichier avec extension .jpg
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



//on lui donne la path de notre varibale d'environement 
require('dotenv').config({path: './config/.env'})
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt 
app.get('*', checkUser); 
app.get('/jwtid', requireAuth, (req, res) => { 
    res.status(200).send(res.locals.user._id)
});

//routes 
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)

//server 
app.listen(process.env.PORT, () => {
    console.log(`Listening in ${process.env.PORT}`);
})