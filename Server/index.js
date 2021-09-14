const express = require('express')

const app = express()

const database = require('./database.js');

app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

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


// Rutas
app.get('/',(req, res ) => {
    res.send("Proyecto 1 Arqui 2")
})

app.get('/dato',(req, res ) => {
    database.select(req,res, "13-9-2021", 0, 1)
})

app.get('/datosdia',(req, res ) => {
    database.selectData(req,res, "13-9-2021")
})


//Datos de prueba

/*
// Ingresar datos de prueba a la DB
prueba = "{\"sentado\": 0, \"peso\": 150}";
console.log(prueba);
database.insertData(database.datetime(prueba))
*/

database.selectCount('13-9-2021');