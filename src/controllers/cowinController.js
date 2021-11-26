const axios = require("axios");
const coinsModel = require("../models/coinsModel.js");

// res.status(200). send( { data: userDetails } )

/*const getCoins = async function (req, res) {
  try {
   
    
    let options = {
      method: "get",
      url: `http://api.coincap.io/v2/assets`,
       HEADERS: {
      //"Content-Type": "application/json",
        "Authorization": "Bearer 53d53e22-0776-4597-bfbd-511837a939e6 "
    }
    };
     
    const coins = await axios(options);
    //  let savedData = await coinsModel.create(data)
  


    console.log("WORKING");
    let cyprtoCoins = coins.data;
    console.log(cyprtoCoins)
    res.status(200).send({ msg: "Successfully fetched data", data: cyprtoCoins });
  

  } 
  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }

};
*/

const getCoins = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: `http://api.coincap.io/v2/assets`,
      HEADERS: {
        //"Content-Type": "application/json",
        Authorization: "Bearer 53d53e22-0776-4597-bfbd-511837a939e6 ",
      },
    };
    let response = await axios(options);

    let x = response.data.data;

    for (i = 0; i < x.length; i++) {
      let s = {
        symbol: x[i].symbol,
        name: x[i].name,
        marketCapUsd: x[i].marketCapUsd,
        priceUsd: x[i].priceUsd,
      };

      await coinsModel.findOneAndUpdate({ symbol: x[i].symbol }, s, {
        upsert: true,
        new: true,
      });
    }

    res.status(200).send({ status: true, data: x });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });
  }
};

module.exports.getCoins = getCoins;
//module.exports.getRanking=getRanking
