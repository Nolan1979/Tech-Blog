const router = require('express').Router();
const  { Post, Comments } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comments,
                    attributes: ['comment_text'],
                },
            ],
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        res.render('homepage', {
            layout: 'dashboard',
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router