import bcrypt from 'bcrypt';

const hashPassword = (req, res, next) => {
    const salt = bcrypt.genSaltSync(15);
    const password = bcrypt.hashSync(req.body.password, salt);
    req.body.password = password;
    next();
};
export default hashPassword;