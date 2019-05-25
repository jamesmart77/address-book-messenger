const users = require('../ORM/models').users;
const bcrypt = require('bcrypt');
const jwt = require('./jwt');
const helpers = require('./helpers');
const Op = require('sequelize').Op;

module.exports = {
  async create(req, res) {
    try {
        let user = await users.create(req.body);

        delete user.dataValues.password;
        
        const token = await jwt.sign(user.phone, user.id);

        //store the JWT in the client's browser
        res.cookie('schedAroo_jwt', token);
        res.status(201).send(user);
    }
    catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send(error)
    };
  },

  async loadData(req, res) {
    try {
        let decoded = await jwt.decode(req.cookies.schedAroo_jwt);
        let currentUser = await helpers.findUserInfo(decoded.userId);

        res.status(201).send(currentUser);
    }
    catch (error) {
        console.error("LOAD Data ERROR: ", error);
        res.status(401).send(error)
    };
  },

  async loadAllUsers(req, res) {
    try {
        let decoded = await jwt.decode(req.cookies.schedAroo_jwt);
        let allUsers = await users.findAll({
            where: { 
                phone: {
                    [Op.ne]: decoded.phone 
                }
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
        res.status(201).send(allUsers);
    }
    catch (error) {
        console.error("LOAD All Users ERROR: ", error);
        if(error.message.includes("invalid")){
            res.status(401).send(error)
        } else {
            res.status(500).send(error)
        }
    };
  },

  async userLogin(req, res) {
    try {
        console.log("USERS: ", req.body)
        const retrievedUser = await users.findOne({
            where: {phone: req.body.phone}
        })

        if(bcrypt.compareSync(req.body.password, retrievedUser.password) ||
            retrievedUser === null){

            const token = await jwt.sign(retrievedUser.phone, retrievedUser.id);

            const userInfo = await helpers.findUserInfo(retrievedUser.id);
            
            res.cookie('schedAroo_jwt', token);
            res.status(200).send(userInfo);            
        }
        else{
            res.status(401).send({
                message: "Login credentials invalid"}); 
        }
    }
    catch (error) {
        console.error("Error at user login. Error: ", error)
        res.status(401).send({
            message: "Login credentials invalid"});
    };
  },

  async isPhoneAvailable(req, res) {
    try {
        console.log("BODY: ", req.body.phone)
        const retrievedUser = await users.findOne({
            where: {phone: req.body.phone}
        })

        if(retrievedUser === null){
            res.status(200).send({});            
        }
        else{
            res.status(401).send({message: "Phone number is unavailable"}); 
        }
    }
    catch (error) {
        console.error("Error at user isPhoneAvailable. Error: ", error)
        res.status(500).send(error)
    };
  },
};