// importing joi for validation input request
 const Joi = require('@hapi/joi');

const userRegisterValidation = (data)=>{
        let Schema = Joi.object({
        name:Joi.string().required().min(6).max(255),
        email:Joi.string().required().min(10).max(255),
        password:Joi.string().required('password should be 6 charactor long').min(6).max(1024),
        date:Joi.string()
    })
    return Schema.validate(data)
}

const userLoginValidation = (data)=>{
    let Schema = Joi.object({
    email:Joi.string().required().min(10).max(255),
    password:Joi.string().required('password should be 6 charactor long').min(6).max(1024),
    })
    return Schema.validate(data)
}



 module.exports = {userRegisterValidation, userLoginValidation};