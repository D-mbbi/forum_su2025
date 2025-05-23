const url = require('url')
const path = require('path')
const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require('./routers/auth');
const homeRoutes = require('./routers/home');
const userRoutes = require('./routers/user');
const forumRoutes = require('./routers/forum');
const publicationRoutes = require('./routers/publication')
const session = require('express-session');
const cors = require('cors');
const publication = require('./entities/publication');

const dbAdress = "mongodb://localhost:27017/org_asso";
mongoose.connect(
    dbAdress, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'organiz_asso',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3
  }
}));
app.use('/api/auth',authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/user',userRoutes);
app.use('/api/forum',forumRoutes);
app.use('/api/post',publicationRoutes);






module.exports = app;