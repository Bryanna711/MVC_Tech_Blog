const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const authorization = require('../../utils/authorization')

router.post("/post/:id", authorization, async (req, res) => {
    try {
        const commentData = await Comment.create({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Post,
                }
            ],
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(commentData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("?????", authorization, async (req,res)=>{
    try{
        const commentData = await Comment.update({
            ...req.body,
            user_id : req.session.id,
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Post,
                }
            ],
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment with that id exists." });
            return;
        }
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("?????",authorization, async (req, res) => {
    try {
        const commentData = await Post.destory({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment with that id exists." });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;