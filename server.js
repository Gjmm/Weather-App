// Empty JS object to act as endpoint for all routes including as the API endpoint
projectData = {};

// Express package to run the server and its routes
const express = require ("express");

// Initiate an instance of app
const app = express();

// Dependencies - Middleware
const bodyParser = require ("body-parser");

// Middleware - connect to the app instance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross origin allowance
const cors = require("cors");
app.use(cors());

// Direct my app to connect the server-side code to my main project folder AKA my client-side code
app.use(express.static("website"));

// Creat local server
const port = 8000;

const server = app.listen (port, () => {
    console.log("server is running");
    console.log(`running on localhost:${port}`);
});

// Respond with JS object when a GET route request is made to the homepage
// "/all" so that the route triggers the GET request and returns the JS object
app.get("/all", sendData);

function sendData (request, response) {
    response.send(projectData);
    console.log(projectData);
};

// POST Route:
app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
};

//POST zip code and fellings:
// Empty array to hold data
const weatherData = [];

// First argument created is the URL I want to use and creat an API to add infos about the weather
app.post("/addZipCode", zipCode);

// Obtains info from request.body and push into the array to have access to it from anywhere within the app
function zipCode (request, response) {
    console.log(request.body);

    newEntry = {
        zipCode: request.body.zip,
        feelings: request.body.feelings,
        date: request.body.date,
        temperature: request.body.temperature,
        content: request.body.content
    }

    weatherData.push(newEntry);
    response.send(weatherData);
    console.log(weatherData);
}