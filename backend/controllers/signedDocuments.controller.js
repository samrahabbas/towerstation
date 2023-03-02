const models = require('../models');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      // cb(null, "../backend/uploads");
      uploadPath = path.join(__dirname, '../uploads/signpdf');
      cb(null, uploadPath);
    },
    filename: async function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    //   cb(null, file.originalname);
    },
  });

var upload =  multer({ storage: storage,limits: { fieldSize: 25 * 1024 * 1024 } }).any();

async function addDocument(req, res){
await upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }

    const documents = {
        createdBy: req.body.u_id,
        file: `/signpdf/${req.files[0].filename}`,
        role: req.body.role || "Admin"
    }

    models.signedDocuments.create(documents).then(result => {
        res.status(200).json({
            message: 'Document Added successfully'
        });
    }).catch(error=>{
        console.log(error)
        res.status(500).json({error: error});
    });
})
}


function savePdf(req,res) {
    upload(req, res, (err) => { 
    const fs = require('fs');
    let docId = req.body.docId;
    let userId = req.body.userId;
    let fileName = Date.now();

    const documents = {
        signedBy: userId,
        file: `/signpdf/${fileName}.pdf`,
        documentId: docId
    }

    models.signedDocumentsUsers.create(documents).then(result => {
        res.status(200).json({
            message: 'Document Signed successfully'
        });
    }).catch(error=>{
        console.log(error)
        res.status(500).json({error: error});
    });

    fs.writeFileSync(`${path.join(__dirname, '../uploads/signpdf')}/${fileName}.pdf`, req.body.data,"base64")
        if (err) {
            console.log(err)
        }
    });

    
}

function getDocuments(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    if(userRole == 1){
        models.signedDocuments.findAll({ order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })
    }else{
        models.signedDocuments.findAll({where:{userId:userId }, order: [
            ["id", "DESC"],
        ],}).then(result=>{
            return res.status(200).json(result);
            
        }).catch(error=>{
            res.status(500).json({error: error});

        })
    }
    

}

async function getSignedDocuments(req, res){
    const userId = req.params.id;
    const userRole = req.params.role;
    let role = "Admin";
    if(userRole == 1){
        role = "Admin";
    }else if(userRole == "Broker"){
        role = "Broker";
    }else if(userRole == "Developer"){
        role = "Developer";
    }

    let result = {};
    let result2 = {};

    await models.signedDocuments.findAll({where:{role:role }, order: [
        ["id", "DESC"],
    ],}).then(r=>{
        result = r;
        
        
    }).catch(error=>{
        res.status(500).json({error: error});
    })

   await models.signedDocumentsUsers.findAll({where:{signedBy:userId }, order: [
        ["id", "DESC"],
    ],}).then(result=>{
        result2 = result;
        
    }).catch(error=>{
        res.status(500).json({error: error});
    })
    return res.status(200).json({result,result2});
}

function getSignedDocumentsById(req, res){
    
    const doc = req.params.id;
    
    models.signedDocumentsUsers.findAll({where:{documentId:doc }, order: [
        ["id", "DESC"],
    ],}).then(result=>{
        return res.status(200).json(result);
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
    
}


function deleteDocument(req, res){
    const id = req.params.id;
    models.signedDocuments.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: 'Document Deleted successfully'
        });
        
    }).catch(error=>{
        res.status(500).json({error: error});

    })
}

module.exports = {
    addDocument: addDocument,
    getDocuments,
    getSignedDocumentsById,
    deleteDocument,
    getSignedDocuments,
    savePdf
};
