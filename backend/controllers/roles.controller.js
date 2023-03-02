const models = require('../models');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');



function addRole(req, res){
    const permissions = req.body.data.permissions

    console.log(req.body);



    const roles = {
        userId: req.body.userId,
        roleName: req.body.data.roleName,
        // companyId: req.body.companyId
    }

    models.roles.create(roles).then(result => {
        for(let i = 0; i < permissions.length; i++){
            const permissionId = permissions[i].moduleId;
            const privilege_arr = permissions[i].privileges;
            for(let i = 0; i < privilege_arr.length; i++){
            const privilegeId = privilege_arr[i].privilegeId;
            if(privilege_arr[i].isSelected){
                    const rolesPermision = {
                        roleId: result.id,
                        permissionId: permissionId,
                        privilegeId: privilegeId
                    }
                    models.rolesPermissions.create(rolesPermision).then(result => {
                        // res.status(200).json({
                        //     message: 'Carrier Added successfully'
                        // });
                        }).catch(error=>{
                            console.log(error);
                            res.status(500).json({error: error});
                        });
                        
            
                }
            }
        }

        res.status(200).json({
            message: 'Role Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function getRoles(req, res){
    const userId = req.params.id;
    models.roles.findAll({where:{userId:userId}, order: [
        ["id", "DESC"],
      ],}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function getUserByRole(req, res){
    const id = req.params.id;
    models.roles.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

async function getUserByRole(req, res){
    const roleId = req.params.id;
    await db.sequelize.query("SELECT users.*, roles.roleName FROM `users` Join roles on roles.id = users.userRole where users.userRole = :roleId", { replacements: { roleId: roleId }, type: QueryTypes.SELECT }).then(result=>{
        return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })

}




module.exports = {
    addRole: addRole,
    getRoles: getRoles,
    getUserByRole: getUserByRole,

};
