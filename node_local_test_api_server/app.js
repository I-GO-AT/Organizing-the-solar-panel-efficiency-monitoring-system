var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql')
const fetch = require('node-fetch');


var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'solar_power_test'
  })

  connection.connect()

  app.listen(3001, function() {
    console.log("start!! express server on port 3001")
  });

  
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


function get_random_value(){
  return Math.random();
}


// generate dummy sensor data
const insert_interval = setInterval(() => {
    fetch('https://api.thingspeak.com/channels/961989/feeds/last.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(surface_info) {
      console.log(surface_info);
      let entry_id = surface_info["entry_id"];
      let temperature = surface_info["field3"];
      let humidity = 0;
      console.log('INSERT INTO surface_info VALUES ('+entry_id+','+temperature+','+humidity+','+'CURRENT_TIMESTAMP'+');');
      let query_sentence = 'INSERT INTO surface_info VALUES ('+entry_id+','+temperature+','+humidity+','+'CURRENT_TIMESTAMP'+');'
      connection.query(query_sentence, function (err, rows, fields) {
        if (err) {
            console.log(err.message)
        }else{
            console.log('INSERT COMPLETE !!!')
        }
      })
    });       
}, 10000);
 


