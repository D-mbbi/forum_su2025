const User = require('./entities/users');
const bcrypt = require('bcrypt');
const Forum = require('./entities/forum');
const Publication = require('./entities/publication')
const session = require('express-session');



exports.default = (req,res,next) => {
    return res.status(200).json("ok")
}

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
                   req.session.user = user;
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
        next();
    }else{
        res.status(401).json({ "message": "Non authentifié" });
    }
}

exports.isAlreadyLoggedIn = (req,res,next) => {
    if(req.session.user){
        res.status(401).json({ "message": "Déjà connecté en tant que: ".concat(req.session.user.username).concat(", veuillez d'abord vous déconnecter") });
    }else{
        next();
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

exports.getUser = (req, res, next) => {
    if(req.session.user){
        
        User.findOne({ username: req.body.username })
        .then(user => {
            if(!user){
                return res.status(401).json({"message" : "Utilisateur introuvable"})
            }
            return res.status(200).json({user});
        })
        .catch(err => console.log(err))
    }

}

exports.setStatus =  async (req, res, next) => {
    await User.findOne({username: req.body.editedUser})
    .then(user => {
        if(!user){
            return res.status(401).json({"message" : "Utilisateur introuvable"})
        }
        user.admin = req.body.admin;
        user.save()
        .catch(err => console.log(err));
        req.session.user = user;

        return res.status(200).json({"message" : "Modification éffectuée avec succès"})
    })
    .catch(err => console.log(err));
}

exports.isAdmin = (req,res,next) => {
    if(req.session.user.admin){
        next();
    }else{
        res.status(401).json({"message": "Vous devez être administrateur pour faire cela"})
    }
}


exports.getForum = (req,res,next) => {
    if(req.params.type == "admin"){
        if(!req.session.user.admin){
            return res.status(401).json({"message": "Vous devez être administrateur pour faire cela"})
        }
        Forum.findById(process.env.FORUM_ADMIN)
        .then(forum => {
            if(!forum){
                return res.status(500).json({"message": "Le serveur n'arrive pas à accéder au forum demandé"})
            }
            return res.status(200).json({"message" : "Connecté au serveur admin",forum})
        }
        ).catch(err => console.log(err))
    }else if(req.params.type == "public"){
        Forum.findById(process.env.FORUM_PUBLIC)
        .then(forum => {
            if(!forum){
                return res.status(500).json({"message": "Le serveur n'arrive pas à accéder au forum demandé"})
            }
            return res.status(200).json({"message" : "Connecté au serveur public",forum})
        }
        ).catch(err => console.log(err))
    }else{
        return res.status(401).json({"message" : "Le forum demandé n'existe pas"})
    }
}

exports.createPost = (req,res,next) => {
        const post = new Publication({
            userID: req.session.user.username,
            content: req.body.content,
            title: req.body.title,
            date: new Date(),
            forumID: req.body.forum
        });
        post.save()
        .then(() =>
            res.status(201).json({"message" : "Post crée avec succès"})
        ).catch(error => res.status(400).json({ error }));
}

exports.getPost = (req,res,next) => {
    Publication.findById(req.body.id)
    .then(post =>{
        if(!post){
            return res.status(401).json({"message" : "post introuvable ou inexistant"})
        }
        return res.status(200).json({post})
    }
    ).catch(error => res.status(400).json({ error }));
}

exports.search = (req,res,next) => {
    // Traitement de la recherche (de "mot1 mot2" => "(mot1)*(mot2)")
    var query = req.body.search;
    query = query.split(" ");
    //var impair = (query.length % 2 == 1)
    for(word in query){
        query[word] = ("\\b".concat(query[word])).concat("\\b")
    }
    query = query.join("|");
    query = "(".concat(query).concat(")")

    // ----------

    Publication.find({"$or": [ {"content" : RegExp(query,'i')}, {"title" : RegExp(query,'i')} ]})
    .then(posts => {
        if(posts == []){
            return res.status(401).json({"message" : "Aucun post n'a été trouvé"})
        }
        return res.status(200).json({posts})
    })
    .catch(err => res.status(err.code).json(err));
}

exports.deletePost = (req,res,next) => {
    Publication.findById(req.params.id)
    .then(post => {
        if(!post){
            return res.status(400).json({message : "Post introuvable"})
        }
        else if(post.userID != req.session.user.username || !req.session.user.admin){
            return res.status(401).json({message : "Vous n'êtes pas l'auteur de ce post"})
        }
        Publication.deleteOne({_id : post._id})
        .then(() => {
            return res.status(200).json({message : "Le post a été supprimé avec succès"})
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}