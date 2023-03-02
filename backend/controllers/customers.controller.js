const models = require('../models');

function addCustomer(req, res){

    const customers = {
        userId: req.body.u_id,
        firstName: req.body.data.firstName,
        middleName: req.body.data.middleName,
        lastName: req.body.data.lastName,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        zipCode: req.body.data.zipCode,
        state: req.body.data.state,
        city: req.body.data.city,
        telephone: req.body.data.telephone,
        cellPhone: req.body.data.cellPhone,
        fax: req.body.data.fax,
        email: req.body.data.email,
        privateNotes: req.body.data.privateNotes,
        creditLimit: req.body.data.creditLimit,
        isCreditHold: req.body.data.isCreditHold,
        availableCredit: req.body.data.availableCredit,
        paymentTerms: req.body.data.paymentTerms,
        mcNumberType: req.body.data.mcNumberType,
        mcNumber: req.body.data.mcNumber,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit

    }

    models.customers.create(customers).then(result => {
        res.status(200).json({
            message: 'Customer Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}


function getCustomer(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.customers.findAll({ order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })
    }else{
        models.customers.findAll({where:{userId:userId }, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })
    }
    
}

function getCustomerById(req, res){
    const id = req.params.id;
    models.customers.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateCustomer(req, res){
    const id = req.body.id;
    const updatedCustomers = {
        firstName: req.body.data.firstName,
        middleName: req.body.data.middleName,
        lastName: req.body.data.lastName,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        zipCode: req.body.data.zipCode,
        state: req.body.data.state,
        city: req.body.data.city,
        telephone: req.body.data.telephone,
        cellPhone: req.body.data.cellPhone,
        fax: req.body.data.fax,
        email: req.body.data.email,
        privateNotes: req.body.data.privateNotes,
        creditLimit: req.body.data.creditLimit,
        isCreditHold: req.body.data.isCreditHold,
        availableCredit: req.body.data.availableCredit,
        paymentTerms: req.body.data.paymentTerms,
        mcNumberType: req.body.data.mcNumberType,
        mcNumber: req.body.data.mcNumber,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit

    }



    models.customers.update(updatedCustomers, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Customer Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}

function deleteCustomer(req, res){
    const id = req.params.id;
    models.customers.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Customer Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addCustomer: addCustomer,
    getCustomer:getCustomer,
    getCustomerById: getCustomerById,
    updateCustomer:updateCustomer,
    deleteCustomer: deleteCustomer,
};
