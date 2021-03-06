import Joi from 'joi';

class User {
    constructor() {
        this.Joi = Joi;
        this.UserSchema = {
            firstName: this.Joi.string().min(2).max(15).required(),
            lastName: this.Joi.string().min(2).max(15).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: this.Joi.string().min(5).required(),
            Type: this.Joi.string().required(),
            isAdmin: this.Joi.boolean().required(),
        };
        this.UserSignInSchema = {
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: this.Joi.string().min(5),
        }
    }

}

export default User;
