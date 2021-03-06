const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            layout: "main",
            posts,
            // logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
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
        const post = postData.get({ plain: true });
        res.render("singlepost", {
            layout: "main",
            post,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login", {
        layout: "main"
    })
})
// Route to Profile
//this route is  not working

// router.get("/profile", async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user.id, {
//             include: [{ model: Post }],
//         });
//         const user = userData.get({ plain: true });
//         res.render("profile", {
//             user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router