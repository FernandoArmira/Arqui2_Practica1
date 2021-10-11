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
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
});

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

function datetime(data){
    var fecha = new Date();
    const str = data.substring(0, data.length - 1);

    //console.log(str);
    const str2 = str + ", \"fecha\": \""  + fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear() + "\", \"hora\": \"" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "\"}"
    console.log(str2);

    return str2
}


//Pruebas
/*
prueba = "{\"temperatura\": 26.10, \"viento\": 14.00, \"humedad\": 18.00,\"direccion\": -1,\"luz\": 322";
console.log(prueba)
console.log(datetime(prueba))
insertData(datetime(prueba))*/