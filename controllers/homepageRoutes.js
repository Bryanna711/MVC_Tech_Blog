const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const authorization = require('../utils/authorization');

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

    res.render('####name of handlebars####', {
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
        res.render('####name of handlebars####', {
            ...posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }
    res.render("###name of handlebars###")
})
// Route to Profile

router.get("/profile", authorization, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user.id, {
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('####name of handlebars####', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router