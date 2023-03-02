const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
var Sequelize = require('sequelize');
var sequelize = require('../config/config.json'); //sequelize instance
var db  = require('../models/index');
const nodemailer = require("nodemailer");



function addPermission(req, res){

    const permissions = {
        name: req.body.name,
    }

    models.permissions.create(permissions).then(result => {
        res.status(200).json({
            message: 'Permission Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function getPermissions(req, res){
    models.permissions.findAll().then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updatePermission(req, res){
    const id = req.body.id;

    models.permissions.update({name: req.body.name}, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Permission Updated Successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deletePermission(req, res){
    const id = req.params.id;
    models.permissions.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Permission Deleted Successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function getPrivileges(req, res){

    models.privileges.findAll().then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function addUser(req, res){

    
    models.users.findOne({where:{email:req.body.data.email}}).then(result=>{
        if(result){
            return res.json({message : 'User already exists'});
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.data.password, salt, function(err, hash){
                    const user = {
                        // userId: req.body.userId,
                        fullName: req.body.data.fullName,
                        email: req.body.data.email,
                        password: hash,
                        userRole: req.body.data.userRole,
                        // companyId: req.body.companyId
                        
                
                    }
                
                    models.users.create(user).then(result => {
                        res.status(200).json({
                            message: 'User Added successfully'
                        });
                        onSendEmail(req.body.data.email, req.body.data.password);
                    }).catch(error=>{
                        res.status(500).json({error: error});
                    });
                });
            })
        }
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

async function getUsers(req, res){
    const userRole = req.params.id;
    if(userRole == 1){
        await db.sequelize.query("SELECT users.*, roles.roleName FROM `users` Join roles on roles.id = users.userRole ORDER BY users.id DESC;", {type: QueryTypes.SELECT }).then(result=>{
                return res.status(200).json(result);
                
            }).catch(error=>{
                console.log(error);
                res.status(500).json({error: error});
        
            })
    }else{
        res.status(200).json({message: 'Only admin access'});

    }

}

function getUserById(req, res){
    const id = req.params.id;
    models.users.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateUser(req, res){
    const id = req.body.id;

    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.data.password, salt, function(err, hash){
            const user = {
                userId: req.body.userId,
                fullName: req.body.data.fullName,
                email: req.body.data.email,
                password: hash,
                userRole: req.body.data.userRole
        
            }
        
            models.users.update(user, {where:{id:id}}).then(result=>{
                res.status(200).json({
                    message: 'User Updated Successfully'
                });
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })
        });
    })

    
}

function deleteUser(req, res){
    const id = req.params.id;
    models.users.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'User Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function onSendEmail(email, password){

    var transporter = nodemailer.createTransport({
        // service: 'gmail',
        // service: "Outlook365",   
        // host: "smtp.office365.com",
        host: "exchange.darkarmystudios.com",
        // port: 465,
        port: 587,
        secure: false, 
        auth: {
            user: "no-reply@darkarmystudios.com", 
            pass: "Dark*321*", 
        },
      });
      
      var mailOptions = {
        from: 'no-reply@darkarmystudios.com',
        to: email,
        subject: 'Login credentials',
        text: "Email:   " + email + "\n" + "Password:   " + password
      };

      transporter.verify(function(error, success) {
        if (error) {
              console.log(error);
        } else {
              console.log('Server is ready to take our messages');
        }
      });
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        //   console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

async function checkRole(req, res){
    const roleId = req.params.id;
    await db.sequelize.query("Select * from rolesPermissions Join permissions on rolesPermissions.permissionId = permissions.id  where rolesPermissions.roleId = :roleId;", { replacements: { roleId: roleId },type: QueryTypes.SELECT }).then(result=>{
        // await db.sequelize.query("Select * from :result Join privileges on privileges.id =  :result.privilegeId" , { replacements: { result: result },type: QueryTypes.SELECT }).then(result=>{
            
        // })      

       

        return res.status(200).json(result);
            
        }).catch(error=>{
            console.log(error);
            res.status(500).json({error: error});
    
        })

}


module.exports = {
    addPermission: addPermission,
    getPermissions:getPermissions,
    updatePermission: updatePermission,
    deletePermission:deletePermission,
    getPrivileges: getPrivileges,
    addUser: addUser,
    getUsers: getUsers,
    getUserById:getUserById,
    updateUser:updateUser,
    deleteUser:deleteUser,
    checkRole:checkRole
};
