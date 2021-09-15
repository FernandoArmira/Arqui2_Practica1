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

//Cal
yesterday: function(){

    const str2 = (fecha.getDate()-1) + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear()
    //console.log(str2);
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

    analyzedata: function (datap){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");

            dbo.collection("horarios").find({fecha: datap}).toArray(function(err, res) {
                if (err) throw err;
                //console.log(res.length);
            
            if(res.length == 0){

            dbo.collection("medidas").find({fecha: datap}).toArray(function(err, result) {
                if (err) throw err;
                horainicial = ""
                horafinal = ""
                estado = "" // si esta bien o mal sentado
                contador = 0
                maximo = 0
                for(var i =0;i<result.length;i++){
                    if(result[i].sentado != "0"){
                        estado = "sentado"
                        console.log(estado)
                        console.log(result[i].hora)
                        horainicial = result[i].hora
                        var j = i + 1

                        if(j >= result.length){
                            horafinal = horainicial
                        }

                        for(j;j<result.length;j++){
                            if(result[j].sentado == "0"){
                                horafinal = result[j-1].hora
                                i = j
                                j = result.length
                            }
                            if(j == (result.length-1)){
                                horafinal = result[result.length-1].hora
                                i = j
                            }
                            
                        }
          

                        console.log(horafinal)
                        split1 = horainicial.split(":")
                        split2 = horafinal.split(":")

                        tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                        tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                        tiempototal = tiempo2 - tiempo1
                        console.log(tiempototal.toFixed(2))
                        console.log(contador)

                        dato = "{\"id\": " + contador  + ", \"fecha\": \"" + result[i].fecha  + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  tiempototal.toFixed(2)  + "}"
                        insertdata2(dato)
                        contador++
                    }
                }
                    //console.log(result.length)
                    db.close()
                });
            }
                
            }); 

          });

    },

    selecthorario: function(req,res,fechap){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("horarios").find({fecha: fechap}).sort({id: 1}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send(result);
              db.close();
            });
          });

    }



}


function insertdata2(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('horarios').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function insertmax(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('maximos').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}


/*app.get('/dato:fecha',(req, res ) => {
    const {fecha} = req.params;
    //console.log(fecha)
    database.select(req,res, fecha, 0, 1)
})*/
