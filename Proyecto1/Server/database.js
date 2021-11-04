//Funciones Base de datos

//var dato = "";

//Conexion a BD
//mongodb+srv://fernando:<password>@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://fernando:<password>@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://fernando:ChZIc4DP7SwmWED1@cluster0.tk4g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = "mongodb://fernando:ChZIc4DP7SwmWED1@cluster0-shard-00-00.tk4g5.mongodb.net:27017,cluster0-shard-00-01.tk4g5.mongodb.net:27017,cluster0-shard-00-02.tk4g5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zppbt4-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Conexion a BD")

//pesototal = 0
contador = 0
horainicial = ""
contadorms = 0
horainicialmalsentado = ""
acumuladomalsentado = ""


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
    var fecha = new Date();
    const str = data.substring(0, data.length - 1);

    //console.log(str);
    const str2 = str + ", \"fecha\": \""  + fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear() + "\", \"hora\": \"" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "\"}"
    //console.log(str2);

    return str2
},

/*
today: function(){
  var fecha = new Date();
  const str2 = (fecha.getDate()) + "-" + (fecha.getMonth()+1) + "-" + fecha.getUTCFullYear()
  //console.log(str2);
  return str2
},*/

//Filtrar datos
/*
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
},*/

// Monitoreo de los datos
    monitoreo: function(req, res){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).toArray(function(err, result) {
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

//Seleccionar todos los datos de un mes
selectDatamonth: function(req, res, mes){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).toArray(function(err, result) {
        if (err) throw err;
        var filtro = []
        for(var i=0;i<result.length;i++){
          split1 = ""

          if(result[i].fecha != undefined){
            split1 = result[i].fecha.split("-")
            if(split1[1]==mes){
              //console.log(result[i].fecha)
              //console.log(split1[1])
              filtro.push(result[i])
  
            }
          }
          
        }
        
        res.send(filtro);
        db.close();
      });
    });
},

//Seleccionar los datos por rango de fecha
selectDatarango: function(req, res, fechai, fechaf){
  //console.log(rango)
  rango = fechai + "-" + fechaf
  split0 = rango.split("-")
  dias = (Number(split0[3]) - Number(split0[0])) + ((Number(split0[4]) - Number(split0[1])) * 30)
  //console.log(dias)
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).toArray(function(err, result) {
        if (err) throw err;
        var filtro = []
        for(var i=0;i<result.length;i++){
          split1 = ""

          if(result[i].fecha != undefined){
            split1 = result[i].fecha.split("-")
            diasdb = (Number(split0[3]) - Number(split1[0])) + ((Number(split0[4]) - Number(split1[1])) * 30)

            if(diasdb <= dias && diasdb >=0){
              //console.log(result[i].fecha)
              //console.log(split1[1])
              filtro.push(result[i])
  
            }
          }
          
        }
        
        res.send(filtro);
        db.close();
      });
    });
},

//Seleccionar los datos por rango de hora
selectDatarangohour: function(req, res, horai, horaf){
  //console.log(rango)
  rango = horai + "-" + horaf
  split0 = rango.split("-")
  split0_1 = split0[0].split(":")
  split0_2 = split0[1].split(":")
  tiempo = ((Number(split0_2[0]) - Number(split0_1[0]))*60) + (Number(split0_2[1]) - Number(split0_1[1]))
  //console.log(tiempo)
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).toArray(function(err, result) {
        if (err) throw err;
        var filtro = []
        for(var i=0;i<result.length;i++){
          split1 = ""

          if(result[i].fecha != undefined){
            split1 = result[i].hora.split(":")
            tiempodb = ((Number(split0_2[0]) - Number(split1[0]))*60) + (Number(split0_2[1]) - Number(split1[1]))
            if(tiempodb <= tiempo && tiempodb >=0){
              //console.log(result[i].fecha)
              //console.log(split1[1])
              filtro.push(result[i])
  
            }
          }
          
        }
        
        res.send(filtro);
        db.close();
      });
    });
},

