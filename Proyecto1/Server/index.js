const express = require('express')

const app = express()

const database = require('./database.js');

app.set('port', 3001)

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conexion a puerto serial
const SerialPort = require('serialport');
const ReadLine  = require('@serialport/parser-readline');

//Asignar el numero de puerto serial y baudrate
const port = new SerialPort('COM5',{baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));

//Lectura de datos enviados de arduino
port.on("open",() => {
    console.log('Se abrio la comunicacion');
});

parser.on("data", data =>{
    console.log(data);
    database.insertData(database.datetime(data))
});

// Funcion que analiza los datos en la coleccion tomadas del dia anterior
//console.log(database.yesterday())
database.analyzedata(database.yesterday());

// Rutas
app.get('/',(req, res ) => {
    res.send("Proyecto 1 Arqui 2")
    /*
    // Ingresar datos de prueba a la DB
    prueba = "{\"sentado\": 0, \"peso\": 150}";
    console.log(prueba);
    database.insertData(database.datetime(prueba))
    */
})

//datos tomados de cada dia /datosdia12-9-2021
app.get('/datosdia:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selectData(req,res, fecha)
})

//Horarios en los que se uso la silla de cada dia /horario12-9-2021
app.get('/horario:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selecthorario(req,res, fecha)
})

//tiempos de uso maximo seguido sin levantarse de la silla por dia
app.get('/maximos',(req, res ) => {
    database.selectmaximo(req,res)
})

//tiempo total de uso de la silla por dia - horas acumuladas
app.get('/acumulados',(req, res ) => {
    database.selectacumulado(req,res)
})

//peso promedio tomado por dia
app.get('/peso',(req, res ) => {
    database.selectpeso(req,res)
})

//monitoreo de datos en crudo
app.get('/monitoreo',(req, res ) => {
    database.monitoreo(req,res)
})

//tiempo total de uso de la silla desde el dia 1 hasta el presente
app.get('/totaltiempo',(req, res ) => {
    database.tiempototal(req,res)
})

//veces que se levanto el usuario de la silla por dia
app.get('/levantadas',(req, res ) => {
    database.selectnlevantadas(req,res)
})

//promedio de las veces que se levanto el usuario por dia
app.get('/promediolevantadas',(req, res ) => {
    database.promediolevantadas(req,res)
})

//promedio del tiempo que se uso la silla por dia
app.get('/promediouso',(req, res ) => {
    database.promediotiempousado(req,res)
})


