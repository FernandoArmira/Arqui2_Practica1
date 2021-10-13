const express = require('express')

const app = express()

app.set('port', 3000)

app.get('/',(req, res ) => {
    res.send('Practica 2 Arqui 2')
})

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SerialPort = require('serialport');
const ReadLine  = require('@serialport/parser-readline');

var serialport = new SerialPort("COM8", {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

const parser = serialport.pipe(new ReadLine({delimiter: '\n'}));

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = "mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Conexion a BD")

serialport.on('open', function () {
    console.log('Puerto Abierto');
  });

/*
serialport.on('data', function(data) {
    console.log(data.toString());
    //insertData(data.toString())
});*/


parser.on("data", data =>{
    console.log(data.toString());
    insertData(datetime(data.toString()))
    medias()
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funcion insertar datos en la DB
function insertData(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('medidaspr2').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function datos(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidaspr2").find().toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
          db.close();
        });
      });
}

function datosdia(req, res, datep){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidaspr2").find({fecha: datep}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
          db.close();
        });
      });
}

function medias(){
    var temperatura = 0
    var viento = 0
    var humedad = 0
    var est = ""
    var contnublado = 0
    var contdespejado = 0

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidaspr2").find().toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          for(var i=0; i < result.length; i++){
              temperatura = temperatura + result[i].temperatura
              viento = viento + result[i].viento
              humedad = humedad + result[i].humedad
              est = result[i].estado
              //console.log(est)

              if(est = "despejado"){
                  contdespejado = contdespejado + 1
              }else if (est = "nublado"){
                contnublado = contnublado + 1
              }
              //console.log(result[i].temperatura)
              //console.log(result[i].viento)
              //console.log(result[i].humedad)
              //console.log(result[i].luz)
          }

        temperatura = temperatura / result.length
        viento = viento / result.length
        humedad = humedad / result.length

        if(contdespejado >= contnublado){
            est = "despejado"
        }else{
            est = "nublado"
        }
        //luz = luz / result.length

        /*console.log(temperatura)
        console.log(viento)
        console.log(humedad)
        console.log(luz)*/

        dato = "{\"mediatemperatura\":" + temperatura.toFixed(2)  + ", \"mediaviento\": " + viento.toFixed(2) + ", \"mediahumedad\": " + humedad.toFixed(2) + ", \"modaluz\": \"" + est +"\" }"
        insertdata2(dato)

        //res.send(result);
        db.close();
        });
      });
}

function insertdata2(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('mediaspr2').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function datetime(data){
    var fecha = new Date();
    const str = data;

    var temporal = data + "}"
    const obj  = JSON.parse(temporal);

    //console.log(obj.luz)

    var hora =  fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()

    let today_weather = getStringVisibility(hora, obj.luz);
    
    //console.log(str);
    const str2 = str + ", \"fecha\": \""  + fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear() + "\", \"hora\": \"" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "\", \"estado\": \"" + today_weather + "\"}"
    
    console.log(str2);
    //console.log(today_weather)

    return str2
}


//datos en general
app.get('/datos',(req, res ) => {
    datos(req,res)
})


//datos tomados de cada dia /datosdia12-9-2021
app.get('/datosdia:fecha',(req, res ) => {
    const {fecha} = req.params;
    datosdia(req,res, fecha)
})

/*
//medias de las medidas
app.get('/medias',(req, res ) => {
    medias()
})
*/

//Analisis dato luminosidad
const weather = {
    SUNNY: "SUNNY",
    CLOUDY: "CLOUDY"
}

//Returns an enum to indicate weather is sunny or cloudy, only works from 7am to 6pm
function getLight(time, light){
    let time_split = time.split ( ":" );
    let hour = parseInt(time_split[0].trim());
    let minutes = parseInt(time_split[1].trim());
    switch (hour){
        case 7:
            if(light > 930)
                return weather.SUNNY;            
            break;
        case 8:
            if(light > 935)
                return weather.SUNNY;
            break;
        case 9:
            if(light > 950)
                return weather.SUNNY;
            break;
        case 10:
            if(light > 970)
                return weather.SUNNY;
            break;
        case 11:
            if(light > 980)
                return weather.SUNNY;
            break;
        case 12:

            if(light > 980)
                return weather.SUNNY;
            break;
        case 13:
            if(light > 960)
                return weather.SUNNY;
            break;
        case 14:
            if(light > 940)
                return weather.SUNNY;
            break;
        case 15:
            if(light > 915)
                return weather.SUNNY;
            break;
        case 16:
            if(light > 915)
                return weather.SUNNY;
            break;
        case 17:
            if(light > 935)
                if(minutes <= 40 && light > 600){
                    return weather.SUNNY;
                }else if(minutes > 40 && minutes <= 50 && light > 400){
                    return weather.SUNNY;
                }else if(minutes > 50 && minutes <= 55 && light > 250){
                    return weather.SUNNY;
                }else if(minutes > 55  && light > 150){
                    return weather.SUNNY;
                }else{
                    return weather.CLOUDY;
                }
            break;
        case 18:
            if(light > 100)
                return weather.SUNNY;
            break;
        default:
            return weather.SUNNY

    }

    
}


function getStringVisibility(time, light){
    //return "Visibilidad [" +  (getLight(time, light)==weather.SUNNY?"despejado":"nublado") + "]"
    return getLight(time, light)==weather.SUNNY?"despejado":"nublado"
}

//Pruebas
/*
prueba = "{\"temperatura\": 26.10, \"viento\": 14.00, \"humedad\": 18.00,\"direccion\": -1,\"luz\": 1000";
console.log(prueba.toString())
insertData(datetime(prueba.toString()))
medias()
*/
//let today_weather = getStringVisibility("20:0:13", 914);
//console.log(today_weather)
//console.log(weather.SUNNY)