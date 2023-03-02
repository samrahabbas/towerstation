const multer = require('multer');
const path = require('path');
const models = require('../models');




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, "../backend/uploads");
      uploadPath = path.join(__dirname, '../uploads/userDocuments');
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        console.log(file);
      // cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
      cb(null, file.originalname);
    },
  });

var upload = multer({ storage: storage }).any();



function uploadDocument(req, res){

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(req.body);
        var data = JSON.parse(req.body.data)
  
        
        const document = {
          userId: req.body.userId,
          senderId: req.body.senderId,
          documentName: req.files[0].originalname,

        }

        models.userDocuments.create(document).then(result => {
            res.status(200).json({
                message: 'Document upload successfully'
            });
        }).catch(error=>{
            res.status(500).json({error: error});
        });
  
    })




}


function getUserDocument(req, res){
    const userId = req.params.id;
    models.userDocuments.findAll({where:{senderId:userId}}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}


function downloadDocument(req, res){
  
    filePath = path.join(__dirname, '../uploads/userDocuments/') + req.body.filename;
    res.sendFile(filePath);
  
}


module.exports = {
    uploadDocument: uploadDocument,
    getUserDocument:getUserDocument,
    downloadDocument:downloadDocument 
};