const models = require('../models');


function addCustomerShipper(req, res){

    const shipper = {
        userId: req.body.user_id,
        companyName: req.body.data.companyName,
        city: req.body.data.city,
        state: req.body.data.state,
        address: req.body.data.address,
        cellPhone: req.body.data.cellPhone,
        entityType: req.body.data.entityType

    }

    models.shipper.create(shipper).then(result => {
        res.status(200).json({
            message: 'Shipper Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function getCustomerShipper(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.shipper.findAll({ order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })
    }else{
        models.shipper.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })

    }
}


function getCustomerShipperById(req, res){
    const id = req.params.id;
    models.shipper.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addCustomerShipper: addCustomerShipper,
    getCustomerShipper: getCustomerShipper,
    getCustomerShipperById: getCustomerShipperById
};
