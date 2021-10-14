const express = require('express')
const cors = require("cors");

const app = express()

const  port = process.env.PORT || 3000;

//app.set('port', 3000)
app.use(cors());

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port)
})

var dato = "";
//var fecha = new Date();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://fernando:<password>@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const url = "mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Conexion a BD")


//Funciones Base de datos
/*
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
}*/

//Seleccionar ultimo dato de la DB
function selectData(req,res){
    MongoClient.connect(url, function(err, db){
        if (err) throw err; 
        const dbo = db.db ('mydb'); 
        dbo.collection ('medidaspr2').findOne({}, {sort:{$natural:-1}},function(err, doc){
        //dbo.collection ('medidas').findOne({Medida:'humedad'}, {sort:{$natural:-1}},function(err, doc){  //Filtrar datos por medida
            if(err) throw err;
            console.log(doc);
            dato = doc;
            res.send(dato)
            //Obtener datos del json
            /*console.log("Temperatura:" + doc.temperatura);
            console.log("Viento:" + doc.viento);
            console.log("Temperatura:" + doc.humedad);*/
            db.close();
        }); 

    });
}

//Seleccionar ultimo dato de la DB de las medias
function selectMedias(req,res){
    MongoClient.connect(url, function(err, db){
        if (err) throw err; 
        const dbo = db.db ('mydb'); 
        dbo.collection ('mediaspr2').findOne({}, {sort:{$natural:-1}},function(err, doc){
        //dbo.collection ('medidas').findOne({Medida:'humedad'}, {sort:{$natural:-1}},function(err, doc){  //Filtrar datos por medida
            if(err) throw err;
            console.log(doc);
            dato = doc;
            res.send(dato)
            //Obtener datos del json
            /*console.log("Temperatura:" + doc.temperatura);
            console.log("Viento:" + doc.viento);
            console.log("Temperatura:" + doc.humedad);*/
            db.close();
        }); 

    });
}

//status de todos los datos
function statusData(req,res){
    var temperatura = 0
    var viento = 0
    var humedad = 0
    //var luz = 0
    var calor = ""
    var velocidadviento = ""
    var lluvia = ""
    var visibilidad = ""
    MongoClient.connect(url, function(err, db){
        if (err) throw err; 
        const dbo = db.db ('mydb'); 
        dbo.collection ('mediaspr2').findOne({}, {sort:{$natural:-1}},function(err, doc){
        //dbo.collection ('medidas').findOne({Medida:'humedad'}, {sort:{$natural:-1}},function(err, doc){  //Filtrar datos por medida
            if(err) throw err;
            console.log(doc);
            //dato = doc;
            temperatura = doc.mediatemperatura
            viento = doc.mediaviento
            humedad = doc.mediahumedad
            visibilidad = doc.modaluz
            console.log(temperatura)
            console.log(viento)
            console.log(humedad)
            console.log(visibilidad)

            if(viento >= 0 &&  viento <= 20){
                velocidadviento = "Normal"
            }else if (viento > 20 && viento <=40){
                velocidadviento = "Moderado"
            }else {
                velocidadviento = "Alto"
            }
            if(humedad >= 75 ){
                lluvia = "Con lluvia"
            }else{
                lluvia = "Sin lluvia"
            }
            if(temperatura >= 27 ){
                calor = "Con calor"
            }else{
                calor = "Sin calor"
            }

            dato = "{\"Velocidadviento\": \"" + velocidadviento + "\", \"Visibilidad\": \"" + visibilidad + "\" , \"Lluvia\": \"" + lluvia + "\" , \"Calor\": \"" + calor + "\"}"

            res.send(dato)
            //Obtener datos del json
            /*console.log("Temperatura:" + doc.temperatura);
            console.log("Viento:" + doc.viento);
            console.log("Temperatura:" + doc.humedad);*/
            db.close();
        }); 

    });
}

//status del ultimo dato
function statusUltimodato(req,res){
    var temperatura = 0
    var viento = 0
    var humedad = 0
    var calor = ""
    var velocidadviento = ""
    var lluvia = ""
    var visibilidad = ""
    MongoClient.connect(url, function(err, db){
        if (err) throw err; 
        const dbo = db.db ('mydb'); 
        dbo.collection ('medidaspr2').findOne({}, {sort:{$natural:-1}},function(err, doc){
        //dbo.collection ('medidas').findOne({Medida:'humedad'}, {sort:{$natural:-1}},function(err, doc){  //Filtrar datos por medida
            if(err) throw err;
            console.log(doc);
            //dato = doc;
            temperatura = doc.temperatura
            viento = doc.viento
            humedad = doc.humedad
            visibilidad = doc.estado

            console.log(temperatura)
            console.log(viento)
            console.log(humedad)
            console.log(visibilidad)

            if(viento >= 0 &&  viento <= 20){
                velocidadviento = "Normal"
            }else if (viento > 20 && viento <=40){
                velocidadviento = "Moderado"
            }else {
                velocidadviento = "Alto"
            }
            if(humedad >= 75 ){
                lluvia = "Con lluvia"
            }else{
                lluvia = "Sin lluvia"
            }

            if(temperatura >= 27 ){
                calor = "Con calor"
            }else{
                calor = "Sin calor"
            }

            dato = "{\"Velocidadviento\": \"" + velocidadviento + "\", \"Visibilidad\": \"" + visibilidad + "\" , \"Lluvia\": \"" + lluvia + "\" , \"Calor\": \"" + calor + "\"}"

            res.send(dato)
            //Obtener datos del json
            /*console.log("Temperatura:" + doc.temperatura);
            console.log("Viento:" + doc.viento);
            console.log("Temperatura:" + doc.humedad);*/
            db.close();
        }); 

    });
}

/*function datetime(data){
    fecha = new Date();
    const str = data.substring(0, data.length - 1);
    //console.log(str);
    const str2 = str + ", \"fecha\": \""  + fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear() + "\", \"hora\": \"" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "\"}"
    console.log(str2);
    return str2
}*/

// Endpoint
app.get('/',(req, res ) => {
    //res.send(dato)
    res.send("Hola mundo")
})

app.get('/ultimodato',(req, res ) => {
    selectData(req,res);
    //res.send("Esto es una prueba")
})

app.get('/medias',(req, res ) => {
    selectMedias(req,res);
    //res.send("Esto es una prueba")
})

app.get('/status',(req, res ) => {
    statusData(req,res);
    //res.send("Esto es una prueba")
})

app.get('/statusultimodato',(req, res ) => {
    statusUltimodato(req,res);
    //res.send("Esto es una prueba")
})


// Ingresar datos de prueba a la DB
//prueba = "{\"sentado\": 0, \"peso\": 150}";
//console.log(prueba);

//insertData(datetime(prueba))
//console.log("Ultimo dato")
//selectData();