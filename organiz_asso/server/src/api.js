const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('./entities/users');
const bcrypt = require('bcrypt');
const Forum = require('./entities/forum');
const Publication = require('./entities/publication');



exports.default = (req,res,next) => {
    return res.status(200).json("ok")
}

exports.signup = (req, res, next) => {
    if(!req.session.user){
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
    }
    else{
        res.status(401).json({"message" : "Déja connecté"})
    }
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
        
        User.findOne({ username: req.query.username })
        .then(user => {
            if(!user){
                return res.status(401).json({"message" : "Utilisateur introuvable"})
            }
            return res.status(200).json({user});
        })
        .catch(err => console.log(err))
    }

}

exports.getProfile = (req, res, next) => {
    if(req.session.user){
        
        User.findOne({ username: req.session.user.username })
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
    await User.findOne({username: req.params.user})
    .then(user => {
        if(!user){
            return res.status(401).json({"message" : "Utilisateur introuvable"})
        }
        if(req.session.user.username == user.username){
            return res.status(401).json({"message" : "Vous ne pouvez pas changer votre propre status"})
        }
        user.admin = req.body.admin;
        user.save()
        .catch(err => console.log(err));

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
            return res.status(423).json({"message": "Vous devez être administrateur pour faire cela"})
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
    answered = req.body.answeredPostID != null ? req.body.answeredPostID : ""
    title_ = answered ?  "" : req.body.title
    const post = new Publication({
            userID: req.session.user.username,
            content: req.body.content,
            title: title_,
            date: new Date(),
            answeredPostID: answered,
            forumID: req.body.forum
        });
        post.save()
        .then(() => {
            if(answered){
                Publication.findById(answered)
                .then(ans => {
                    if(!ans){
                        return res.status(401).json({"message" : "post introuvable ou inexistant"}) 
                    }
                    ans.comments.push(post)
                    ans.save().catch(err => console.log(err))
                })
            }
            res.status(201).json({"message" : "Post crée avec succès"})
        }
        ).catch(error => res.status(500).json({ error }));
}

exports.getPostID = (req,res,next) => {
    Publication.findById(req.query.id)
    .then(post =>{
        if(!post){
            return res.status(401).json({"message" : "post introuvable ou inexistant"})
        }
        return res.status(200).json({post})
    }
    ).catch(error => res.status(400).json({ error }));
}

exports.getPostUser = (req,res,next) => {
    Publication.find({userID : req.params.user})
    .then(post =>{
        if(post.length == 0){
            return res.status(401).json({"message" : "Aucun post"})
        }
        return res.status(200).json({post})
    }
    ).catch(error => res.status(400).json({ error }));
}

exports.getPostProfile = (req,res,next) => {
    Publication.find({userID : req.session.user.username})
    .then(post =>{
        if(post.length == 0){
            return res.status(401).json({"message" : "Aucun post"})
        }
        return res.status(200).json({post})
    }
    ).catch(error => res.status(400).json({ error }));
}

exports.getPostAll = (req,res,next) => {
    place = req.params.forum == 'admin' ? process.env.FORUM_ADMIN : process.env.FORUM_PUBLIC
    Publication.find({forumID : place})
    .then(post =>{
        if(post.length == 0){
            return res.status(500).json({"message" : "Aucun post publié sur ce forum"})
        }
        return res.status(200).json({post})
    }
    ).catch(error => res.status(400).json({ error }));
}

exports.search = (req,res,next) => {
    // Traitement de la recherche (de "mot1 mot2" => "\bmot1\b|\bmot2\b")
    var query = req.query.query;
    var forum = (req.query.admin == 'true' ? process.env.FORUM_ADMIN : process.env.FORUM_PUBLIC)
    query = query.split(" ");
    //var impair = (query.length % 2 == 1)
    for(word in query){
        query[word] = ("\\b".concat(query[word]))
    }
    query = query.join("|");
    query = "(".concat(query).concat(")")
    // ----------

    Publication.find({"$or": [ {"content" : RegExp(query,'i')}, {"title" : RegExp(query,'i')}, {"userID" : RegExp(query,'i')} ], "forumID" : forum})
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
        else if(post.userID != req.session.user.username && !req.session.user.admin){
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

exports.setAvatar = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier fourni.' });
  }

  const imageUrl = `/uploads/avatars/${req.file.filename}`;

  User.findOne({username : req.session.user.username})
  .then(user => {
    if(user){
        user.avatarUrl = imageUrl;
        user.save()
        .catch(err => console.log(err))
    }else{
        return res.status(500).json({message : "User introuvable"})
    }
  }
  )

  res.status(200).json({ avatarUrl: imageUrl });
}

// Configuration de Multer (dossier de stockage + nom du fichier)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '/uploads/avatars');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.session.user._id}-${uniqueSuffix}.jpg`); // basé sur l'utilisateur connecté
  }
});

exports.toggleLikePost = (req, res, next) => {
    const postId = req.params.id;

    Publication.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "Post non trouvé" });
            }

            // Si le post est déjà liké (venant du client), on décrémente sinon on incrémente
            const increment = req.body.increment === true ? 1 : -1;
            post.likes += increment;
            post.likes = Math.max(0, post.likes); // éviter les likes négatifs

            post.save()
                .then(() => res.status(200).json({ likes: post.likes }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.upload = multer({ storage });