const models = require('../models');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');



function addAssetGroup(req, res){

    const assets = {
        userId: req.body.user_id,
        name: req.body.data.name,
        driver: req.body.data.driver,
        driverPhone: req.body.data.driverPhone,
        driverEmail: req.body.data.driverEmail,
        powerUnit: req.body.data.powerUnit,
        powerUnitModel: req.body.data.powerUnitModel,
        powerUnitLicensePlate: req.body.data.powerUnitLicensePlate,
        trailer: req.body.data.trailer,
        trailerModel: req.body.data.trailerModel,
        trailerType: req.body.data.trailerType,
    

    }

    models.assets.create(assets).then(result => {
        res.status(200).json({
            message: 'Assets Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

async function getAssets(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        await db.sequelize.query("SELECT assets.id, assets.name, powerUnits.model, trailers.trailerNumber FROM tower_stationdb.assets Join tower_stationdb.powerUnits on powerUnits.id = assets.powerUnit Join tower_stationdb.trailers on trailers.id = assets.trailer", { type: QueryTypes.SELECT }).then(result=>{
            // console.log(result);
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })

        
    }else{
        await db.sequelize.query("SELECT assets.id, assets.name, powerUnits.model, trailers.trailerNumber FROM tower_stationdb.assets Join tower_stationdb.powerUnits on powerUnits.id = assets.powerUnit Join tower_stationdb.trailers on trailers.id = assets.trailer where assets.userId = :userId", { replacements: { userId: userId }, type: QueryTypes.SELECT }).then(result=>{
            // console.log(result);
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })

    }

}

function getAssetById(req, res){
    const id = req.params.id;
    models.assets.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function updateAssets(req, res){
    const id = req.body.id;
    const updatadAssets = {
        userId: req.body.user_id,
        name: req.body.data.name,
        drivers: driver,
        powerUnit: req.body.data.powerUnit,
        powerUnitModel: req.body.data.powerUnitModel,
        powerUnitLicensePlate: req.body.data.powerUnitLicensePlate,
        trailer: req.body.data.trailer,
        trailerModel: req.body.data.trailerModel,
        trailerType: req.body.data.trailerType,
    

    }



    models.customers.update(updatadAssets, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Assets Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}

function deleteAssets(req, res){
    const id = req.params.id;
    models.assets.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Assets Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addAssetGroup: addAssetGroup,
    getAssets: getAssets,
    getAssetById: getAssetById,
    updateAssets: updateAssets,
    deleteAssets: deleteAssets
};

