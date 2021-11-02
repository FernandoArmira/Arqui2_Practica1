const express = require('express')

const app = express()

const database = require('./database.js');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 3001)

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})

var estado = 0
var estadosentado =""
var cronometro
var tiempo = "0:0:0"
var contador = 0
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
    console.log(data);
    data = database.datetime(data)
    database.insertData(data)
    database.analyzedata(data)
    estadosilla(data)
    if(estado != 0 && contador == 0){
        if(estado ==1){
            estadosentado = "bien sentado"
        }else if(estado == 2 || estado == 3){
            estadosentado = "mal sentado"
        }
        carga()
        contador++
    } else if(estado != 0 && contador != 0){
        if(estado ==1){
            estadosentado = "bien sentado"
        }else if(estado == 2 || estado == 3){
            estadosentado = "mal sentado"
        }
    }
    else if(estado == 0){
        estadosentado = "no sentado"
        detenerse()
        contador = 0
    }
});

// Funcion que analiza los datos en la coleccion tomadas del dia anterior
//console.log(database.yesterday())
//database.analyzedata("20-9-2021");
//database.analyzedata(database.yesterday());


// Rutas
app.get('/',(req, res ) => {
    res.send("Proyecto 1 Arqui 2")
    // Ingresar datos de prueba a la DB
    //prueba = "{\"sentado\":" + id + ", \"peso\": 150}";
    //console.log(prueba);
    //database.insertData(database.datetime(prueba))    
})

//monitoreo de datos en crudo
app.get('/monitoreo',(req, res ) => {
    database.monitoreo(req,res)
})

//datos tomados por dia /datosdia12-9-2021
app.get('/datosdia:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selectData(req,res, fecha)
})

//datos tomados por mes /datosmes9
app.get('/datosmes:mes',(req, res ) => {
    const {mes} = req.params;
    database.selectDatamonth(req,res, mes)
})

//datos tomados por rango de fecha /datos12-9-2021-15-9-2021
app.get('/datos:rango',(req, res ) => {
    const {rango} = req.params;
    database.selectDatarango(req,res,rango)
})

//datos tomados por rango de hora /rangohora10:10-12:30
app.get('/rangohora:rangohora',(req, res ) => {
    const {rangohora} = req.params;
    database.selectDatarangohour(req,res,rangohora)
})

//datos tomados por rango de hora y una fecha en especifico /rangofechahora10:10-12:30-25-9-2021
app.get('/rangofecha:rangohora',(req, res ) => {
    const {rangohora} = req.params;
    database.selectDatarangohourdate(req,res,rangohora)
})

//Horarios en los que se uso la silla de cada dia /horario12-9-2021
app.get('/horario:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selecthorario(req,res, fecha)
})

//tiempo de uso maximo seguido sin levantarse de la silla por dia
app.get('/maximos',(req, res ) => {
    database.selectmaximo(req,res)
})

//menor tiempo acumulado de uso de la silla por dia
app.get('/acumulados',(req, res ) => {
    database.selectacumulado(req,res)
})

//peso promedio tomado por dia desde dia 1
app.get('/pesopromedio',(req, res ) => {
    database.selectpeso(req,res)
})

//tiempo total de uso de la silla desde el dia 1 hasta el presente
app.get('/totaltiempo',(req, res ) => {
    database.tiempototal(req,res)
})

//promedio veces que se levanto el usuario de la silla por dia
app.get('/levantadaspromedio',(req, res ) => {
    database.promediolevantadas(req,res)
})

//promedio del tiempo que se usa la silla por dia
app.get('/usopromedio',(req, res ) => {
    database.promediotiempousado(req,res)
})

//ultimo dato de peso marcado aunque no este sentado el usuario marcar 0
app.get('/peso',(req, res ) => {
    database.pesoultimodato(req,res)
})

//tiempo total que se usa la silla por dia *
app.get('/tiempouso',(req, res ) => {
    database.tiempousado(req,res)
})

//Registrar datos de la silla
app.post('/addchair', (req, res) => {
    var id = req.body.id
    var ubicacion = req.body.ubicacion
    var user = req.body.user
    res.send('POST request to the homepage');
    console.log("post")
    console.log(id)
    console.log(ubicacion)
    console.log(user)

    dato = "{ \"id\": \"" + id +  "\" ,\"ubicacion\": \"" + ubicacion + "\" ,\"user\": \"" + user +"\"}"

    database.insertConfig(dato)

  });

//Seleccionar la silla por nombre de usuario registrado
app.get('/selectchair:user',(req, res ) => {
    const {user} = req.params;
    database.selectchair(req,res, user)
})

//Tiempo real
app.get('/realtime',(req, res ) => {
    dato = "{\"estado\": \"" + estadosentado + "\", \"tiempo\": \"" + tiempo +"\"}"
    const obj  = JSON.parse(dato);
    res.send(obj)
})

/////////////////////////////////////////////////Funciones tiempo real////////////////////////////////////////

function detenerse(){
    clearInterval(cronometro);
    tiempo="0:0:0"
}


function carga()
{
    contador_s =0;
    contador_m =0;
    cronometro = setInterval(
        function(){
            if(contador_s==60){
                contador_s=0;
                contador_m++;
                //console.log(contador_m);
            if(contador_m==60)
                {
                    contador_m=0;
                }
            }
            //console.log(contador_s);
            //console.log("0:" + contador_m + ":" + contador_s)
            tiempo= "0:" + contador_m + ":" + contador_s
            contador_s++;
        }
        ,1000);
}

function estadosilla(data){
    const obj  = JSON.parse(data);
    //console.log(obj.sentado)
    estado = obj.sentado
    console.log(estado)
}

/*
prueba = "{\"sentado\":" + 0 + ", \"peso\": 160}";
console.log(prueba);
database.insertData(database.datetime(prueba))
database.analyzedata(database.datetime(prueba))
*/

//Pruebas tiemporeal

app.post('/', (req, res) => {
    var id = req.body.id
    prueba = "{\"sentado\":" + id + ", \"peso\": 160}";
    console.log(prueba);
    database.insertData(database.datetime(prueba))
    database.analyzedata(database.datetime(prueba))
    res.send("Dato insertado")
    estadosilla(prueba)
    if(estado != 0 && contador == 0){
        if(estado ==1){
            estadosentado = "bien sentado"
        }else if(estado == 2 || estado == 3){
            estadosentado = "mal sentado"
        }
        carga()
        contador++
    } else if(estado != 0 && contador != 0){
        if(estado ==1){
            estadosentado = "bien sentado"
        }else if(estado == 2 || estado == 3){
            estadosentado = "mal sentado"
        }
    }
    else if(estado == 0){
        estadosentado = "no sentado"
        detenerse()
        contador = 0
    }
});
