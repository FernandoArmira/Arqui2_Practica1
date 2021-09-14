//Funciones Base de datos

//var dato = "";
var fecha = new Date();

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://fernando:<password>@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = "mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Conexion a BD")


module.exports = {

    //Funcion insertar datos en la DB
insertData: function(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('medidas').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
},

//Agregar fecha y hora del sistema
datetime: function(data){
    const str = data.substring(0, data.length - 1);
    //console.log(str);
    const str2 = str + ", \"fecha\": \""  + fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear() + "\", \"hora\": \"" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "\"}"
    console.log(str2);
    return str2
},

//Filtrar datos

//Seleccionar un dato en especifico
select: function (req, res, datep, i1, i2){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidas").find({fecha: datep}).skip(i1).limit(i2).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
          db.close();
        });
      });
},


    // Seleccionar todos los datos de un dia
selectData: function(req, res, datep){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidas").find({fecha: datep}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
          db.close();
        });
      });
},

    // Numero de registros en el dia
    selectCount: function (datap){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("medidas").find({fecha:datap}).count({}, function(err, result){
                if(err){
                    console.log("Error")
                }else{
                    console.log(result)
                    total = result
                }
            })
          });
    }
}