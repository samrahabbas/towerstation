const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const user = require("./routes/user");
const loads = require("./routes/loads.js");
const usermanagement = require("./routes/user-management.js");
const roles = require("./routes/roles.js");
const zipcodes = require("./routes/zip-code-data.js");
const signed_documents = require("./routes/signed-documents.js");
const customer = require("./routes/customers.js");
const carrier = require("./routes/carrier.js");
const shipper = require("./routes/shipper.js");
const trailers = require("./routes/trailers.js");
const powerunit = require("./routes/power-unit.js");
const drivers = require("./routes/drivers.js");
const assets = require("./routes/assets.js");
const locations = require("./routes/location.js");
const docmanagement = require("./routes/doc-management.js");
const userDocument = require("./routes/user-document.js");
const morgan = require("morgan");
const app = express();
const path = require("path");  
const cookieParser = require("cookie-parser");
const fs = require("fs")

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use(express.static(path.join(__dirname, '/uploads')));

app.use('/api', user)
app.use('/api/loads', loads);
app.use('/api/user-management', usermanagement);
app.use('/api/roles', roles);
app.use('/api/zip-code-data', zipcodes);
app.use('/api/customer', customer);
app.use('/api/shipper', shipper);
app.use('/api/carrier', carrier);
app.use('/api/trailers', trailers);
app.use('/api/drivers', drivers);
app.use('/api/powerunit', powerunit);
app.use('/api/assets', assets);
app.use('/api/location', locations);
app.use('/api/doc-management', docmanagement);
app.use('/api/signed-documents', signed_documents);
app.use('/api/form', userDocument);
app.use("/images", express.static("uploads/loadDocuments"));
app.get('/pdf', function(req, res, next) {
    res.sendFile(__dirname + '/uploads/loadDocuments/AbdulRehman.pdf');
});  


// const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//       // cb(null, "../backend/uploads");
//       uploadPath = path.join(__dirname, './uploads/test');
//       cb(null, uploadPath);
//     },
//     filename: async function (req, file, cb) {
//       cb(null, Date.now() + ".pdf"); //Appending extension
//     //   cb(null, file.originalname);
//     },
//   });

// var upload =  multer({ storage: storage,limits: { fieldSize: 25 * 1024 * 1024 } }).any();

// app.post('/api/savePdf', (req,res) => {
  
//   upload(req, res, (err) => { 
//   const fs = require('fs');
//   console.log(req);
//   fs.writeFileSync(`${Date.now()}.pdf`, req.body.data,"base64")
//         if (err) {
//             console.log(err)
//         }
//       });

//       res.status(200).send({
//         test:"Gohar"
//       })
// });


app.listen(3200, ()=>{
    console.log('Server Runing');
})
// module.exports = app;
