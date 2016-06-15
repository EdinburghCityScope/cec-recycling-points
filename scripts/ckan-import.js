// ckan importer script
var fs = require('fs');
var edinburghcityscopeUtils = require('edinburghcityscope-utils');
var getDataFromURL = edinburghcityscopeUtils.getDataFromURL;
var getCkanApiResponseFields = edinburghcityscopeUtils.getCkanApiResponseFields;
var convertCkanAPIResultsToCityScopeJson = edinburghcityscopeUtils.convertCkanAPIResultsToCityScopeJson;
var parseCkanApiResponseFields = edinburghcityscopeUtils.parseCkanApiResponseFields;
var parseCkanApiResult = edinburghcityscopeUtils.parseCkanApiResult;
var convertCsvDataToGeoJson = edinburghcityscopeUtils.convertCsvDataToGeoJson;
var csv2geojson = require('csv2geojson');

var json2csv = require('json2csv');
var csvtojson = require('csvtojson');
//var featureCollection = fs.readFileSync('../data/campus-maps.geojson', 'utf8');
//var features = [];
//features = edinburghcityscopeUtils.featureCollectionToFeatureArray(featureCollection);
//var loopbackJson = edinburghcityscopeUtils.featureArrayToLoopbackJson(features);
var ckanApiUrl = 'http://data.edinburghopendata.info/api/action/datastore_search?resource_id=4cfb5177-d3db-4efc-ac6f-351af75f9f92';
var outputCsvFile = './data/recycle-points.csv';
var outputGeoJsonFile = './data/recycle-points.geojson';
console.log("Getting ckan data from API");
getDataFromURL(ckanApiUrl, function(callback){
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
  json2csv({ data: ckanJson, fields: csvFields }, function(err, csv) {
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
