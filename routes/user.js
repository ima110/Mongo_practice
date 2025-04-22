const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index");

// User Routes
router.post('/signup',async (req, res) => {
    //user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password
    });
    res.status(200).send({msg:"User created successfully"});
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    try {
        const response = await Course.find({});
        res.status(200).send(
            response
        ); 
    } catch (error) {
        res.status(404).send({err:"Same error while listing down courses"})
    }
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    try {
        await User.updateOne(
        {username:username},{"$push":{purchasedCourses:courseId}}
    )
        res.status(200).send({msg:"Course added successfully"})
    } catch (error) {
        console.log(error);
        
    }
    
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    //fetching purchased courses by user
    const user =await User.findOne({
        username  : req.headers.username
    });
    console.log(user.purchasedCourses);
    const course = await Course.findOne({
        _id : {"$in":user.purchasedCourses}
    });
    res.status(200).json({
        course: course
    });
});

module.exports = router