const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authorization = require("../../utils/authorization")



router.post("/", authorization, async (req, res) => {
    const body = req.body;
    try {
        const postData = await Post.create({
            ...body,
            user_id: req.session.id,
            // include: [
            //     {
            //         model: User,
            //     }],

        });
        // const posts = postData.map((post) => post.get({ plain: true }));

        // res.render("profile", {
        //     posts,
        //     logged_in: req.session.logged_in
        // })

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/:id", authorization, async (req, res) => {
    try {
        const [postData] = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
            // include: [
            //     {
            //         model: User,
            //     }],
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        // const posts = postData.map((post) => post.get({ plain: true }));

        // res.render("singlepost", {
        //     posts,
        //     logged_in: req.session.logged_in
        // })
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", authorization, async (req, res) => {
    try {
        const [postData] = await Post.destory({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        // const posts = postData.map((post) => post.get({ plain: true }));

        // res.render("profile", {
        //     posts,
        //     logged_in: req.session.logged_in
        // })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router