//Seleccionar los datos por rango de hora y una fecha
selectDatarangohourdate: function(req, res, horai, horaf, fecha){
  //console.log(rango)
  rango = horai + "-" + horaf + "-" + fecha
  split0 = rango.split("-")
  split0_1 = split0[0].split(":")
  split0_2 = split0[1].split(":")
  tiempo = ((Number(split0_2[0]) - Number(split0_1[0]))*60) + (Number(split0_2[1]) - Number(split0_1[1]))
  fecha = split0[2] + "-" + split0[3] + "-" + split0[4]
  //console.log(tiempo)
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).toArray(function(err, result) {
        if (err) throw err;
        var filtro = []
        for(var i=0;i<result.length;i++){
          split1 = ""

          if(result[i].fecha != undefined){
            split1 = result[i].hora.split(":")
            tiempodb = ((Number(split0_2[0]) - Number(split1[0]))*60) + (Number(split0_2[1]) - Number(split1[1]))
            if((tiempodb <= tiempo && tiempodb >=0) && result[i].fecha == fecha){
              //console.log(result[i].fecha)
              //console.log(split1[1])
              filtro.push(result[i])
  
            }
          }
          
        }
        
        res.send(filtro);
        db.close();
      });
    });
},

//Analisis de los datos

    analyzedata: function (dato){
      console.log(dato)

      const obj  = JSON.parse(dato);
      //console.log(obj.fecha)
      //console.log(obj.hora)
      
      datap = obj.fecha
      estado = obj.sentado
      peso = obj.peso
      //console.log(estado)
      //console.log(peso)

                maximo = 0
                acumulado = 0
                nlevantamientos = 0
                minfinal = 0

                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                var d = new Date(datap);
                var dayName = days[d.getDay()];
                //console.log(dayName)

                /*split0 = datap.split("-")
                //var dateStr = '9/16/2021';
                var dateStr = split0[1] + "/" + split0[0] + "/" + split0[2];
                var day = getDayName(dateStr, "nl-NL"); // Gives back 'Vrijdag' which is Dutch for Friday.*/
                //console.log(day)

                    if(estado != "0" && contador == 0){
                        //pesototal = pesototal + peso
                        contador = contador + 1
                        horainicial = obj.hora
                        //console.log(horainicial)
                        this.tendenciapeso(datap)
                        this.maximo(datap)
                        this.acumulado(datap)
                        this.nlevantadas(datap)

                        if(estado == 2){
                          horainicialmalsentado = obj.hora
                          contadorms = contadorms + 1
                        }

                      }

                      else if(estado != "0" && contador > 0){
                        //pesototal = pesototal + peso
                        contador = contador + 1
                        //console.log(obj.hora)
                        this.tendenciapeso(datap)
                        this.maximo(datap)
                        this.acumulado(datap)
                        this.nlevantadas(datap)

                        if(estado == 2 && contadorms == 0){
                          horainicialmalsentado = obj.hora
                          contadorms = contadorms + 1
                        }
                        
                        if(estado == 1 && contadorms > 0){
                          contadorms = contadorms + 1
                          horafinalmalsentado = obj.hora

                          //console.log(horafinal)
                          split1 = horainicialmalsentado.split(":")
                          split2 = horafinalmalsentado.split(":")

                          tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                          tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                          tiempototalms = tiempo2 - tiempo1

                          acumuladomalsentado = acumuladomalsentado + tiempototalms

                          horainicialmalsentado = ""
                          contadorms = 0
         
                        }
                      }

                      else if(estado == "0" && contador > 0){
                        //pesototal = pesototal + peso
                        contador = contador + 1
                        horafinal = obj.hora

                        //console.log(horafinal)
                        split1 = horainicial.split(":")
                        split2 = horafinal.split(":")

                        tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                        tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                        tiempototal = tiempo2 - tiempo1 // minutos

                        minfinal = parseInt(split2[1],10)

                        console.log(horafinal)
                        //console.log(tiempototal.toFixed(2))
                        //console.log(contador)

                        dato = "{\"id\": " + 0  + ", \"fecha\": \"" + datap + "\", \"dia\": \"" + dayName + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  (tiempototal/60).toFixed(2)  + "}"
                        //console.log(dato)
                        insertdata2(dato)

                        
                        //pesototal = 0
                        this.tendenciapeso(datap)
                        this.maximo(datap)
                        this.acumulado(datap)
                        this.nlevantadas(datap)

                        if(contadorms > 0){
                          contadorms = contadorms + 1
                          horafinalmalsentado = obj.hora

                          //console.log(horafinal)
                          split1 = horainicialmalsentado.split(":")
                          split2 = horafinalmalsentado.split(":")

                          tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                          tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                          tiempototalms = tiempo2 - tiempo1

                          acumuladomalsentado = acumuladomalsentado + tiempototalms

                          datoms = "{\"id\": " + 0  + ", \"fecha\": \"" + datap + "\", \"dia\": \"" + dayName + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  (tiempototal/60).toFixed(2) + ", \"tiempomalsentado\":" +  (acumuladomalsentado/60).toFixed(4) +"}"
                          //console.log(dato)
                          insertdata3(datoms)

                          horainicialmalsentado = ""
                          contadorms = 0
                          acumuladomalsentado = 0

                        } else if(contadorms == 0){
                          datoms = "{\"id\": " + 0  + ", \"fecha\": \"" + datap + "\", \"dia\": \"" + dayName + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  (tiempototal/60).toFixed(2) + ", \"tiempomalsentado\":" +  (acumuladomalsentado/60).toFixed(4)  +"}"
                          //console.log(dato)
                          insertdata3(datoms)
                          acumuladomalsentado = 0
                        }

                        horainicial = ""
                        contador = 0

                      }
          

    },

    tendenciapeso: function(fechap){
      //console.log(fechap)
      datopeso = ""
      pesototal = 0
      contadorpeso= 0
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("medidas").find( { $or: [{$and: [{sentado: 1}, {fecha:fechap}] }, {$and: [{sentado: 2}, {fecha:fechap}]}, {$and: [{sentado: 3}, {fecha:fechap}]} ] }).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          for(var i=0;i<result.length;i++){
            //console.log(result[i].peso)
            pesototal = pesototal + result[i].peso
            contadorpeso++
          }
          pesototal = pesototal/contadorpeso
          //console.log(pesototal.toFixed(2))
          datopeso = "{\"fecha\": \"" + fechap  + "\", \"peso\": " + pesototal.toFixed(2) + "}"
          //res.send(result);
          //console.log(datopeso)

          dbo.collection("pesopromedio").find({fecha: fechap}).toArray(function(err, result) {
            //console.log(datopeso)
            if (err) throw err;
            //console.log(result);
            //res.send(result);
            if(result.length > 0){
              //console.log("ya existe datos")
              deletepesopromedio(fechap)
              insertpesopromedio(datopeso)
  
            }else{
              //console.log("no existe datos")
              insertpesopromedio(datopeso)
            }
            db.close();
          });
          
        });

      });

    },

    maximo: function(fechap){
      //console.log(fechap)
      max = 0
      day = ""

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("horarios").find({fecha: fechap}).toArray(function(err, result) {
          if (err) throw err;
          for(var i=0;i<result.length;i++){
            day = result[i].dia
            if(result[i].tiempo > max){
              max = result[i].tiempo
            }
          }

          datomax = "{\"fecha\": \"" + fechap + "\", \"dia\": \"" + day + "\", \"maximo\": " + max + "}"
          insertmax(datomax)
          //console.log(result);
          //res.send(result);
          db.close();

        });

      });

    },

    acumulado: function(fechap){
      //console.log(fechap)
      datoacumulado=""
      totalacumulado = 0
      day = ""

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("horarios").find({fecha: fechap}).toArray(function(err, result) {
          if (err) throw err;
          for(var i=0;i<result.length;i++){
            day = result[i].dia
            totalacumulado = totalacumulado + result[i].tiempo
          }

          datoacumulado = "{\"fecha\": \"" + fechap  + "\", \"dia\": \"" + day + "\", \"acumulado\": " + totalacumulado + "}"
          //console.log(datoacumulado)
          dbo.collection("acumulado").find({fecha: fechap}).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            //res.send(result);
            if(result.length > 0){
              //console.log("ya existe datos")
              deleteacumulado(fechap)
              insertacumulado(datoacumulado)
  
            }else{
              //console.log("no existe datos")
              insertacumulado(datoacumulado)
              
            }
            db.close();
          });

        });

      });

    },

    nlevantadas: function(fechap){
      //console.log(fechap)
      datolevantas=""
      levantadas = 0
      day = ""

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("horarios").find({fecha: fechap}).toArray(function(err, result) {
          if (err) throw err;

          levantadas = result.length

          if(result.length > 0){
            day = result[0].dia
          }

          datolevantas = "{\"fecha\": \"" + fechap + "\", \"dia\": \"" + day  + "\", \"nlevantadas\": " + levantadas + "}"
                        
          //console.log(datoacumulado)
          dbo.collection("levantadas").find({fecha: fechap}).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            //res.send(result);
            if(result.length > 0){
              //console.log("ya existe datos")
              deletelevantadas(fechap)
              insertlevantadas(datolevantas)
  
            }else{
              //console.log("no existe datos")
              insertlevantadas(datolevantas)
              
            }
            db.close();
          });
        });

      });

    },

    selecthorario: function(req,res,fechap){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("horarios").find({fecha: fechap}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send(result);
              db.close();
            });
          });

    },

    selectmaximo: function(req,res){
        MongoClient.connect(url, function(err, db) {
            var array = []

            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("maximo").find({dia: 'Sun'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result[0]);
              array[0] = result[0]
              //res.send(result);
            });

            dbo.collection("maximo").find({dia: 'Mon'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[1] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find({dia: 'Tue'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[2] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find({dia: 'Wed'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[3] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find({dia: 'Thu'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[4] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find({dia: 'Fri'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[5] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find({dia: 'Sat'}).sort({maximo: -1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[6] = result[0]
                //res.send(result)
                //res.send(array)
                //db.close();
              });

              dbo.collection("maximo").find().toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                media = (array[0].maximo + array[1].maximo + array[2].maximo + array[3].maximo + array[4].maximo + array[5].maximo)/7
                //console.log(media)
                dato = "{\"media\": " + media.toFixed(2) + "}"
                const obj  = JSON.parse(dato);
                array[7] = obj
                //res.send(result)
                res.send(array)
                db.close();
              });
                
          });

    },

    selectacumulado: function(req,res){
        MongoClient.connect(url, function(err, db) {
            var array = []
            
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("acumulado").find({dia: 'Sun'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result[0]);
              array[0] = result[0]
              //res.send(result);
            });

            dbo.collection("acumulado").find({dia: 'Mon'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[1] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find({dia: 'Tue'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[2] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find({dia: 'Wed'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[3] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find({dia: 'Thu'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[4] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find({dia: 'Fri'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[5] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find({dia: 'Sat'}).sort({acumulado: 1}).limit(1).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                array[6] = result[0]
                //res.send(result);
                //res.send(array)
                //db.close();
              });

              dbo.collection("acumulado").find().toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                media = 0
                for(var i=0;i<result.length;i++){
                    media = media + result[i].acumulado
                }

                //console.log((media/result.length).toFixed(2))

                dato = "{\"media\": " + (media/result.length).toFixed(2) + "}"
                const obj  = JSON.parse(dato);

                array[7] = obj
                //res.send(result);
                res.send(array)
                db.close();
              });
              
          });

    },

    selectpeso: function(req,res){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("pesopromedio").find().toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send(result);
              db.close();
            });
          });

    },

    tiempototal: function(req,res){
        MongoClient.connect(url, function(err, db) {
            tiempototal = 0
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("acumulado").find().sort({fecha: 1}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              //res.send(result);
              tiempototal = 0
              for(var i =0;i<result.length;i++){
                tiempototal = tiempototal + result[i].acumulado
              }
              //console.log(tiempototal)

              res.send("{\"tiempototal\": " + (tiempototal).toFixed(2) + "}")

              db.close();
              
            });

          });

    },

    promediolevantadas: function(req,res){
        MongoClient.connect(url, function(err, db) {
        var array = []
            
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("levantadas").find({dia: 'Sun'}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result[0]);
              total = 0
              dia = "Sun"
              prom = 0
              for(var i =0;i<result.length;i++){
                total = total + result[i].nlevantadas
                dia = result[i].dia
              }
              //console.log(tiempototal)
              prom = (total/result.length).toFixed(2)

              dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"
                
              if(result.length == 0){
                array[0] = null
            }else{
                const obj  = JSON.parse(dato);
                array[0] = obj
            }
              //res.send(array)
            //db.close();
              //res.send(result);
            });
            dbo.collection("levantadas").find({dia: 'Mon'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Mon"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia  +  "\" ,\"promediolevantadas\": " + prom + "}"
  
                  
                if(result.length == 0){
                    array[1] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[1] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("levantadas").find({dia: 'Tue'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Tue"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"
                  
                if(result.length == 0){
                    array[2] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[2] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("levantadas").find({dia: 'Wed'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Wed"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"
     
                  
                if(result.length == 0){
                    array[3] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[3] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("levantadas").find({dia: 'Thu'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Thu"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)

                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"
       

                if(result.length == 0){
                    array[4] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[4] = obj
                }
                  
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("levantadas").find({dia: 'Fri'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Fri"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)

                dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"


                if(result.length == 0){
                    array[5] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[5] = obj
                }
                  
                
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("levantadas").find({dia: 'Sat'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Sat"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].nlevantadas
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"promediolevantadas\": " + prom + "}"
  
                
                if(result.length == 0){
                    array[6] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[6] = obj
                }
                  
                
                //res.send(array)
                //db.close();
                //res.send(result);
              });

              dbo.collection("levantadas").find().toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                media = 0
                for(var i=0;i<result.length;i++){
                    media = media + result[i].nlevantadas
                }

                //console.log((media/result.length).toFixed(2))

                dato = "{\"media\": " + (media/result.length).toFixed(2) + "}"
                const obj  = JSON.parse(dato);

                array[7] = obj
                //res.send(result);
                res.send(array)
                db.close();
              });
        });

    },

    promediotiempousado: function(req,res){
        MongoClient.connect(url, function(err, db) {
        var array = []
            
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("acumulado").find({dia: 'Sun'}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result[0]);
              total = 0
              dia = "Sun"
              prom = 0
              for(var i =0;i<result.length;i++){
                total = total + result[i].acumulado
                dia = result[i].dia
              }
              //console.log(tiempototal)
              prom = (total/result.length).toFixed(2)

              dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"
                
              if(result.length == 0){
                array[0] = null
            }else{
                const obj  = JSON.parse(dato);
                array[0] = obj
            }
              //res.send(array)
            //db.close();
              //res.send(result);
            });
            dbo.collection("acumulado").find({dia: 'Mon'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Mon"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia  +  "\" ,\"tiempopromedio\": " + prom + "}"
  
                  
                if(result.length == 0){
                    array[1] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[1] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Tue'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Tue"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"
                  
                if(result.length == 0){
                    array[2] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[2] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Wed'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Wed"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"
     
                  
                if(result.length == 0){
                    array[3] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[3] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Thu'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Thu"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)

                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"
       

                if(result.length == 0){
                    array[4] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[4] = obj
                }
                  
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Fri'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Fri"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)

                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"


                if(result.length == 0){
                    array[5] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[5] = obj
                }
                  
                
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Sat'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Sat"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total/result.length).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempopromedio\": " + prom + "}"
  
                
                if(result.length == 0){
                    array[6] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[6] = obj
                }
                  
                
                //res.send(array)
                //db.close();
                //res.send(result);
              });

              dbo.collection("acumulado").find().toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                media = 0
                for(var i=0;i<result.length;i++){
                    media = media + result[i].acumulado
                }

                //console.log((media/result.length).toFixed(2))

                dato = "{\"media\": " + (media/result.length).toFixed(2) + "}"
                const obj  = JSON.parse(dato);

                array[7] = obj
                //res.send(result);
                res.send(array)
                db.close();
              });
        });

    },

    pesoultimodato: function(req, res){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("medidas").find( { $or: [ { sentado: 0}, { sentado: 1 }, { sentado: 2 }, { sentado: 3} ] }).sort({fecha: -1}).limit(1).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send("{\"peso\": " + result[0].peso + "}");
              db.close();
            });
          });
    },

    tiempousado: function(req,res){
        MongoClient.connect(url, function(err, db) {
        var array = []
            
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("acumulado").find({dia: 'Sun'}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result[0]);
              total = 0
              dia = "Sun"
              prom = 0
              for(var i =0;i<result.length;i++){
                total = total + result[i].acumulado
                dia = result[i].dia
              }
              //console.log(tiempototal)
              prom = (total).toFixed(2)

              dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"
                
              if(result.length == 0){
                array[0] = null
            }else{
                const obj  = JSON.parse(dato);
                array[0] = obj
            }
              //res.send(array)
            //db.close();
              //res.send(result);
            });
            dbo.collection("acumulado").find({dia: 'Mon'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Mon"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia  +  "\" ,\"tiempototal\": " + prom + "}"
  
                  
                if(result.length == 0){
                    array[1] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[1] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Tue'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Tue"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"
                  
                if(result.length == 0){
                    array[2] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[2] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Wed'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Wed"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"
     
                  
                if(result.length == 0){
                    array[3] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[3] = obj
                }
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Thu'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Thu"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)

                prom = (total).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"
       

                if(result.length == 0){
                    array[4] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[4] = obj
                }
                  
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Fri'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Fri"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total).toFixed(2)

                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"


                if(result.length == 0){
                    array[5] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[5] = obj
                }
                  
                
                //res.send(array)
              //db.close();
                //res.send(result);
              });
              dbo.collection("acumulado").find({dia: 'Sat'}).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                total = 0
                dia = "Sat"
                prom = 0
                for(var i =0;i<result.length;i++){
                  total = total + result[i].acumulado
                  dia = result[i].dia
                }
                //console.log(tiempototal)
                prom = (total).toFixed(2)
  
                dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + "}"
  
                
                if(result.length == 0){
                    array[6] = null
                }else{
                    const obj  = JSON.parse(dato);
                    array[6] = obj
                }
                  
                
                //res.send(array)
                //db.close();
                //res.send(result);
              });

              dbo.collection("acumulado").find().toArray(function(err, result) {
                if (err) throw err;
                //console.log(result[0]);
                media = (array[0].tiempototal + array[1].tiempototal + array[2].tiempototal + array[3].tiempototal + array[4].tiempototal + array[5].tiempototal)/7
                //console.log(media)
                dato = "{\"media\": " + media.toFixed(2) + "}"
                const obj  = JSON.parse(dato);
                array[7] = obj
                //res.send(result)
                res.send(array)
                db.close();
              });
        });

    },

    insertConfig: function(data){
      MongoClient.connect(url,function(err, db){
          if (err) throw err;
          const dbo = db.db('mydb');
          const obj  = JSON.parse(data);
          dbo.collection('configuracion').insertOne(obj, function(err,res){
              if(err) throw err;
              db.close();
          });
      });
  },

  selectchair: function(req, res, user){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("configuracion").find({user: user}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
          db.close();
        });
      });
},

analyzedata2: function (datap){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      
      dbo.collection("medidas").find({fecha: datap}).toArray(function(err, result) {
          if (err) throw err;
          horainicial = ""
          horainicialms = ""
          horafinal = ""
          horafinalms = ""
          estado = "" 
          contador = 0
          contadorms = 0
          acumuladoms = 0
          
          split0 = datap.split("-")

          //var dateStr = '9/16/2021';
          var dateStr = split0[1] + "/" + split0[0] + "/" + split0[2];
          var day = getDayName(dateStr, "nl-NL"); // Gives back 'Vrijdag' which is Dutch for Friday.
          console.log(day)
          

          for(var i =0;i<result.length;i++){
              if(result[i].sentado != "0"){
                  estado = "sentado"
                  console.log(estado)
                  console.log(result[i].hora)
                  horainicial = result[i].hora
                  var j = i + 1

                  if(result[i].sentado == "2"){
                    horainicialms = result[i].hora
                    contadorms = contadorms + 1 
                  }

                  if(j >= result.length){
                      horafinal = horainicial
                  }

                  for(j;j<result.length;j++){
                      if(result[j].sentado == "2" && contadorms == 0){
                        //console.log("aaaa")
                        horainicialms = result[j].hora
                        contadorms = contadorms + 1
                        //console.log(horainicialms)
                        //console.log(contadorms)
                      }
                      if(result[j].sentado == "1" && contadorms > 0){
                        //console.log("bbbb")
                        horafinalms = result[j].hora
                        //console.log("--" + horafinalms)
                        contadorms = contadorms + 1

                        split1 = horainicialms.split(":")
                        split2 = horafinalms.split(":")

                        tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                        tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                        tiempototalms = tiempo2 - tiempo1

                        acumuladoms = acumuladoms + tiempototalms
                        //console.log(acumuladoms)
                        horainicialms = ""
                        contadorms = 0

                      }
                      if(result[j].sentado == "0"){
                          horafinal = result[j-1].hora

                          if(contadorms > 0){
                            horafinalms = result[j-1].hora
                            //console.log("--" + horafinalms)
                            contadorms = contadorms + 1

                            split1 = horainicialms.split(":")
                            split2 = horafinalms.split(":")

                            tiempo1 = (parseInt(split1[0],10)*60) + parseInt(split1[1],10) + (parseInt(split1[2],10)/60)
                            tiempo2 = (parseInt(split2[0],10)*60) + parseInt(split2[1],10) + (parseInt(split2[2],10)/60)
                            tiempototalms = tiempo2 - tiempo1

                            acumuladoms = acumuladoms + tiempototalms
                            //console.log(acumuladoms)
                            horainicialms = ""
                            contadorms = 0

                          }   

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
                  tiempototal = tiempo2 - tiempo1 // minutos

                  console.log(tiempototal.toFixed(2))
                  console.log(acumuladoms.toFixed(2))
                  
                  //console.log(acumuladoms)
                  console.log(contador)

                  //dato = "{\"id\": " + contador  + ", \"fecha\": \"" + result[i].fecha  + "\", \"dia\": \"" + day + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  (tiempototal/60).toFixed(2)  + "}"
                  datoms = "{\"id\": " + contador  + ", \"fecha\": \"" + result[i].fecha + "\", \"dia\": \"" + day + "\", \"horainicial\": \"" + horainicial + "\", \"horafinal\": \"" + horafinal + "\", \"tiempo\":" +  (tiempototal/60).toFixed(2) + ", \"tiempomalsentado\":" +  (acumuladoms/60).toFixed(4)  +"}"
                  insertdata3(datoms)
                  acumuladoms = 0
                  contador++
              }
          }
              
              db.close()
          });
    });

},

tiempototalmalsentado: function(req,res){
  MongoClient.connect(url, function(err, db) {
      tiempototal = 0
      tiempomalsentado = 0
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("horariosmalsentado").find().sort({fecha: 1}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        //res.send(result);
        tiempototal = 0
        tiempomalsentado = 0
        for(var i =0;i<result.length;i++){
          tiempototal = tiempototal + result[i].tiempo
          tiempomalsentado = tiempomalsentado + result[i].tiempomalsentado
        }
        //console.log(tiempototal)

        res.send("{\"tiempototal\": " + (tiempototal).toFixed(2) + ",\"tiempototalmalsentado\": " + (tiempomalsentado).toFixed(2) + "}")

        db.close();
        
      });

    });

},

selecthorariomalsentado: function(req,res,fechap){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("horariosmalsentado").find({fecha: fechap}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
        db.close();
      });
    });

},

tiempousadomalsentado: function(req,res){
  MongoClient.connect(url, function(err, db) {
  var array = []
      
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("horariosmalsentado").find({dia: 'Sun'}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result[0]);
        total = 0
        dia = "Sun"
        prom = 0
        totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"
          
        if(result.length == 0){
          array[0] = null
      }else{
          const obj  = JSON.parse(dato);
          array[0] = obj
      }
        //res.send(array)
      //db.close();
        //res.send(result);
      });
      dbo.collection("horariosmalsentado").find({dia: 'Mon'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Mon"
          prom = 0
          
totalms = 0
for(var i =0;i<result.length;i++){
  total = total + result[i].tiempo
  totalms = totalms + result[i].tiempomalsentado
  dia = result[i].dia
}
//console.log(tiempototal)
prom = (total).toFixed(2)

dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"

            
          if(result.length == 0){
              array[1] = null
          }else{
              const obj  = JSON.parse(dato);
              array[1] = obj
          }
          //res.send(array)
        //db.close();
          //res.send(result);
        });
        dbo.collection("horariosmalsentado").find({dia: 'Tue'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Tue"
          prom = 0
          totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"
            
          if(result.length == 0){
              array[2] = null
          }else{
              const obj  = JSON.parse(dato);
              array[2] = obj
          }
          //res.send(array)
        //db.close();
          //res.send(result);
        });
        dbo.collection("horariosmalsentado").find({dia: 'Wed'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Wed"
          prom = 0
          totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"

            
          if(result.length == 0){
              array[3] = null
          }else{
              const obj  = JSON.parse(dato);
              array[3] = obj
          }
          //res.send(array)
        //db.close();
          //res.send(result);
        });
        dbo.collection("horariosmalsentado").find({dia: 'Thu'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Thu"
          prom = 0
          totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"
 

          if(result.length == 0){
              array[4] = null
          }else{
              const obj  = JSON.parse(dato);
              array[4] = obj
          }
            
          //res.send(array)
        //db.close();
          //res.send(result);
        });
        dbo.collection("horariosmalsentado").find({dia: 'Fri'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Fri"
          prom = 0
          totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"


          if(result.length == 0){
              array[5] = null
          }else{
              const obj  = JSON.parse(dato);
              array[5] = obj
          }
            
          
          //res.send(array)
        //db.close();
          //res.send(result);
        });
        dbo.collection("horariosmalsentado").find({dia: 'Sat'}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          total = 0
          dia = "Sat"
          prom = 0
          totalms = 0
        for(var i =0;i<result.length;i++){
          total = total + result[i].tiempo
          totalms = totalms + result[i].tiempomalsentado
          dia = result[i].dia
        }
        //console.log(tiempototal)
        prom = (total).toFixed(2)

        dato = "{ \"dia\": \"" + dia +  "\" ,\"tiempototal\": " + prom + ",\"tiempototalmalsentado\": " + totalms.toFixed(2) +"}"

          
          if(result.length == 0){
              array[6] = null
          }else{
              const obj  = JSON.parse(dato);
              array[6] = obj
          }
            
          
          //res.send(array)
          //db.close();
          //res.send(result);
        });

        dbo.collection("horariosmalsentado").find().toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0]);
          media = (array[0].tiempototal + array[1].tiempototal + array[2].tiempototal + array[3].tiempototal + array[4].tiempototal + array[5].tiempototal)/7
          //console.log(media)
          dato = "{\"media\": " + media.toFixed(2) + "}"
          const obj  = JSON.parse(dato);
          array[7] = obj
          //res.send(result)
          res.send(array)
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

