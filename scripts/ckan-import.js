// ckan importer script
var fs = require('fs');
var edinburghcityscopeUtils = require('edinburghcityscope-utils');
var getDataFromURL = edinburghcityscopeUtils.getDataFromURL;
var getCkanApiResponseFields = edinburghcityscopeUtils.getCkanApiResponseFields;
var convertCkanAPIResultsToCityScopeJson = edinburghcityscopeUtils.convertCkanAPIResultsToCityScopeJson;
var parseCkanApiResponseFields = edinburghcityscopeUtils.parseCkanApiResponseFields;
var parseCkanApiResult = edinburghcityscopeUtils.parseCkanApiResult;
var convertCsvDataToGeoJson = edinburghcityscopeUtils.convertCsvDataToGeoJson;
var json2csv = require('json2csv');
var path = require('path');
var datadir = path.join(__dirname, '..', 'data');

var ckanApiUrl = 'http://data.edinburghopendata.info/api/action/datastore_search?resource_id=4cfb5177-d3db-4efc-ac6f-351af75f9f92';
var outputCsvFile = path.join(datadir, 'recycle-points.csv');
var outputGeoJsonFile = path.join(datadir, 'recycle-points.geojson');
console.log("Getting ckan data from API");
getDataFromURL(ckanApiUrl, function(err, callback){
  if (err) throw err

  console.log("Running data parse");
  var ckanJson = convertCkanAPIResultsToCityScopeJson(callback);
  ckanJson = parseCkanApiResult(ckanJson);

  var ckanFields = getCkanApiResponseFields(callback);
  ckanFields = parseCkanApiResponseFields(ckanFields);

  console.log("Creating CSV");
  var csvFields = [];
  ckanFields.forEach(function(obj){
    csvFields.push(obj.id);
  });
  json2csv({ data: ckanJson, fields: csvFields, newLine: "\n" }, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile(outputCsvFile, csv, function(err) {
      if (err) throw err;
      console.log('CSV file saved to '+outputCsvFile);
      console.log("Converting CSV to GeoJSON");
      var csvData = fs.readFileSync(outputCsvFile, 'utf8');
      convertCsvDataToGeoJson(csvData,function(callback){
        fs.writeFile(outputGeoJsonFile,JSON.stringify(callback), function(err){
          if (err) throw err;
          console.log('GeoJSON file saved to '+outputGeoJsonFile);
        });
      });
    });
  });

});
