const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comments } = require('../../models');

router.post('/', withAuth, (req, res) => {
    Comments.create({...req.body, userId: req.session.userId})
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;