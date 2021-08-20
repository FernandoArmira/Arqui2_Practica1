const express = require('express')

const app = express()

app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

var dato = "";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conexion a puerto serial
const SerialPort = require('serialport');
const ReadLine  = require('@serialport/parser-readline');

//Asignar el numero de puerto serial y baudrate
const port = new SerialPort('COM4',{baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://fernando:<password>@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = "mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Conexion a BD")

//Lectura de datos enviados de arduino
port.on("open",() => {
    console.log('Se abrio la comunicacion');
});

parser.on("data", data =>{
    console.log(data);
    insertData(data); // inserccion de datos
    selectData();
});

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
        //dbo.collection ('medidas').findOne({Medida:'humedad'}, {sort:{$natural:-1}},function(err, doc){  //Filtrar datos por medida
            if(err) throw err;
            console.log(doc);
            dato = doc;
            //Obtener datos del json
            /*console.log("Temperatura:" + doc.temperatura);
            console.log("Viento:" + doc.viento);
            console.log("Temperatura:" + doc.humedad);*/
            db.close();
        }); 

    });
}

// Endpoint
app.get('/',(req, res ) => {
    res.send(dato)
})


// Ingresar datos de prueba a ,a DB

//prueba = "{\"temperatura\": 27, \"viento\": 62, \"humedad\": 13, \"direccion\": 40}";
//prueba = "abc";
//prueba = "{\"Medida\": \"temperatura\" , \"Dato\": 20}";
//console.log(prueba);

//if (prueba.includes("Medida")){ //validar datos
//insertData(prueba);
//console.log("Dato insertado \n");
//}

//console.log("Ultimo dato")
//selectData();