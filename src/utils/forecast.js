const request = require('request') ;

				
const forecast = (latitude, longitude,  callback) => {
	
	const baseUrl = 'https://api.darksky.net/forecast/0c65e2b15e58dbbe11684627f15745ef/';	
	
	const url = baseUrl + latitude + ',' + longitude +'?units=si';
		
			// Object shorthand		
	request({url, json: true}, (networkError, {body}) => {
	
		if(networkError){
			callback("Unable to connect to weather service!", undefined) ;
		}else if (body.error){
			callback("Unable to find location", undefined);
		}else{
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. Maximum and Minimum temperature is expected to be '+  body.daily.data[0].temperatureMax + ' and ' + body.daily.data[0].temperatureMin) ;
		}
	});
}

module.exports = forecast ;
