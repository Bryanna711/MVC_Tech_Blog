const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const authorization = require('../utils/authorization');

router.get("/", authorization, async (req, res) => {
    const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [{ model: User }]
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
        layout: "profile",
        posts,
        // logged_in: req.session.logged_in
    })
});

router.get("/edit/:id", authorization, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]

        });
        const posts = postData.get({ plain: true });
        res.render("singlepost", {
            layout: "profile",
            posts,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router

