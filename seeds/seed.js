const sequelize = require('../config/connection');
const { Posts, Comments } = require('../models');
// const User = require('../models/User');


const postSeedData = require('./postseeds');
const commentSeedData = require('./commentseeds');
// const userData = require('./userData.json');




const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const posts = await Posts.bulkCreate(postSeedData);
    
    // const user = await User.bulkCreate(userData);



    const comments = await Comments.bulkCreate(commentSeedData);


    // console.log(user);
    process.exit(0);
};

seedDatabase();