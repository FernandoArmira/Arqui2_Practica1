const express = require('express')
const cors = require("cors");

const app = express()

const database = require('./database.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


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
//const port = new SerialPort('COM4',{baudRate: 9600});
//const parser = port.pipe(new ReadLine({delimiter: '\n'}));

//Lectura de datos enviados de arduino
// port.on("open",() => {
//     console.log('Se abrio la comunicacion');
// });


//{"_id":"61403a8b77ac53dfb02c1b83","sentado":1,"peso":157.34,"fecha":"14-9-2021","hora":"0:0:42"}



// Rutas
app.get('/',(req, res ) => {
    res.send("Proyecto 1 Arqui 2")
})

app.get('/dato',(req, res ) => {
    database.select(req,res, "14-9-2021", 0, 1)
})

app.get('/datosdia',(req, res ) => {
    database.selectData(req,res, "14-9-2021")
})

app.get('/monitoreo',(req, res ) => {
    database.monitoreo(req,res)
});

app.get('/acumulados',(req, res ) => {
    database.selectacumulado(req,res)
});

app.get('/maximos',(req, res ) => {
    database.selectmaximo(req,res)
});

app.get('/peso',(req, res ) => {
    database.selectpeso(req,res)
});

//tiempo total de uso de la silla desde el dia 1 hasta el presente
app.get('/totaltiempo',(req, res ) => {
    database.tiempototal(req,res)
})

//peso promedio tomado por dia
app.get('/pesopromedio',(req, res ) => {
    database.selectpeso(req,res)
})

app.get('/tiempouso',(req, res ) => {
    database.tiempousado(req,res)
})

//veces que se levanto el usuario de la silla por dia

// app.get('/levantadas',(req, res ) => {
//     database.selectnlevantadas(req,res)
// })

app.get('/promediolevantadas',(req, res ) => {
    database.promediolevantadas(req,res)
})

//promedio del tiempo que se uso la silla por dia
app.get('/promediouso',(req, res ) => {
    database.promediotiempousado(req,res)
})

app.get('/levantadaspromedio',(req, res ) => {
    database.promediolevantadas(req,res)
})

app.post('/historialuso',(req, res ) => {
    //console.log(req.body)
    database.horariouso(req,res)
})

app.post('/historialuso2',(req, res ) => {
    console.log(req.body)
    database.selecthorario(req,res)
})


//Registrar datos de la silla
app.post('/addchair', (req, res) => {
    var id = req.body.id
    var ubicacion = req.body.ubicacion
    var user = req.body.user
    res.send('POST request to the homepage');
    //console.log("post")
    //console.log(id)
    //console.log(ubicacion)
    //console.log(user)

    dato = "{ \"id\": \"" + id +  "\" ,\"ubicacion\": \"" + ubicacion + "\" ,\"user\": \"" + user +"\"}";

    //console.log(dato)

    database.insertConfig(dato)

  });

//Seleccionar la silla por nombre de usuario registrado
app.get('/selectchair:user',(req, res ) => {
    const {user} = req.params;
    database.selectchair(req,res, user)
})

app.post('/selectsilla',(req, res ) => {
    //const {user} = req.params;
    database.selectsilla(req,res)
})

//Tiempo real
app.get('/realtime',(req, res ) => {
    dato = "{\"estado\": \"" + estadosentado + "\", \"tiempo\": \"" + tiempo +"\"}"
    const obj  = JSON.parse(dato);
    res.send(obj)
})



///////////////////////////////////ENDPOINTS PROYECTO 2//////////////////////////////////////////////////

//FILTRO DE DATOS
//datos tomados por mes /datosmes9
app.get('/datosmes:mes',(req, res ) => {
    const {mes} = req.params;
    database.selectDatamonth(req,res, mes)
})

app.post('/rangohora',(req, res ) => {
    var horai = req.body.horai
    var horaf = req.body.horaf
    database.selectDatarangohour(req,res,horai,horaf)
})

app.get('/malsentadototal',(req, res ) => {
    database.tiempototalmalsentado(req,res)
})

app.get('/malsentadotiempouso',(req, res ) => {
    database.tiempousadomalsentado(req,res)
})

app.get('/malsentadohorario:fecha',(req, res ) => {
    const {fecha} = req.params;
    database.selecthorariomalsentado(req,res, fecha)
})