const router = require('express').Router();
// import middleware 
const auth = require('./verifyToken');
// import post controller
const {createPost} = require('../controllers/postsController')


router.post('/',auth,(req,resp)=>{
    resp.status(200).json({posts:{
        title:'my first post',
        description: 'this is description'
    }}).send();
})

router.post('/create',auth,createPost)

module.exports = router;
