const models = require('../models');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');

function addDriver(req, res){


    console.log(req.body);
    const drivers = {
        
        userId: req.body.user_id,
        firstName: req.body.data.firstName,
        middleName: req.body.data.middleName,
        lastName: req.body.data.lastName,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        city: req.body.data.city,
        state: req.body.data.state,
        zipCode: req.body.data.zipCode,
        cellPhone: req.body.data.cellPhone,
        email: req.body.data.email,
        driverType: req.body.data.driverType,
        status: req.body.data.status,
        dateOfBirth: req.body.data.dateOfBirth,
        driverNumber: req.body.data.driverNumber,
        ownershipType: req.body.data.ownershipType,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit,
        notes: req.body.data.notes,
        commercialDriverSinceYear: req.body.data.commercialDriverSinceYear,
        experienceType: req.body.data.experienceType,
        drivingSchool: req.body.data.drivingSchool,
        CDLNumber: req.body.data.CDLNumber,
        licenseType: req.body.data.licenseType,
        licenseEndorsements: req.body.data.licenseEndorsements,
        applicationDate: req.body.data.applicationDate,
        hireDate: req.body.data.hireDate,
        terminationDate: req.body.data.terminationDate,
        canHireAgain: req.body.data.canHireAgain,
        bonusEligibilityDate: req.body.data.bonusEligibilityDate,
        employmentNotes: req.body.data.employmentNotes,
        insuranceCompany: req.body.data.insuranceCompany,
        groupNumber: req.body.data.groupNumber,
        idNumber: req.body.data.idNumber,
        licenseExpirationDate: req.body.data.licenseExpirationDate,
        TWICCardExpirationDate: req.body.data.TWICCardExpirationDate,
        hazmatEndorsementExpirationDate: req.body.data.hazmatEndorsementExpirationDate,
        DOTMedicalCardExpirationDate: req.body.data.DOTMedicalCardExpirationDate,
        insuranceExpirationDate: req.body.data.insuranceExpirationDate,
        lastRoadTestDate: req.body.data.lastRoadTestDate,
        lastDrugTestDate: req.body.data.lastDrugTestDate,
        lastAlcoholTestDate: req.body.data.lastAlcoholTestDate,
        
    }

    models.drivers.create(drivers).then(result => {    
        res.status(200).json({
            message: 'Driver Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function getDrivers(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.drivers.findAll({order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.drivers.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }

}

function getDriverByName(req, res){
    const driverName = req.params.driver;
    var string = str.split(" ");
    console.log(string);
    // models.drivers.findAll({where:{userId:userId}}).then(result=>{
    //     return res.status(200).json(result);
        
    // }).catch(error=>{
    //     res.status(500).json({error: error});

    // })
}

function getDriverById(req, res){
    const id = req.params.id;
    models.drivers.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateDriver(req, res){
    const id = req.body.id;
    console.log(req.body);

    const updatedDrivers = {
        userId: req.body.user_id,
        firstName: req.body.data.firstName,
        middleName: req.body.data.middleName,
        lastName: req.body.data.lastName,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        city: req.body.data.city,
        state: req.body.data.state,
        zipCode: req.body.data.zipCode,
        cellPhone: req.body.data.cellPhone,
        email: req.body.data.email,
        driverType: req.body.data.driverType,
        status: req.body.data.status,
        dateOfBirth: req.body.data.dateOfBirth,
        driverNumber: req.body.data.driverNumber,
        ownershipType: req.body.data.ownershipType,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit,
        notes: req.body.data.notes,
        commercialDriverSinceYear: req.body.data.commercialDriverSinceYear,
        experienceType: req.body.data.experienceType,
        drivingSchool: req.body.data.drivingSchool,
        CDLNumber: req.body.data.CDLNumber,
        licenseType: req.body.data.licenseType,
        licenseEndorsements: req.body.data.licenseEndorsements,
        applicationDate: req.body.data.applicationDate,
        hireDate: req.body.data.hireDate,
        terminationDate: req.body.data.terminationDate,
        canHireAgain: req.body.data.canHireAgain,
        bonusEligibilityDate: req.body.data.bonusEligibilityDate,
        employmentNotes: req.body.data.employmentNotes,
        insuranceCompany: req.body.data.insuranceCompany,
        groupNumber: req.body.data.groupNumber,
        idNumber: req.body.data.idNumber,
        licenseExpirationDate: req.body.data.licenseExpirationDate,
        TWICCardExpirationDate: req.body.data.TWICCardExpirationDate,
        hazmatEndorsementExpirationDate: req.body.data.hazmatEndorsementExpirationDate,
        DOTMedicalCardExpirationDate: req.body.data.DOTMedicalCardExpirationDate,
        insuranceExpirationDate: req.body.data.insuranceExpirationDate,
        lastRoadTestDate: req.body.data.lastRoadTestDate,
        lastDrugTestDate: req.body.data.lastDrugTestDate,
        lastAlcoholTestDate: req.body.data.lastAlcoholTestDate,
        
    }



    models.drivers.update(updatedDrivers, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Driver Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}

function deleteDriver(req, res){
    const id = req.params.id;
    models.drivers.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Driver Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function addPayItems(req, res){
    const payItems = {
        userId: req.body.userId,
        rateBasis:req.body.data.rateBasis,
        description:req.body.data.description,
        drivers:req.body.data.drivers,
        adjustment:req.body.data.adjustment,
        rate:req.body.data.rate,
        notes:req.body.data.notes,
        dateRange:req.body.data.dateRange,
        isAutoAddToLoad:req.body.data.isAutoAddToLoad,

    }

    models.driverPayItems.create(payItems).then(result => {
        res.status(200).json({
            message: 'Driver Pay Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

    // function getDriverPayItems(req, res){
    //     const userId = req.params.id;
    //     models.driverPayItems.findAll({where:{userId:userId}}).then(result=>{
    //         return res.status(200).json(result);
            
    //     }).catch(error=>{
    //         res.status(500).json({error: error});

    //     })
    // }


async function getDriverPayItems(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        await db.sequelize.query("SELECT driverPayItems.*, drivers.firstName, drivers.lastName FROM `driverPayItems` Join drivers on drivers.id = driverPayItems.drivers", {type: QueryTypes.SELECT }).then(result=>{
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })
    }else{
        await db.sequelize.query("SELECT driverPayItems.*, drivers.firstName, drivers.lastName FROM `driverPayItems` Join drivers on drivers.id = driverPayItems.drivers where driverPayItems.userId = :userId", { replacements: { userId: userId }, type: QueryTypes.SELECT }).then(result=>{
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })
    }

}

async function getPayItemById(req, res){
    const id = req.params.id;

    models.driverPayItems.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updatePayItem(req, res){
    const id = req.body.id;
    const updatedPayItems = {
        userId: req.body.userId,
        rateBasis:req.body.data.rateBasis,
        description:req.body.data.description,
        drivers:req.body.data.drivers,
        adjustment:req.body.data.adjustment,
        rate:req.body.data.rate,
        notes:req.body.data.notes,
        dateRange:req.body.data.dateRange,
        isAutoAddToLoad:req.body.data.isAutoAddToLoad,

    }


    models.driverPayItems.update(updatedPayItems, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Pay Items Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deletePayItem(req, res){
    const id = req.params.id;
    models.driverPayItems.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Pay Item Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}




function addViolation(req, res){
    const violation = {
        userId: req.body.userId,
        driverId: req.body.data.drivers,
        violationType: req.body.data.violationType,
        date:req.body.data.date,
        violationDescription:req.body.data.violationDescription,
        authority:req.body.data.authority,
        location:req.body.data.location,
        fineAmount:req.body.data.fineAmount,
        notes:req.body.data.notes,

    }

    models.driverViolation.create(violation).then(result => {
        res.status(200).json({
            message: 'Violation Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}


function getViolations(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.driverViolation.findAll({order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.driverViolation.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}


function getViolationById(req, res){
    const id = req.params.id;
    models.driverViolation.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function updateViolation(req, res){
    const id = req.body.id;
    const updatedViolation = {
        userId: req.body.userId,
        driverId: req.body.data.drivers,
        violationType: req.body.data.violationType,
        date:req.body.data.date,
        violationDescription:req.body.data.violationDescription,
        authority:req.body.data.authority,
        location:req.body.data.location,
        fineAmount:req.body.data.fineAmount,
        notes:req.body.data.notes,

    }


    models.driverViolation.update(updatedViolation, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Violation Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deleteViolation(req, res){
    const id = req.params.id;
    models.driverViolation.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Violation Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function addDeduction(req, res){
    const deduction = {
        userId: req.body.userId,
        rateBasis:req.body.data.rateBasis,
        description: req.body.data.description,
        drivers: req.body.data.drivers, 
        adjustment: req.body.data.adjustment, 
        rate: req.body.data.rate, 
        notes: req.body.data.notes, 
        dateRange: req.body.data.dateRange, 
        isAutoAddToLoad: req.body.data.isAutoAddToLoad,

    }

    models.driverDeductions.create(deduction).then(result => {
        res.status(200).json({
            message: 'Driver Deduction Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

async function getDriverDeductions(req, res){

    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        await db.sequelize.query("SELECT driverDeductions.*, drivers.firstName, drivers.lastName FROM `driverDeductions` Join drivers on drivers.id = driverDeductions.drivers", { type: QueryTypes.SELECT }).then(result=>{
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })
    }else{
        await db.sequelize.query("SELECT driverDeductions.*, drivers.firstName, drivers.lastName FROM `driverDeductions` Join drivers on drivers.id = driverDeductions.drivers where driverDeductions.userId = :userId", { replacements: { userId: userId }, type: QueryTypes.SELECT }).then(result=>{
            return res.status(200).json(result);
                
            }).catch(error=>{
                res.status(500).json({error: error});
        
            })

    }

}

function getDeductionById(req, res){
    const id = req.params.id;
    models.driverDeductions.findByPk(id).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function updateDeduction(req, res){
    const id = req.body.id;

    const updatedDeduction = {
        userId: req.body.userId,
        rateBasis:req.body.data.rateBasis,
        description: req.body.data.description,
        drivers: req.body.data.drivers, 
        adjustment: req.body.data.adjustment, 
        rate: req.body.data.rate, 
        notes: req.body.data.notes, 
        dateRange: req.body.data.dateRange, 
        isAutoAddToLoad: req.body.data.isAutoAddToLoad,

    }

    models.driverDeductions.update(updatedDeduction, {where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Driver Deduction Updated successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deleteDeduction(req, res){
    const id = req.params.id;
    models.driverDeductions.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Deduction Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addDriver: addDriver,
    getDrivers:getDrivers,
    getDriverById: getDriverById,
    updateDriver: updateDriver,
    deleteDriver: deleteDriver,
    addPayItems: addPayItems,
    getDriverPayItems: getDriverPayItems,
    getPayItemById: getPayItemById,
    updatePayItem:updatePayItem,
    deletePayItem:deletePayItem,
    addViolation: addViolation,
    getViolations: getViolations,
    getViolationById: getViolationById,
    updateViolation: updateViolation,
    deleteViolation: deleteViolation,
    addDeduction: addDeduction,
    getDriverDeductions:getDriverDeductions,
    getDeductionById:getDeductionById,
    updateDeduction:updateDeduction,
    deleteDeduction: deleteDeduction
};
