const User = require('./entities/users');
const bcrypt = require('bcrypt');
const session = require('express-session');

client_url = 'http://localhost:8000/'

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
        username: req.body.username,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
   User.findOne({ username: req.body.username })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: "Nom d'utilisateur ou mot de pass incorrect"});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: "Nom d'utilisateur ou mot de pass incorrect" });
                   }
                   req.session.user = {user}
                   res.status(200).json({
                       userId: user._id,
                       session: req.session
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

exports.isAuthentified = (req,res,next) => {
    if(req.session.user){
        res.status(200).json({"message" : "Tout est bon"});
    }else{
        res.status(401).json({ "message": "Non authentifié" });
    }
}

exports.logout = (req,res,next) => {
    req.session.destroy((error) => {
        if(error){
            console.log(error)
        }
    })
    res.status(200).json({"message" : "Déconnexion réussie"})
}