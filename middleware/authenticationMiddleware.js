const jwt = require('jsonwebtoken');
const UserModel = require('../modals/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await UserModel.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error('Unable to find access, Please login');
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        res.status(401).send({ error: err.message,
        jwt:token})
    }
}

module.exports =  authMiddleware ;