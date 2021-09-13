const router = require("express").Router();

const User = require("../../models/User");



router.post("/", async (req, res) => {
console.log('REQ>BODY', req.body)
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password

        })

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
   
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        req.session.save(() => {

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(500).json(err); 
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



router.delete("/user/:id", async (req, res) => {
    console.log('REQ>BODY', req.body)
        try {
            const userData = await User.destroy({
                where:{
                    id: req.params.id
                }
    
            })
    res.json(userData)
           
        } catch (err) {
       
            res.status(400).json(err);
        }
    });

module.exports = router;