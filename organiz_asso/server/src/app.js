const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require('./routers/auth');
const homeRoutes = require('./routers/home');
const session = require('express-session');
const cors = require('cors');

const dbAdress = "mongodb://localhost:27017/org_asso";
mongoose.connect(
    dbAdress, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use(cors({
  origin: 'http://localhost:8000',
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
    maxAge: 1000 * 60 * 60 * 72
  }
}));
app.use('/api/auth',authRoutes);
app.use('/api/home', homeRoutes);






module.exports = app;