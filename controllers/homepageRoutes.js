const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ["name"],
            },
        ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('', {
        posts,
        logged_in: req.session.logged_in
    })
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["name", "date_created"]
                }
            ]
        });
        const posts = postData.get({ plain: true });
        res.render('', {
            ...posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to Profile
// Route to LoginPage