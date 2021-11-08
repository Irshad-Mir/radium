function printDate(){
    console.log(Date())
}
function printMonth(){
    const d = new Date()
    console.log(d.getMonth())
}
function getBatchInfo(){
    console.log("Batch name - FunctionUp")
    console.log("week - 4th day1")
    console.log("Todays Topic - Node JS")
}
module.exports.printDate=printDate;
module.exports.printMonth=printMonth;
module.exports.getBatchInfo=getBatchInfo;