# cec-recycling-points
The City of Edinburgh Council recycling points

## License

Data is licensed under the Open Government License: http://www.nationalarchives.gov.uk/doc/open-government-licence/version/2/

## Requirements

- NodeJS
- npm

## Installation

Clone the repository

```
git clone https://github.com/EdinburghCityScope/cec-recycling-points.git
```

Install npm dependencies

```
cd cec-recycling-points
npm install
```

Run the API (from the uoe-campus-maps directory)

```
node .
```

Converting the csv into loopback data.

```
node scripts/featureCollectionToLoopbackJson.js
```

Importing data from Edinburgh Council CKAN portal

```
node scripts/ckan-import.js
```
