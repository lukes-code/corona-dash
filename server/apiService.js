const Axios = require('axios')
// const { log, Statistic, _connect, debugLog } = require("./common")
const { log, _connect, Statistic, debugLog } = require("./common")
const state = {
    count: 0, 
    timeOut: 30000
};


(function main(){
    _connect()
    start()
})()
async function start() {
    state.count++
    const instance = new ServiceWork()
    const countries = await instance.getCountries()
    const countriesCopy = [...countries]
    const outCollection = []
    const cb = collectionRef => {if(Array.isArray(collectionRef)) collectionRef.forEach(i => log(i))}
    await instance.addData(countriesCopy, outCollection, () => cb(outCollection))
    log(`\n\n\tIteration Count - ${state.count}\n\n`)
    setTimeout(async () => await start(), state.timeOut)
}

async function upsert(newData) {
    // { name:string, iso2: string, iso3:string, confirmed:number, recovered: number, deaths: number }
    const { name, iso2, iso3, confirmed, recovered, deaths } = newData
    const myDocument = await Statistic.findOne({iso3})
    if(myDocument) {
        const hasChanged = name !== myDocument.name 
            || iso2 !== myDocument.iso2 
                || iso3 !== myDocument.iso3 
                    || confirmed !== myDocument.confirmed 
                        || recovered !== myDocument.recovered 
                            || deaths !== myDocument.deaths
        const documentID = myDocument._id
        const filter = { _id: documentID }
        if(hasChanged) {
            log(`hasChanged ${hasChanged ? "TRUE" : "FALSE"}`)
            let doc = await Statistic.findOneAndUpdate(filter, newData)
        } else {
            log(`document has NOT changed - country: ${newData.name}`)
        }
        // log(doc)
    } else {
        // adding a new document
        log(newData)
        await new Statistic(newData).save();
    }
}

function ServiceWork()
{
    // This service will get
    const UrlDictionary = {
        countries: 'https://covid19.mathdro.id/api/countries'
    }

    async function getCountries() {
        try {
          const httpResponse = await Axios.get(UrlDictionary.countries);
          const { data } = httpResponse
          let { countries } = data
          countries = countries.filter(x => x && typeof x.iso2 === 'string' && typeof x.name === 'string' && typeof x.iso3 === 'string')
          // log(countries)
          return countries;
        } catch(error) {
            debugLog(error);
        }
    }
    async function addData(countriesList, responses, callBack) {
        if(Array.isArray(countriesList)) {
            const _country = countriesList.pop()
            const url = `${UrlDictionary.countries}/${_country.iso2}`;
            try {
                const httpResponse = await Axios.get(url);
                const { data } = httpResponse
                const { confirmed, recovered, deaths } = data
                const _newData = {
                    ..._country, 
                    confirmed: confirmed.value,
                    recovered: recovered.value, 
                    deaths: deaths.value
                }
                upsert(_newData)
                responses.push(_newData)
            } catch(error) {
                debugLog(error);
            }
            if(countriesList.length > 0) {
                await this.addData(countriesList, responses, callBack)
            } else {
                callBack()
            }
        }
    }
    return {
        getCountries,
        addData
    }
}