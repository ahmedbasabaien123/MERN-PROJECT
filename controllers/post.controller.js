const PostModel =  require("../models/post.model");
const UserModel = require("../models/user.model");
const UserMosel = require("../models/user.model")
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = async (req, res) =>  {
   const posts = await PostModel.find().sort({ createdAt: -1})
    res.status(200).json(posts);
    
};

module.exports.createPost = async (req, res) =>  {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.updatePost = (req, res) =>  {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    const updatedRecord = {
    message : req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set : updatedRecord },
        { new: true},
    )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
    };

module.exports.deletePost = (req, res) =>  {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    
    PostModel.findByIdAndDelete(
        req.params.id,
    )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};


module.exports.likePost = async (req, res) =>  {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true},
        ) 
        .then((docs) => res.status(201).send(docs))
        .catch((err) => res.status(400).send({ message: err }));
        
    
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true},
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};


module.exports.unlikePost = async (req, res) =>  {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)


    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true},
        ) 
        .then((docs) => res.status(201).send(docs))
        .catch((err) => res.status(400).send({ message: err }));
        
    
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true},
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

module.exports.commentPost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id, 
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text, 
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true},
        )
        .then((docs) => res.status(201).send(docs))
        .catch((err) => res.status(400).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
 };

 module.exports.editCommentPost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id);

    try {
        return PostModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) => 
                comment._id.equals(req.body.commentId)
        );

        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;

        return docs.save((err) => {
            if(!err) return res.status(200).send(docs);
            return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
 };

 module.exports.deleteCommentPost = async (req, res) => {
    
 };