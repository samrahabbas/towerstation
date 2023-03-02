const models = require('../models');


function addTrailers(req, res){


    const trailers = {
        userId: req.body.user_id,
        model: req.body.data.model,
        trailerNumber: req.body.data.trailerNumber,
        trailerType: req.body.data.trailerType,
        generatorInfo: req.body.data.generatorInfo,
        licensePlate: req.body.data.licensePlate,
        modelYear: req.body.data.modelYear,
        vehicleIdNumber: req.body.data.vehicleIdNumber,
        status: req.body.data.status,
        insuranceInformation: req.body.data.insuranceInformation,
        length: req.body.data.length,
        width: req.body.data.width,
        trailerNumber: req.body.data.trailerNumber,
        height: req.body.data.height,
        numberOfAxles: req.body.data.numberOfAxles,
        unloadedVehicleWeight: req.body.data.unloadedVehicleWeight,
        grossVehicleWeight: req.body.data.grossVehicleWeight,
        notes: req.body.data.notes,
        ownership: req.body.data.ownership,
        isPurchased: req.body.data.isPurchased,
        purchasedFrom: req.body.data.purchasedFrom,
        soldTo: req.body.data.soldTo,
        purchasedDate: req.body.data.purchasedDate,
        soldDate: req.body.data.soldDate,
        purchasedPrice: req.body.data.purchasedPrice,
        soldPrice: req.body.data.soldPrice,
        factoryPrice: req.body.data.factoryPrice,
        currentValue: req.body.data.currentValue,
        licensePlateExpiration: req.body.data.licensePlateExpiration,
        DOTExpiration: req.body.data.DOTExpiration,
        insuranceExpiration: req.body.data.insuranceExpiration,
        lastServiceDate: req.body.data.lastServiceDate,
        inspectionExpiration: req.body.data.inspectionExpiration,
        registrationExpiration: req.body.data.registrationExpiration,
        estimatedOdometerReading: req.body.data.estimatedOdometerReading,
        lastServiceMileage: req.body.data.lastServiceMileage,

    }

    models.trailers.create(trailers).then(result => {
        res.status(200).json({
            message: 'Trailers Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });
}

function getTrailers(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.trailers.findAll({ order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.trailers.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}

function getTrailerById(req, res){
    const id = req.params.id;
    models.trailers.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateTrailer(req, res){
    const id = req.body.id;

    const updatedTrailer = {
        userId: req.body.user_id,
        model: req.body.data.model,
        trailerNumber: req.body.data.trailerNumber,
        trailerType: req.body.data.trailerType,
        generatorInfo: req.body.data.generatorInfo,
        licensePlate: req.body.data.licensePlate,
        modelYear: req.body.data.modelYear,
        vehicleIdNumber: req.body.data.vehicleIdNumber,
        status: req.body.data.status,
        insuranceInformation: req.body.data.insuranceInformation,
        length: req.body.data.length,
        width: req.body.data.width,
        trailerNumber: req.body.data.trailerNumber,
        height: req.body.data.height,
        numberOfAxles: req.body.data.numberOfAxles,
        unloadedVehicleWeight: req.body.data.unloadedVehicleWeight,
        grossVehicleWeight: req.body.data.grossVehicleWeight,
        notes: req.body.data.notes,
        ownership: req.body.data.ownership,
        isPurchased: req.body.data.isPurchased,
        purchasedFrom: req.body.data.purchasedFrom,
        soldTo: req.body.data.soldTo,
        purchasedDate: req.body.data.purchasedDate,
        soldDate: req.body.data.soldDate,
        purchasedPrice: req.body.data.purchasedPrice,
        soldPrice: req.body.data.soldPrice,
        factoryPrice: req.body.data.factoryPrice,
        currentValue: req.body.data.currentValue,
        licensePlateExpiration: req.body.data.licensePlateExpiration,
        DOTExpiration: req.body.data.DOTExpiration,
        insuranceExpiration: req.body.data.insuranceExpiration,
        lastServiceDate: req.body.data.lastServiceDate,
        inspectionExpiration: req.body.data.inspectionExpiration,
        registrationExpiration: req.body.data.registrationExpiration,
        estimatedOdometerReading: req.body.data.estimatedOdometerReading,
        lastServiceMileage: req.body.data.lastServiceMileage,
    }




    models.trailers.update(updatedTrailer, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Trailer Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deleteTrailer(req, res){
    const id = req.params.id;
    models.trailers.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Trailer Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function addTrailerLog(req, res){


    const trailersLog = {
        userId: req.body.userId,
        mileage: req.body.data.mileage,
        date:req.body.data.date,
        maintenanceType:req.body.data.maintenanceType,
        maintenancePerformed:req.body.data.maintenancePerformed,
        performedBy:req.body.data.performedBy,
        location:req.body.data.location,
        billTo:req.body.data.billTo,
        amount:req.body.data.amount,

    }

    models.trailersLog.create(trailersLog).then(result => {
        res.status(200).json({
            message: 'Maintenance Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });
}

function getTrailersLog(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.trailersLog.findAll({ order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.trailersLog.findAll({where:{userId:userId},  order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}

function getTrailerLogById(req, res){
    const id = req.params.id;
    models.trailersLog.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateTrailerLog (req, res){
    const id = req.body.id;


    const updatedtrailersLog = {
        userId: req.body.userId,
        mileage: req.body.data.mileage,
        date:req.body.data.date,
        maintenanceType:req.body.data.maintenanceType,
        maintenancePerformed:req.body.data.maintenancePerformed,
        performedBy:req.body.data.performedBy,
        location:req.body.data.location,
        billTo:req.body.data.billTo,
        amount:req.body.data.amount,

    }

    models.trailersLog.update(updatedtrailersLog, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Maintenance Log Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}

function deleteTrailerLog(req, res){
    const id = req.params.id;
    models.trailersLog.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Maintenance Log Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}




module.exports = {
    addTrailers: addTrailers,
    getTrailers: getTrailers,
    getTrailerById: getTrailerById,
    updateTrailer: updateTrailer,
    deleteTrailer: deleteTrailer,
    addTrailerLog: addTrailerLog,
    getTrailersLog: getTrailersLog,
    getTrailerLogById: getTrailerLogById,
    updateTrailerLog:updateTrailerLog,
    deleteTrailerLog:deleteTrailerLog
};
