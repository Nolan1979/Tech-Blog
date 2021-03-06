const router = require('express').Router();
const { User, Post } = require('../models');
// const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            
        });
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );


        res.render('homepage', {
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/post/:id', async (req, res) => {
    
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: [
//                         'id',
//                         'username',
//                         'email',
//                         'password',
//                     ],
//                 },
//             ],
//         });
//         const post = postData.get({ plain: true });
//         res.render('post', { post });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
   
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});








module.exports = router;