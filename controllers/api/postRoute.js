const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authorization = require("../../utils/authorization")

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
//need to track where this is going to happen
router.post("?????", authorization, async (req,res)=>{
    try{
        const postData = await Post.create({
            ...req.body,
            user_id : req.session.id,
        });

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

//baseed on id of post
router.put("?????", authorization, async (req,res)=>{
    try{
        const postData = await Post.update({
            ...req.body,
            user_id : req.session.id,
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})
//based on id of post
router.delete("?????",authorization, async (req, res) => {
    try {
        const postData = await Post.destory({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post with that id exists." });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});