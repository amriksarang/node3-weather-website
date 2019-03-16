const request = require('request') ;

const geocode = (address, callback) => {
	
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYW1yaWtzYXJhbmciLCJhIjoiY2p0NTZzaXNvMDJvbTQ0cGpsN3dzbHhjcyJ9.DYLj-LP_pzpuUuadnyCISA&limit=1' ;
	
			// shorthand for url
	request({url, json: true}, (error, response ) => {
		if(error){
			callback("Unable to connect to geolocation service", undefined);
		} else if(response.body.features.length === 0){
			callback("Unable to find location", undefined);
		} else {
			longitude = response.body.features[0].center[0];
			latitude = response.body.features[0].center[1];
			callback(undefined, {
				longitude: longitude,
				latitude: latitude,
				location: response.body.features[0].place_name
			});
		}
	});
}

module.exports = geocode ;
