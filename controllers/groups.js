const db = require('../ORM/models');
const helpers = require('./helpers');

module.exports = {
  async create(req, res) {
    try {
        await helpers.authenticationCheck(req);
        
        const group = await db.groups.create({
            name: req.body.name,
        });

        const currentUser = await db.users.findOne({
            where: {id: req.body.usersId}
        });

        await group.addGroupAdmin(currentUser);

        let userInfo = await helpers.findUserInfo(req.body.usersId)

        res.status(201).send(userInfo);
    }
    catch (error) {
        console.error("Group creation server error: ", error);
        res.status(500).send(error)
    };
  },

  async addUsers(req, res) {
    try {
        await helpers.authenticationCheck(req);
        let response = await helpers.authorizationCheck(req);
        
        if(response === 'Authorized'){
            let newMember = await db.users.findOne({
                where: { email: req.body.email}
            })

            let group = await db.groups.findById(req.params.groupId);
            
            await group.addGroupMember(newMember);
            let user = await helpers.findUserInfo(group.ownerId);
            
            res.status(201).send(user.ownedGroups);
        } else {
            res.status(403).send({ message: response});
        }
    }
    catch (error) {
        console.error("Add New User server error: ", error);
        res.status(500).send(error)
    };
  }
};