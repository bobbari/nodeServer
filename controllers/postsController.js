//mongodb module
const postModule = require('../model/post')
//validation 
const createPostValidation  = require('../validations/postsValidation')

const  createPost = async(req,resp,next) =>{
    			
    const {title,description,userId,category} = req.body
    const {error} = createPostValidation(req.body);
    if (!error) {
        const Post = new postModule({title,description,userId,category})
        try {
            const createPost = await Post.save(); 
            resp.status(200).json({message:'post created successfully'}).send();
        } catch (error) {
            console.log("error ", error)
            resp.status(400).json({error:error}).send();
        }
    } else {
        resp.status(400).json({message:error.details[0].message}).send();
    }
    
}
module.exports = {createPost}