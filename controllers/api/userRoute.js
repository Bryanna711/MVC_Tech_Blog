const router = require('express').Router();
const { User } = require('../../models');

router.post("/", async (req, res) => {
    try {
        const newUserData = await User.create({
            attributes: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            },
        });

        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.user_name = newUserData.name;
            req.session.user_email = newUserData.email;
            req.session.logged_in = true;

            res.status(200).json(newUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
        });
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, try again" });
            return;
        }
        const validatePass = userData.checkPassword(req.body.password);

        if (!validatePass) {
            res.status(400).json({ message: "Incorrect email or password, try again" });
            return;
        };
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_email = userData.email;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//Look at this one....
router.post("/logout", async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;