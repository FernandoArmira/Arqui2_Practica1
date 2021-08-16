/*const express = require('express')

const app = express()

app.set('port', 3000)

app.get('/',(req, res ) => {
    res.send('Practica 1 Arqui 2')
})

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conexion a puerto serial
/*const SerialPort = require('serialport');
const ReadLine  = require('@serialport/parser-readline');*/

//Asignar el numero de puerto serial y baudrate
/*const port = new SerialPort('COM1',{baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));*/

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log("Conexion a BD")

//Lectura de datos enviados de arduino
/*port.on("open",() => {
    console.log('Se abrio la comunicacion');
});*/

/*parser.on("data", data =>{
    console.log(data);
    insertData(data); // inserccion de datos
});*/


// Ingresar datos de prueba a ,a DB
prueba = "{\"temperatura\": 25, \"viento\": 62, \"humedad\": 13}";
console.log(prueba);
insertData(prueba);
console.log("Dato insertado \n");
console.log("Ulgimo dato")
selectData();


//Funciones Base de datos

//Funcion insertar datos en la DB
function insertData(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('medidas').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

//Seleccionar ultimo dato de la DB
function selectData(){
    MongoClient.connect(url, function(err, db){
        if (err) throw err; 
        const dbo = db.db ('mydb'); 
        dbo.collection ('medidas').findOne({}, {sort:{$natural:-1}},function(err, doc){
            if(err) throw err;
            console.log(doc);
            db.close();
        }); 

    });
}
