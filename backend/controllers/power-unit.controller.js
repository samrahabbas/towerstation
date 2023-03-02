const models = require('../models');


function addPowerUnit(req, res){


    const powerUnit = {
        userId: req.body.user_id,
        model: req.body.data.model,
        powerUnitNumber: req.body.data.powerUnitNumber,
        engineType: req.body.data.engineType,
        transmissionType: req.body.data.transmissionType,
        fuelType: req.body.data.fuelType,
        horsepower: req.body.data.horsepower,
        licensePlate: req.body.data.licensePlate,
        modelYear: req.body.data.modelYear,
        vehicleIdNumber: req.body.data.vehicleIdNumber,
        status: req.body.data.status,
        insuranceInformation: req.body.data.insuranceInformation,
        registeredStates: req.body.data.registeredStates,
        length: req.body.data.length,
        width: req.body.data.width,
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
        inspectionExpiration: req.body.data.inspectionExpiration,
        DOTExpiration: req.body.data.DOTExpiration,
        registrationExpiration: req.body.data.registrationExpiration,
        insuranceExpiration: req.body.data.insuranceExpiration,
        estimatedOdometerReading: req.body.data.estimatedOdometerReading,
        lastOilChangeDate: req.body.data.lastOilChangeDate,
        lastOilChangeMileage: req.body.data.lastOilChangeMileage,
        lastTuneUpDate: req.body.data.lastTuneUpDate,
        lastTuneUpMileage: req.body.data.lastTuneUpMileage,
        lastServiceDate: req.body.data.lastServiceDate,
        lastServiceMileage: req.body.data.lastServiceMileage,
        keepTruckInVehicleId: req.body.data.keepTruckInVehicleId,
    }

    models.powerUnits.create(powerUnit).then(result => {
        res.status(200).json({
            message: 'Power Unit Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });
}


function getPowerUnits(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.powerUnits.findAll({order: [
            ["id", "DESC"],
          ]}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.powerUnits.findAll({where:{userId:userId},order: [
            ["id", "DESC"],
          ]}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}

function getPowerUnitById(req, res){
    const id = req.params.id;
    models.powerUnits.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updatePowerUnit(req, res){
    const id = req.body.id;

    const updatedPowerUnit = {
        userId: req.body.user_id,
        model: req.body.data.model,
        powerUnitNumber: req.body.data.powerUnitNumber,
        engineType: req.body.data.engineType,
        transmissionType: req.body.data.transmissionType,
        fuelType: req.body.data.fuelType,
        horsepower: req.body.data.horsepower,
        licensePlate: req.body.data.licensePlate,
        modelYear: req.body.data.modelYear,
        vehicleIdNumber: req.body.data.vehicleIdNumber,
        status: req.body.data.status,
        insuranceInformation: req.body.data.insuranceInformation,
        registeredStates: req.body.data.registeredStates,
        length: req.body.data.length,
        width: req.body.data.width,
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
        inspectionExpiration: req.body.data.inspectionExpiration,
        DOTExpiration: req.body.data.DOTExpiration,
        registrationExpiration: req.body.data.registrationExpiration,
        insuranceExpiration: req.body.data.insuranceExpiration,
        estimatedOdometerReading: req.body.data.estimatedOdometerReading,
        lastOilChangeDate: req.body.data.lastOilChangeDate,
        lastOilChangeMileage: req.body.data.lastOilChangeMileage,
        lastTuneUpDate: req.body.data.lastTuneUpDate,
        lastTuneUpMileage: req.body.data.lastTuneUpMileage,
        lastServiceDate: req.body.data.lastServiceDate,
        lastServiceMileage: req.body.data.lastServiceMileage,
        keepTruckInVehicleId: req.body.data.keepTruckInVehicleId,
    }




    models.powerUnits.update(updatedPowerUnit, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Power Unit Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deletePowerUnit(req, res){
    const id = req.params.id;
    console.log(id);
    models.powerUnits.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Power Unit Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function addPowerUnitLog(req, res){


    const powerUnitLog = {
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

    models.powerUnitLog.create(powerUnitLog).then(result => {
        res.status(200).json({
            message: 'Maintenance Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });
}

function getPowerUnitLog(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.powerUnitLog.findAll({order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.powerUnitLog.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })

    }
}

function getPowerUnitLogById(req, res){
    const id = req.params.id;
    models.powerUnitLog.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updatePowerUnitLog (req, res){
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

    models.powerUnitLog.update(updatedtrailersLog, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Maintenance Log Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}

function deletePowerUnitLog(req, res){
    const id = req.params.id;
    models.powerUnitLog.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Maintenance Log Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}



module.exports = {
    addPowerUnit: addPowerUnit,
    getPowerUnits: getPowerUnits,
    getPowerUnitById: getPowerUnitById,
    updatePowerUnit: updatePowerUnit,
    deletePowerUnit: deletePowerUnit,
    addPowerUnitLog:addPowerUnitLog,
    getPowerUnitLog: getPowerUnitLog,
    getPowerUnitLogById: getPowerUnitLogById,
    updatePowerUnitLog: updatePowerUnitLog,
    deletePowerUnitLog: deletePowerUnitLog,
};
