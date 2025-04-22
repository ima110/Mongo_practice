const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password =req.body.password;
    await Admin.create({
        username,
        password
    })
    res.status(200).send({msg:"Admin account created successfully"})

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // This route is for admin to upload new course 
    const title = req.body.title
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    try {
        await Course.create({
            title,
            description,
            price,
            image
        });
        res.status(200).send({msg:"Course created successfully"});
    } catch (error) {
        res.status(400).send({err:"Invalide input "})
    }
    
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // this route will list down all the courses
    const response = await Course.find({});

    res.status(200).send({
        response
    });
});

module.exports = router;