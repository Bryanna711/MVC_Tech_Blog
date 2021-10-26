const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authorization = require("../../utils/authorization")


//need to track where this is going to happen
router.post("/", authorization, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.id,
            include: [
                {
                    model: User,
                }],

        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("profile", {
            posts,
            logged_in: req.session.logged_in
        })

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

//baseed on id of post
router.put("/:id", authorization, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                }],
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("singlepost", {
            posts,
            logged_in: req.session.logged_in
        })
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})
//based on id of post
router.delete("/:id", authorization, async (req, res) => {
    try {
        const postData = await Post.destory({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("profile", {
            posts,
            logged_in: req.session.logged_in
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router