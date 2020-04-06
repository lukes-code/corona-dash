const mongoose = require('mongoose')
// reads from .env file
const DbConnString = process.env.ConnString
const isDebug = false
const log = console.log

function _connect() {
    log(DbConnString)
    mongoose.connect(DbConnString, {useNewUrlParser: true, useUnifiedTopology: true })
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() { log("we're connected!") });
}

function debugLog(msg) {
    if(isDebug===true) log(msg);
}


function getMongoSchemas(){
    // { name:string, iso2: string, iso3:string, confirmed:number, recovered: number, deaths: number }
    var statistic = new mongoose.Schema({
        name: String,
        iso2: String,
        iso3: String,
        confirmed: Number,
        recovered: Number,
        deaths: Number
    });
    const collectionName = "countryStatistic"
    const Statistic = mongoose.model("Statistic", statistic, collectionName)
    return { Statistic }
}

const { Statistic } = getMongoSchemas()



async function getAllStatsDoc() { 
    try {
      return await Statistic.find({})
    } catch (error) {
      console.dir('something is wrong...')
      log(error)
      return []
    }
  }


  module.exports = {
      Statistic,
      log,
      _connect,
      getAllStatsDoc,
      debugLog
  }