function insertdata3(data){
  MongoClient.connect(url,function(err, db){
      if (err) throw err;
      const dbo = db.db('mydb');
      const obj  = JSON.parse(data);
      dbo.collection('horariosmalsentado').insertOne(obj, function(err,res){
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
        dbo.collection('maximo').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function insertacumulado(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('acumulado').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function insertpesopromedio(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('pesopromedio').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function deletepesopromedio(date){
  MongoClient.connect(url,function(err, db){
      if (err) throw err;
      const dbo = db.db('mydb');
      dbo.collection('pesopromedio').deleteOne({fecha: date}, function(err,res){
          if(err) throw err;
          db.close();
      });
  });
}


function deleteacumulado(date){
  MongoClient.connect(url,function(err, db){
      if (err) throw err;
      const dbo = db.db('mydb');
      dbo.collection('acumulado').deleteOne({fecha: date}, function(err,res){
          if(err) throw err;
          db.close();
      });
  });
}

function deletelevantadas(date){
  MongoClient.connect(url,function(err, db){
      if (err) throw err;
      const dbo = db.db('mydb');
      dbo.collection('levantadas').deleteOne({fecha: date}, function(err,res){
          if(err) throw err;
          db.close();
      });
  });
}


function insertlevantadas(data){
    MongoClient.connect(url,function(err, db){
        if (err) throw err;
        const dbo = db.db('mydb');
        const obj  = JSON.parse(data);
        dbo.collection('levantadas').insertOne(obj, function(err,res){
            if(err) throw err;
            db.close();
        });
    });
}

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

/*var dateStr = '9/18/2021';
var day = getDayName(dateStr, "nl-NL"); // Gives back 'Vrijdag' which is Dutch for Friday.
console.log(day)*/

/*app.get('/dato:fecha',(req, res ) => {
    const {fecha} = req.params;
    //console.log(fecha)
    database.select(req,res, fecha, 0, 1)
})*/
