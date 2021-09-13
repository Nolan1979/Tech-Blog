const Comments = require('./Comment');
const Post = require('./Post');
const User = require('./User');


User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comments, {
    foreignKey: 'user_id'
});

Post.hasMany(Comments, {
    foreignKey: 'post_id'
});


module.exports = {
    Comments,
    Post,
    User,
};