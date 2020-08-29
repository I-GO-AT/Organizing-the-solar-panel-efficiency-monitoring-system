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


// // generate dummy sensor data
// const insert_interval = setInterval(() => {
//     fetch('https://api.thingspeak.com/channels/961989/feeds/last.json')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(surface_info) {
//       console.log(surface_info);
//       let entry_id = surface_info["entry_id"];
//       let temperature = surface_info["field3"];
//       let humidity = 0;
//       console.log('INSERT INTO surface_info VALUES ('+entry_id+','+temperature+','+humidity+','+'CURRENT_TIMESTAMP'+');');
//       let query_sentence = 'INSERT INTO surface_info VALUES ('+entry_id+','+temperature+','+humidity+','+'CURRENT_TIMESTAMP'+');'
//       connection.query(query_sentence, function (err, rows, fields) {
//         if (err) {
//             console.log(err.message)
//         }else{
//             console.log('INSERT COMPLETE !!!')
//         }
//       })
//     });       
// }, 10000);

let count = 0;

function get_count(){
    connection.query('SELECT entry_id FROM controller_info ORDER BY entry_id DESC limit 1', function(err,rows,fields){
        if(err) throw err
        count = rows[0].entry_id
        console.log(rows[0].entry_id)
        
    })
}

get_count()



// generate dummy solar pannel data
const insert_interval = setInterval(() => {
    // console.log(surface_info);
    let entry_id = count;
    count = count + 1;
    let temperature = get_random_value()*15+100;
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

    let solar_voltage = get_random_value()*3+2;
    let solar_current = get_random_value()*2+1;
 
    let battery_voltage = get_random_value()*4+10;
    let battery_current = get_random_value()+3+8;
    let battery_state = "bulk";
    let solar_charged = get_random_value()*3;
    let yield_kwh = Math.random()*10+350;

    console.log('INSERT INTO controller_info VALUES ('+entry_id+','+solar_voltage+','+solar_current+','+battery_voltage+','+battery_current+',\''+battery_state+'\','+solar_charged+','+'CURRENT_TIMESTAMP,'+yield_kwh+');');
    let query_sentence_2 = 'INSERT INTO controller_info VALUES ('+entry_id+','+solar_voltage+','+solar_current+','+battery_voltage+','+battery_current+',"'+battery_state+'",'+solar_charged+','+'CURRENT_TIMESTAMP,'+yield_kwh+');'
    connection.query(query_sentence_2, function (err, rows, fields) {
      if (err) {
          console.log(err.message)
      }else{
          console.log('INSERT COMPLETE !!!')
      }
    })

  }, 10000);       



// API for Front-end
 
  app.get('/controller_info_last', function(req,res){
    connection.query('SELECT * FROM controller_info ORDER BY entry_id DESC limit 1', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })


  app.get('/controller_info_last_L1H', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -1 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_L3H', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -3 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_L6H', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -6 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_L12H', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -12 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_LD', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -24 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_LW', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -168 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/controller_info_last_LM', function(req,res){
    connection.query('SELECT * FROM controller_info WHERE timestamp > DATE_ADD(now(), INTERVAL -7200 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last', function(req,res){
    connection.query('SELECT * FROM surface_info ORDER BY timestamp DESC limit 1', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_L1H', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -1 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_L3H', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -3 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })
  app.get('/solar_info_last_L6H', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -6 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_L12H', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -12 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_LD', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -24 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_LW', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -168 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

  app.get('/solar_info_last_LM', function(req,res){
    connection.query('SELECT * FROM surface_info WHERE timestamp > DATE_ADD(now(), INTERVAL -7200 hour)', function(err,rows,fields){
      if(err) throw err
      console.log(rows)
      res.json(rows)
    })
  })

 


