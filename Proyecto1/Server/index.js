const express = require('express')

const app = express()

const database = require('./database.js');

app.set('port', 3001)

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

var hoy = new Date();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conexion a puerto serial
const SerialPort = require('serialport');
const ReadLine  = require('@serialport/parser-readline');

//Asignar el numero de puerto serial y baudrate
const port = new SerialPort('COM4',{baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));

//Lectura de datos enviados de arduino
port.on("open",() => {
    console.log('Se abrio la comunicacion');
});

parser.on("data", data =>{
    //console.log(data);
    //database.insertData(database.datetime(data)))
});

// Funcion que analiza los datos en la coleccion tomadas del dia anterior
//console.log(database.yesterday())
database.analyzedata(database.yesterday());

// Rutas
app.get('/',(req, res ) => {
    res.send("Proyecto 1 Arqui 2")
})

app.get('/datosdia:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selectData(req,res, fecha)
})

app.get('/horario:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selecthorario(req,res, fecha)
})

app.get('/maximos',(req, res ) => {
    database.selectmaximo(req,res)
})

app.get('/acumulados',(req, res ) => {
    database.selectacumulado(req,res)
})

app.get('/peso',(req, res ) => {
    database.selectpeso(req,res)
})

app.get('/monitoreo',(req, res ) => {
    database.monitoreo(req,res)
})






/*
// Ingresar datos de prueba a la DB
prueba = "{\"sentado\": 0, \"peso\": 150}";
console.log(prueba);
database.insertData(database.datetime(prueba))
*/
