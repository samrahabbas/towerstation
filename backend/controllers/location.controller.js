const models = require('../models');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');

function addLocation(req, res){

    contacts = req.body.data.locationContacts;
    const location = {
        userId: req.body.userId,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        zipCode: req.body.data.zipCode,
        state: req.body.data.state,
        city: req.body.data.city,
        telephone: req.body.data.telephone,
        privateNotes: req.body.data.privateNotes,
        locationTypes: req.body.data.locationTypes,
        locationCodes: req.body.data.locationCodes,


    }

    models.locations.create(location).then(result => {

            contacts.forEach(function(contact){
            
                const locationContacts ={
                    locationId:result.id,
                    contactName: contact.name,
                    telephone: contact.telephone,
                    email: contact.email,
                    fax: contact.fax
                }

                
                models.locationContacts.create(locationContacts).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            })
        

            res.status(200).json({
            message: 'Location Added successfully'
        });
    }).catch(error=>{
        console.log(error);
        res.status(500).json({error: error});
    });


}

function getLocation(req, res){
    const userId = req.params.id;  
    const userRole = req.params.role;
    if(userRole == 1){
        models.locations.findAll({ order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }else{
        models.locations.findAll({where:{userId:userId}, order: [
            ["id", "DESC"],
          ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    }
}



function updateLocation(req, res){
    const id = req.body.id;    
    contacts = req.body.data.locationContacts;
    const updatedLocation = {
        userId: req.body.userId,
        street1: req.body.data.street1,
        street2: req.body.data.street2,
        zipCode: req.body.data.zipCode,
        state: req.body.data.state,
        city: req.body.data.city,
        telephone: req.body.data.telephone,
        privateNotes: req.body.data.privateNotes,
        locationTypes: req.body.data.locationTypes,
        locationCodes: req.body.data.locationCodes,


    }

    models.locations.update(updatedLocation, {where:{id:id}}).then(result => {

            contacts.forEach(function(contact){
            
                const updatedLocationContacts ={
                    locationId:result.id,
                    contactName: contact.name,
                    telephone: contact.telephone,
                    email: contact.email,
                    fax: contact.fax
                }

                
                models.locationContacts.update(updatedLocationContacts, {where:{lcoationId:id}}).then(result => {
                    // res.status(200).json({
                    //     message: 'Carrier Added successfully'
                    // });
                    }).catch(error=>{
                        console.log(error);
                        res.status(500).json({error: error});
                    });
                    

            })
        

            res.status(200).json({
            message: 'Location Updated successfully'
        });
    }).catch(error=>{
        console.log(error);
        res.status(500).json({error: error});
    });
   

}



async function getLocationById(req, res){
    const id = req.params.id;
    
    const query = "Select * from locations Join locationContacts on locationContacts.locationId = locations.id where locations.id = :id"
    await db.sequelize.query(query, { replacements: { id: id}, type: QueryTypes.SELECT }).then(result=>{
        return res.status(200).json(result[0]);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })
    
}

function deleteLocation(req, res){
    const id = req.params.id;
    models.locations.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Location Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


module.exports = {
    addLocation: addLocation,
    getLocation: getLocation,
    getLocationById: getLocationById,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
};
