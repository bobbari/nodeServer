const Joi = require('@hapi/joi');

const createPostValidation = (data) =>{
    let Schema = Joi.object({
        	"title":Joi.string().required('please enter title').min(5),
			"description":Joi.string().required('please enter description').min(10),
			"userId":Joi.number().required('user id is required'),
			"category":Joi.number().required('please select catergory')
    })
    return Schema.validate(data)
}
module.exports = createPostValidation;
