const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cowinController")


router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.get("/cowin/centres", cowinController.getByPin)
router.post("/cowin/otp", cowinController.getByOtp)
router.get("/weather", cowinController.getweather)
router.get("/london/temp", cowinController.londonTemp)
router.get("/weatherCity", cowinController.weatherCities)


module.exports = router;