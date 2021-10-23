const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authorization = require("../../utils/authorization")


//need to track where this is going to happen
router.post("/", authorization, async (req,res)=>{
    try{
        const postData = await Post.create({
            ...req.body,
            user_id : req.session.id,
            include: [
                {
                    model: User,
                    attributes: ["name"],
                }],
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
            include: [
                {
                    model: User,
                    attributes: ["name"],
                }],
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

module.exports = router