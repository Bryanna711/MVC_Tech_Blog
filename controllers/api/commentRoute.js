const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const authorization = require('../../utils/authorization')

router.post("/post/:id", authorization, async (req, res) => {
    try {
        const newComment = await Comment.create({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model:Post,
                }
            ],
           ...req.body,
           user_id : req.session.user_id
        });
        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err);
    }
});

//router.put()

//router.delete()