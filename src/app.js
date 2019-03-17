const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/location');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') ;
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve, express will first check for all files in the public directory. If it does not find it will check with following in this order :- app.get('', then app.get('/about' , app.get('/help' then app.get('/weather' then app.get('*',
app.use(express.static(publicDirectoryPath));

// routes
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Andrew'
	});
});

// routes
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Andrew'
	});
});

// routes
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		message: 'This is the help page'
	});
});

// routes
app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address'
		});
	}
	
	geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
		if(error){
			return res.send({
				error: error
			});
		}else{
			forecast(latitude, longitude, (error, forecastData) => {
				if(error){
					return res.send({
						error: error
					});
				}else{
					res.send({
						address: req.query.address,
						forecast: forecastData,
						location
					});
				}
			});
		}
	} );	
	
	
});

app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404' , {
		message: 'Help article not found'
	})
} )

app.get('*', (req, res) => {
	res.render('404' , {
		message: 'Page not found'
	})
} )

app.listen(port, () => {
	console.log('Server is up on port '+port);
});
