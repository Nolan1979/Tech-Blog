const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');




router.post("/", withAuth, async (req, res) => {

    const body = req.body;
    console.log('yo', body)
    try {
        const postData = await Post.create({ ...body, user_id: req.session.user_id })
        console.log('yo', postData)
        res.json(postData);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

//route  to edit a specific post
router.put("/:id", withAuth, (req, res) => {
    console.log('update info', req.body)
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(updatedPost => {
            if (updatedPost > 0) {
                res.status(200).end()
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//route to delete a specific post
router.delete("/:id", withAuth, async (req, res) => {

    const body = req.body;
    console.log('yo', body)
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        console.log('yo', postData)
        res.json(postData);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});


module.exports = router;