const models = require('../models');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');


function addCarrier(req, res){
    let response = [];

    console.log(req.body.factoringAddress);
    contacts = req.body.data.carrierContacts;
    const carrier = {
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
        checksPayableTo: req.body.data.checksPayableTo,
        isOKToLoad: req.body.data.isOKToLoad,
        privateNotes: req.body.data.privateNotes,
        MCFFMXNumber: req.body.data.MCFFMXNumber,
        USDOTNumber: req.body.data.USDOTNumber,
        taxIDNumber: req.body.data.taxIDNumber,
        is1099Vendor: req.body.data.is1099Vendor,
        paymentTerms: req.body.data.paymentTerms,
        paymentMethod: req.body.data.paymentMethod,
        primaryInsuranceDetails: req.body.data.primaryInsuranceDetails,
        primaryInsuranceExpirationDate: req.body.data.primaryInsuranceExpirationDate,
        cargoInsuranceDetails: req.body.data.cargoInsuranceDetails,
        cargoInsuranceExpirationDate: req.body.data.cargoInsuranceExpirationDate,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit,


    }

    models.carrier.create(carrier).then(result => {

            contacts.forEach(function(contact){
            
                const carrierContacts ={
                    carrierId:result.id,
                    contactName: contact.name,
                    telephone: contact.telephone,
                    email: contact.email,
                    fax: contact.fax
                }

                
                models.carrierContact.create(carrierContacts).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            })
        
            if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone == null){
                console.log('not fill');

            }else if(req.body.data.factoringAddress.telephone != null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone == null){
                console.log('factory');
                const carrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.create(carrierAddress).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone != null && req.body.data.mailingAddress.telephone == null){
                console.log('remit');
                const carrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.create(carrierAddress).then(result => {
                    res.status(200).json({
                        message: 'Carrier Added successfully'
                    });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone != null){
                console.log('mailing');
                const carrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.create(carrierAddress).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else{
                const carrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.create(carrierAddress).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    
          
            }
            res.status(200).json({
            message: 'Carrier Added successfully'
        });
    }).catch(error=>{
        console.log(error);
        res.status(500).json({error: error});
    });


}

function getCarrier(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.carrier.findAll({ order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.carrier.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}


async function getCarrierById(req, res){
    var response = [];
    var data = {}
    const id = req.params.id;
    // const query = "Select * from carriers Join carrierContacts on carrierContacts.carrierId = carriers.id Join (Select * from carrierAddresses) as address on address.carrierId = carriers.id where carriers.id = :id"
    // await db.sequelize.query(query, { replacements: { id: id}, type: QueryTypes.SELECT }).then(result=>{
    //     return res.status(200).json(result);
            
    //     }).catch(error=>{
    //         res.status(500).json({error: error});
    
    //     })
        
    models.carrier.findByPk(id).then(result=>{
        data["result"] = result;
        models.carrierContact.findAll({where:{carrierId:id}}).then(result=>{
            data["contact"] = result
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })

        models.carrierAddress.findAll({where:{carrierId:id}}).then(result=>{
            data["address"] = result
            response.push(data);
            return res.status(200).json(response);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function updateCarrier(req, res){
    const id = req.body.id;
    contacts = req.body.data.carrierContacts;
    console.log(req.body);
    const updatedCarrier = {
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
        checksPayableTo: req.body.data.checksPayableTo,
        isOKToLoad: req.body.data.isOKToLoad,
        privateNotes: req.body.data.privateNotes,
        MCFFMXNumber: req.body.data.MCFFMXNumber,
        USDOTNumber: req.body.data.USDOTNumber,
        taxIDNumber: req.body.data.taxIDNumber,
        is1099Vendor: req.body.data.is1099Vendor,
        paymentTerms: req.body.data.paymentTerms,
        paymentMethod: req.body.data.paymentMethod,
        primaryInsuranceDetails: req.body.data.primaryInsuranceDetails,
        primaryInsuranceExpirationDate: req.body.data.primaryInsuranceExpirationDate,
        cargoInsuranceDetails: req.body.data.cargoInsuranceDetails,
        cargoInsuranceExpirationDate: req.body.data.cargoInsuranceExpirationDate,
        weightUnit: req.body.data.weightUnit,
        distanceUnit: req.body.data.distanceUnit,
        temperatureUnit: req.body.data.temperatureUnit,


    }

    models.carrier.update(updatedCarrier, {where:{id:id}}).then(result => {

            contacts.forEach(function(contact){
            
                const updatedCarrierContacts ={
                    carrierId:result.id,
                    contactName: contact.name,
                    telephone: contact.telephone,
                    email: contact.email,
                    fax: contact.fax
                }

                
                models.carrierContact.update(updatedCarrierContacts, {where:{carrierId:id}}).then(result => {
               
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            })
        
            if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone == null){
                console.log('not fill');

            }else if(req.body.data.factoringAddress.telephone != null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone == null){
                console.log('factory');
                const updatedCarrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.update(updatedCarrierAddress, {where:{carrierId:id}}).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone != null && req.body.data.mailingAddress.telephone == null){
                console.log('remit');
                const updatedCarrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.update(updatedCarrierAddress, {where:{carrierId:id}}).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Updated successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else if(req.body.data.factoringAddress.telephone == null && req.body.data.remitAddress.telephone == null && req.body.data.mailingAddress.telephone != null){
                console.log('mailing');
                const updatedCarrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.update(updatedCarrierAddress, {where:{carrierId:id}}).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            }
            else{
                const updatedCarrierAddress = {
                    carrierId: result.id,
                    factoringName: req.body.data.factoringAddress.name,
                    factoringChecksPayableTo: req.body.data.factoringAddress.checksPayableTo,
                    factoringStreet1: req.body.data.factoringAddress.street1,
                    factoringStreet2: req.body.data.factoringAddress.street2,
                    factoringCity: req.body.data.factoringAddress.city,
                    factoringState: req.body.data.factoringAddress.state,
                    factoringZipCode: req.body.data.factoringAddress.zipCode,
                    factoringTelephone: req.body.data.factoringAddress.telephone,
                    remitChecksPayableTo: req.body.data.remitAddress.checksPayableTo,
                    remitStreet1: req.body.data.remitAddress.street1,
                    remitStreet2: req.body.data.remitAddress.street2,
                    remitCity: req.body.data.remitAddress.city,
                    remitState: req.body.data.remitAddress.state,
                    remitZipCode: req.body.data.remitAddress.zipCode,
                    remitTelephone: req.body.data.remitAddress.telephone,
                    mailingStreet1: req.body.data.mailingAddress.street1,
                    mailingStreet2: req.body.data.mailingAddress.street2,
                    mailingCity: req.body.data.mailingAddress.city,
                    mailingState: req.body.data.mailingAddress.state,
                    mailingZipCode: req.body.data.mailingAddress.zipCode,
                    mailingTelephone: req.body.data.mailingAddress.telephone,
                }

                models.carrierAddress.update(updatedCarrierAddress, {where:{carrierId:id}}).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    
          
            }
            res.status(200).json({
            message: 'Carrier Updated successfully'
        });
    }).catch(error=>{
        console.log(error);
        res.status(500).json({error: error});
    });

}

function deleteCarrier(req, res){
    const id = req.params.id;
    models.carrier.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Carrier Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addCarrier: addCarrier,
    getCarrier:getCarrier,
    getCarrierById: getCarrierById,
    updateCarrier:updateCarrier,
    deleteCarrier:deleteCarrier
};
