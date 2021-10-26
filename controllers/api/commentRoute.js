const router = require('express').Router();
const { Comment } = require('../../models');
const authorization = require('../../utils/authorization')

//Get Request on Comments

router.get("/", authorization, async (res, req) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map((post) => post.get({ plain: true }));
        res.render("comment-info", {
            ...comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/", authorization, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(commentData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", authorization, async (req, res) => {
    try {
        const commentData = await Comment.update({
            ...req.body,
            user_id: req.session.id,
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

router.delete("/:id", authorization, async (req, res) => {
    try {
        const commentData = await Comment.destory({
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