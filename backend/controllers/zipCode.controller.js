const models = require('../models');
const fs = require('fs');


function getZipCode(req, res){
    fs.readFile(`./helper/geonames/US.txt`, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
        }
        const USZipCodesData = []
        // Split the file into an array of lines
        const lines = data.split('\n');
        // Loop through the lines
        for (let i = 0; i < lines.length; i++) {
          // Split the line into an array of columns
          const columns = lines[i].split('\t');
          // Print the columns
          USZipCodesData.push(columns);
        }
      //   console.log(USZipCodesData);
        const result = USZipCodesData
        .map(item => formatZipCodeData(item))
        .filter(item => {
          // console.log(item.zipCode)
          return item.zipCode === req.params.zipcode;
        });
  
        if (result.length === 0) {
              return res.status(404).json({message: 'Zip code not found'});
        }else{
            return res.status(200).json({messsge: "Success", result});
        }
      //   console.log(foundData[0].countryCode);
  
        
  
      //   this.cache.set(CacheKeysEnum.US_ZIP_CODES, USZipCodesData)
      //     .then(() => {
      //       console.log('USZipCodesData cached successfully')
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      });

}

function getStateByCity(req, res){
  fs.readFile(`./helper/geonames/US.txt`, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
      const USZipCodesData = []
      // Split the file into an array of lines
      const lines = data.split('\n');
      // Loop through the lines
      for (let i = 0; i < lines.length; i++) {
        // Split the line into an array of columns
        const columns = lines[i].split('\t');
        // Print the columns
        USZipCodesData.push(columns);
      }
      // console.log(req.params.city);
      const result = USZipCodesData
      .map(item => formatZipCodeData(item))
      .filter(item => {
        return item.placeName === req.params.city;
      });
      // console.log(result)

      // const result = USZipCodesData
      // .map(item => formatZipCodeData(item))
      // .map(item => item.stateName)
      // .filter(item=>{
      //   return item.placeName === req.params.placeName;
      // });
      // const uniqueStates = [...new Set(result)];
      // console.log(uniqueStates)

      if (result.length === 0) {
            return res.status(404).json({message: 'Zip code not found'});
      }else{
          return res.status(200).json({messsge: "Success", result});
      }
    //   console.log(foundData[0].countryCode);

      

    //   this.cache.set(CacheKeysEnum.US_ZIP_CODES, USZipCodesData)
    //     .then(() => {
    //       console.log('USZipCodesData cached successfully')
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    });

}

function formatZipCodeData(data) {
    return {
      countryCode: data[0],
      zipCode: data[1],
      placeName: data[2],
      stateName: data[3],
      stateCode: data[4],
      countyName: data[5],
      countyCode: data[6]
    };
  }

function getStates(req, res){
  fs.readFile(`./helper/geonames/US.txt`, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const USZipCodesData = []
    // Split the file into an array of lines
    const lines = data.split('\n');
    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
      // Split the line into an array of columns
      const columns = lines[i].split('\t');
      // Print the columns
      USZipCodesData.push(columns);
    }
  //   console.log(USZipCodesData);
    const result = USZipCodesData
    .map(item => formatZipCodeData(item))
    .map(item => item.stateName)
    .filter(item => !!item);
    const uniqueStates = [...new Set(result)];
    // console.log(uniqueStates)


    if (result.length === 0) {
          return res.status(404).json({message: 'State not found'});
    }else{
        return res.status(200).json({messsge: "Success", uniqueStates});
    }
  });
}

function getStates(req, res){
  fs.readFile(`./helper/geonames/US.txt`, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const USZipCodesData = []
    // Split the file into an array of lines
    const lines = data.split('\n');
    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
      // Split the line into an array of columns
      const columns = lines[i].split('\t');
      // Print the columns
      USZipCodesData.push(columns);
    }
  //   console.log(USZipCodesData);
    const result = USZipCodesData
    .map(item => formatZipCodeData(item))
    .map(item => item.stateName)
    .filter(item => !!item);
    const uniqueStates = [...new Set(result)];
    // console.log(uniqueStates)


    if (result.length === 0) {
          return res.status(404).json({message: 'State not found'});
    }else{
        return res.status(200).json({messsge: "Success", uniqueStates});
    }
  });
}


module.exports = {
    getZipCode: getZipCode,
    getStates: getStates,
    getStateByCity: getStateByCity,
};
