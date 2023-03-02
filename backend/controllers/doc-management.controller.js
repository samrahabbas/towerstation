const models = require('../models');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, "../backend/uploads");
      uploadPath = path.join(__dirname, '../uploads');
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
      cb(null, file.originalname);
    },
  });

  
   
var upload = multer({ storage: storage }).any();

// var upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 5
//   // },
//   // fileFilter: (req, file, cb) => {
//   //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//   //     cb(null, true);
//   //   } else {
//   //     cb(null, false);
//   //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//   //   }
//   // }
// }).single('file');


// upload.single('file')

function uploadDocument(req, res){

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        // console.log(req.files);
        var data = JSON.parse(req.body.data)
        // console.log(req.body.userId);
        

        
        const document = {
          userId: req.body.userId,
          entities: data.entities,
          documentName: data.documentName,
          documentTypes: data.documentTypes,
          documentDescription: data.documentDescription,
          isCompanyDocument: data.isCompanyDocument,

        }

        models.docManagement.create(document).then(result => {
            res.status(200).json({
                message: 'Document upload successfully'
            });
        }).catch(error=>{
            res.status(500).json({error: error});
        });
  
    })




}

function getDocuments(req, res){
  const userId = req.params.id;
  const userRole = req.params.role;
  if(userRole == 1){
    models.docManagement.findAll({order: [
      ["id", "DESC"],
  ],}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});
  
    })
  }else{

    models.docManagement.findAll({where:{userId:userId}, order: [
      ["id", "DESC"],
  ],}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});
  
    })
  }
}

function downloadDocument(req, res){
  
  filePath = path.join(__dirname, '../uploads/') + req.body.filename;
  res.sendFile(filePath);

}


function deleteDocument(req, res){
  const id = req.params.id;
  models.docManagement.destroy({where:{id:id}}).then(result=>{
      res.status(200).json({
          message: 'Document Deleted successfully'
      });
      
  }).catch(error=>{
      res.status(500).json({error: error});

  })
}



module.exports = {
    uploadDocument: uploadDocument,
    upload: upload,
    getDocuments: getDocuments,
    downloadDocument: downloadDocument,
    deleteDocument: deleteDocument
};
