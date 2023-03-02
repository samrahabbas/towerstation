const models = require('../models');
var dateTime = require('node-datetime');
const { Op } = require("sequelize");
const multer = require('multer');
const path = require('path');
const base64Img = require('base64-img');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
var db  = require('../models/index');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, "../backend/uploads");
      uploadPath = path.join(__dirname, '../uploads/loadDocuments');
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        console.log(file);
      // cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
      cb(null, file.originalname);
    },
  });

var upload = multer({ storage: storage }).any();


function addLoads(req, res){

    const loads = {
        userId: req.body.u_id,
        origin: req.body.data.origin,
        DHO: req.body.data.DHO,
        DHD: req.body.data.DHD,
        destination: req.body.data.destination,
        company: req.body.data.company,
        contact: req.body.data.contact,
        offer: req.body.data.offer,
        truckTypeGroup: req.body.data.truckTypeGroup,
        truckTypes: req.body.data.truckTypes,
        loadType: req.body.data.loadType,
        lookBackHours: req.body.data.lookBackHours,
        startDate: req.body.data.startDate,
        endDate: req.body.data.endDate,
        age: req.body.data.age,
        pickup: req.body.data.pickup,
        weight: req.body.data.weight,
        trip: req.body.data.trip,
        eq: req.body.data.eq,
        length: req.body.data.length,
        factor: req.body.data.factor,
        cs: req.body.data.cs

    }

    models.loads.create(loads).then(result => {
        res.status(200).json({
            message: 'Create Load successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function getLoads(req, res){
    const userId = req.params.id;
    models.loads.findAll({where:{userId:userId}}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

async function getAllLoads(req, res){
    const userId = req.params.id;
    await db.sequelize.query("SELECT loads.*, loadDelieveries.status  from loads Join loadDelieveries ON loads.id = loadDelieveries.loadId where loads.userId = :userId", { replacements: { userId: userId }, type: QueryTypes.SELECT }).then(result=>{
        return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});
    
        })

}


function search(req, res){

    models.loads.findAll({where:{ 
        [Op.or]: [
            {origin: { [Op.like]: '%'+ req.body.data.origin + '%'}},
            {DHO:  { [Op.like]: '%'+ req.body.data.DHO + '%'}},
            {DHD: { [Op.like]: '%'+ req.body.data.DHD + '%'}},
            {destination: { [Op.like]: '%'+ req.body.data.destination + '%'}},
            {company: { [Op.like]: '%'+ req.body.data.company + '%'}},
            {contact: { [Op.like]: '%'+ req.body.data.contact + '%'}},
            {offer: { [Op.like]: '%'+ req.body.data.offer + '%'}},
            {truckTypeGroup: { [Op.like]: '%'+ req.body.data.truckTypeGroup + '%'}},
            {truckTypes: { [Op.like]: '%'+ req.body.data.truckTypes + '%'}},
            {loadType: { [Op.like]: '%'+ req.body.data.loadType + '%'}},
            {lookBackHours: { [Op.like]: '%'+ req.body.data.lookBackHours + '%'}},
            {startDate: { [Op.like]: '%'+ req.body.data.startDate + '%'}},
            {endDate: { [Op.like]: '%'+ req.body.data.endDate + '%'}},
            {age: { [Op.like]: '%'+ req.body.data.age + '%'}},
            {pickup: { [Op.like]: '%'+ req.body.data.pickup + '%'}},
            {weight: { [Op.like]: '%'+ req.body.data.weight + '%'}},
            {trip: { [Op.like]: '%'+ req.body.data.trip + '%'}},
            {eq: { [Op.like]: '%'+ req.body.data.eq + '%'}},
            {length: { [Op.like]: '%'+ req.body.data.length + '%'}},
            {factor:{ [Op.like]: '%'+ req.body.data.factor + '%'}},
            {cs: { [Op.like]: '%'+ req.body.data.cs + '%'}},
        ],
        userId: req.body.user_id

    }}).then(result => {
        res.status(200).json({
            result
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function addPickupDate(req, res){

    const loadDelievery = {
        userId: req.body.userId,
        loadId: req.body.loadId,
        status: req.body.status,
        pickupDate:  req.body.data.pickupDate,
        dropDate:  req.body.data.dropDate,

    }

    models.loadDelieveries.create(loadDelievery).then(result => {
        res.status(200).json({
            message: 'Date Added successfully'
        });
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}

function addLoadsDocument(req, res){

        uploadPath = path.join(__dirname, '../uploads/loadDocuments/'+Date.now()+'.png');
        if(uploadPath){
            documentName = Date.now()+'.png';
        }


        // const path = '../uploads/'+Date.now()+'.png'

        const imgdata = req.body.data;
        
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        // console.log(base64Data);
        
        fs.writeFileSync(uploadPath, base64Data,  {encoding: 'base64'});
        // return res.send(uploadPath);

        const loadDocuments = {
            userId: req.body.userId,
            loadId: req.body.loadId,
            documentType: 'image',
            documentName: documentName,
    
        }

        models.loadDocuments.create(loadDocuments).then(result => {
            res.status(200).json({
                message: 'Document Added successfully'
            });
        }).catch(error=>{
            res.status(500).json({error: error});
        });



    // const { image } = req.body.data;
    // base64Img.img(image, '../uplaods', Date.now(), function(err, filepath) {
    //   const pathArr = filepath.split('/')
    //   const fileName = pathArr[pathArr.length - 1];
  
    //   console.log(fileName);
    // //   res.status(200).json({
    // //     success: true,
    // //     url: `http://127.0.0.1:${port}/${fileName}`
    // //   })
    // });

    
    // console.log(base64Data)
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log(req);
    //     // console.log(req.files);
    //     // var data = JSON.parse(req.body.data)
    //     // console.log(req.body.userId);
        

        
    //     // const document = {
    //     //   userId: req.body.userId,
    //     //   entities: data.entities,
    //     //   documentName: data.documentName,
    //     //   documentTypes: data.documentTypes,
    //     //   documentDescription: data.documentDescription,
    //     //   isCompanyDocument: data.isCompanyDocument,

    //     // }

    //     // models.docManagement.create(document).then(result => {
    //     //     res.status(200).json({
    //     //         message: 'Document upload successfully'
    //     //     });
    //     // }).catch(error=>{
    //     //     res.status(500).json({error: error});
    //     // });
  
    // })




}

function uploadDocument(req, res){

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        // console.log(req.files[0].originalname);
        var data = JSON.parse(req.body.data)
        // console.log(data.file);
        

        
        const document = {
          userId: req.body.userId,
          loadId: req.body.loadId,
          documentType: 'document',
          documentName: req.files[0].originalname,

        }

        models.loadDocuments.create(document).then(result => {
            res.status(200).json({
                message: 'Document upload successfully'
            });
        }).catch(error=>{
            res.status(500).json({error: error});
        });
  
    })




}

function getLoadDocument(req, res){
    const userId = req.params.userId;
    const loadId = req.params.loadId;
    models.loadDocuments.findAll({where:{userId:userId,  loadId: loadId}}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

function downloadDocument(req, res){
    console.log(req.body.filename);
  
    filePath = path.join(__dirname, '../uploads/loadDocuments/') + req.body.filename;
    res.sendFile(filePath);
  
  }

  


module.exports = {
    addLoads: addLoads,
    getLoads: getLoads,
    search: search,
    addPickupDate: addPickupDate,
    addLoadsDocument:addLoadsDocument,
    getAllLoads:getAllLoads,
    uploadDocument: uploadDocument,
    upload: upload,
    getLoadDocument: getLoadDocument,
    downloadDocument:downloadDocument
};
