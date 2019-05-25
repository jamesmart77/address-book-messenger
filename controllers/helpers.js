const jwt = require('./jwt');
const users = require('../ORM/models').users;
const groups = require('../ORM/models').groups;

module.exports = {
    authenticationCheck: async (req) => {
        try {
            let token = req.cookies.schedAroo_jwt;
            await jwt.verify(token);
            return 'JWT authenticated';
        } catch (error) {
            console.error("JWT Validation error: ", error)
            throw new Error(error);
        }
    },

    authorizationCheck: async (req) => {
        try {
            let token = req.cookies.schedAroo_jwt;

            let decoded  = await jwt.decode(token);
            let group = await groups.findOne({
                where: {
                    id: req.params.groupId,
                    ownerId: decoded.userId
                }
            })
            
            if(!group){
                return "Unauthorized"
            } else {
                return "Authorized"
            }
        } catch (error) {
            console.error("Authorization error: ", error)
            throw new Error(error);
        }
    },

    findUserInfo: async (userId) => {
        try {
            let userInfo = await users.findOne({
                include: [
                    {
                        model: groups,
                        as: 'groupAdmins',
                        attributes: ['id', 'name']
                    },{
                        model: groups,
                        as: 'userGroups',
                        attributes: ['id', 'name']
                    }
                ],
                attributes: {
                    exclude: ['password']
                }
            });

            console.log("USER INFO: ", userInfo);
            return userInfo;
        } catch (error) {
            console.log("findUserInfo error: ", error);
            throw new Error("findUserInfo error: ", error);
        }
    }
}