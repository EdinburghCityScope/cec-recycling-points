// Script which converts a FeatureCollection to an array of Features
var fs = require('fs');
var path = require('path');
var datadir = path.join(__dirname, '..', 'data');
var edinburghcityscopeUtils = require('edinburghcityscope-utils');
var featureCollection = fs.readFileSync(path.join(datadir, 'recycle-points.geojson'), 'utf8');
var features = edinburghcityscopeUtils.featureCollectionToFeatureArray(featureCollection);
var loopbackJson = edinburghcityscopeUtils.featureArrayToLoopbackJson(features);

var outputFile = path.join(datadir, 'recycle-points-loopback.json');
fs.writeFile(outputFile,JSON.stringify(loopbackJson),(err) => {
  if (err) throw err;
  console.log('data/recycle-points-loopback.json created');
});
