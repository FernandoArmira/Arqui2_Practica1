//Librerias
import java.applet.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;
import java.text.*;
import processing.net.*;
import meter.*; // Para utilizar la grafica de velocidad
import org.firmata.*;
import cc.arduino.*;
import processing.serial.*;
import cc.arduino.*;

/*
VARIABLES PARA GRAFICAR LA VELOCIDAD Y HUMEDAD
*/
Meter m, m2;

/*
VARIABLES PARA LA GRAFICA DE TEMPERATURA
*/
PFont font, font2, font3;

color colorRed=color(255, 0, 0);
int mt=-10, n=0;
int tempInt=0;
String whatClientSaid,tempString="0";

/*
VARIABLE PARA LA GRAFICA DIRECCION
*/
float coordenada; //el valor de la coordenada
float CompassMagnificationFactor=0.35; 
float SpanAngle=120; 
int NumberOfScaleMajorDivisions; 
int NumberOfScaleMinorDivisions; 

/*
VARIABLES PARA JSON
*/
String [] text;
JSONObject json;
float temperatura = 0;
float viento = 0;
float humedad = 0;
float direccion = 0;

void setup(){
  /*
   GRAFICA DE VELOCIDAD Y HUMEDAD
  */
  size(1050, 600);
  background(150); 
  
  m = new Meter(this, 120, 10);
  m.setTitleFontName("Arial bold");
  m.setTitle("Velocidad del Viento (Km)");
  m.setDisplayDigitalMeterValue(true);
  
  // Meter Scale
  String[] scaleLabelsT = {"0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120"};
  m.setScaleLabels(scaleLabelsT);
  m.setScaleFontSize(18);
  m.setScaleFontName("Times New Roman bold");
  m.setScaleFontColor(color(100, 130, 170));
  
  m.setArcColor(color(141, 113, 718));
  m.setArcThickness(10);
  m.setMaxScaleValue(80);
  
  m.setNeedleThickness(3);
  
  m.setMinInputSignal(0);
  m.setMaxInputSignal(80);
  
  //Humedad
  int mx = m.getMeterX();
  int my = m.getMeterY();
  int mw = m.getMeterWidth();
  
  m2 = new Meter(this, mx + mw + 20, my);
  m2.setTitleFontSize(20);
  m2.setTitleFontName("Arial bold");
  m2.setTitle("Humedad (%)");
  m2.setDisplayDigitalMeterValue(true);
  
  String[] scaleLabelsH = {"0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"};
  m2.setScaleLabels(scaleLabelsH);
  m2.setScaleFontSize(18);
  m2.setScaleFontName("Times New Roman bold");
  m2.setScaleFontColor(color(100, 130, 170));
  
  m2.setArcColor(color(141, 113, 718));
  m2.setArcThickness(10);
  m2.setMaxScaleValue(100);
  
  m2.setNeedleThickness(3);
  
  m2.setMinInputSignal(0);
  m2.setMaxInputSignal(100);
  
  /*
  GRAFICA DE TEMPERATURA
  */
  
  strokeWeight(2);  // Stroke weight to 8 pixels
  fill(255, 255, 255);              // Color Blanco
  arc(50, 40, 32, 32, PI, TWO_PI);
  ellipse(50, 260, 60, 60);
  line(34, 40, 34, 236);
  line(66, 40, 66, 236);
  noStroke();
  rect(35, 40, 30, 220);
  fill(255, 0, 0);              // Color Rojo
  ellipse(50, 260, 58, 58);   // Circulo
  rect(35, 231, 30, 10);
  stroke(0);
  strokeWeight(3);
  smooth();
  fill(0);
  textSize(14);
  text("TERMÓMETRO", 6, 20);
  textSize(12);
  
  do
  {
    if (n%2==0)
    {
      line(65, 229-n, 55, 229-n); 
      text(mt, 70, 232-n);
    }
    else
    {
      line(65, 229-n, 60, 229-n);
      text(mt, 70, 232-n);
    }
    n+=15;
    mt+=5;
  }
  while ( n<190);
  
  //rectMode(CENTER);
  
  /*
  VALORES DE NODE
  */
  
  text = loadStrings("http://localhost:3000/");
  if(text.length > 0){
    json = parseJSONObject(text[0]);
    if(!json.isNull("temperatura")){
    temperatura = json.getFloat("temperatura");
    }  
    if(!json.isNull("viento")){
    viento = json.getFloat("viento");
    }
    if(!json.isNull("humedad")){
    humedad = json.getFloat("humedad");
    }
    if(!json.isNull("direccion")){
    direccion = json.getFloat("direccion");
    }
  }
  
}

void draw(){
  /*
  VALORES DE NODE
  */
   text = loadStrings("http://localhost:3000/");
  if(text.length > 0){
    json = parseJSONObject(text[0]);
    if(!json.isNull("temperatura")){
    temperatura = json.getFloat("temperatura");
    }  
    if(!json.isNull("viento")){
    viento = json.getFloat("viento");
    }
    if(!json.isNull("humedad")){
    humedad = json.getFloat("humedad");
    }
    if(!json.isNull("direccion")){
    direccion = json.getFloat("direccion");
    }
  }
  
  
  //Valores Random
  int value = (int)viento; //(int)random(0,80);
  int value2 = (int)humedad;
  m.updateMeter(value);
  m2.updateMeter(value2);
  
  //Dibujando Termometro
  color CRed, CYellow, CGreen;
  noStroke();
  fill(255);
  rect(35, 40, 30, 194);
  fill(colorRed);
  ellipse(50, 260, 50, 50); 
  tempInt=(int)temperatura;
  int tope=(-tempInt*3)-36;
  if(tope<=-194) tope=-194;
  rect(35, 234, 30,tope );
  stroke(0);
  fill(0);
  tempString = "" + tempInt;
  text(tempString+"ºC", 39, 265);
  stroke(0);
  strokeWeight(3);
  smooth();
  fill(0);
  n=0;
  
  do
  {
    if (n%2==0)
    {
      line(65, 229-n, 55, 229-n);
    }
    else
    {
      line(65, 229-n, 60, 229-n);
    }
    n+=15;
  }
  while ( n<190);
  
  /*
  AREA PARA LA GRAFICA DE DIRECCIONES
  */
  coordenada = direccion;
  Compass();
  delay(500);
}

void Compass() 
{ 
  //rectMode(CENTER);
  translate(440, 440); 
  scale(CompassMagnificationFactor); 
  noFill(); 
  stroke(100); 
  strokeWeight(80); 
  ellipse(0, 0, 750, 750); 
  strokeWeight(50); 
  stroke(50); 
  fill(0, 0, 40); 
  ellipse(0, 0, 610, 610); 
  for (int k=255;k>0;k=k-5) 
  { 
    noStroke(); 
    fill(0, 0, 255-k); 
    ellipse(0, 0, 2*k, 2*k); 
  } 
  strokeWeight(20); 
  NumberOfScaleMajorDivisions=18; 
  NumberOfScaleMinorDivisions=36;  
  SpanAngle=180; 
  CircularScale(); 
  rotate(PI); 
  SpanAngle=180; 
  CircularScale(); 
  rotate(-PI); 
  fill(255); 
  textSize(60); 
  textAlign(CENTER); 
  text("W", -425, -30, 100, 80); 
  text("E", 320, -30, 100, 80); 
  text("N", -50, -395, 100, 80); 
  text("S", -50, 345, 100, 80); 
  textSize(30); 
  text("DIRECCION DEL VIENTO", -240, -130, 500, 80); 
  rotate(PI/4); 
  textSize(40); 
  text("NW", -405, 0, 100, 50); 
  text("SE", 335, 0, 100, 50); 
  text("NE", 0, -385, 100, 50); 
  text("SW", 0, 335, 100, 50); 
  rotate(-PI/4); 
  CompassPointer(); 
}

void CompassPointer() 
{ 
  rotate(PI+radians(coordenada));  
  stroke(0); 
  strokeWeight(4); 
  fill(100, 255, 100); 
  triangle(-20, -210, 20, -210, 0, 270); 
  triangle(-15, 210, 15, 210, 0, 270); 
  ellipse(0, 0, 45, 45);   
  fill(0, 0, 50); 
  noStroke(); 
  ellipse(0, 0, 10, 10); 
  triangle(-20, -213, 20, -213, 0, -190); 
  triangle(-15, -215, 15, -215, 0, -200); 
  rotate(-PI-radians(coordenada)); 
}

void CircularScale() 
{ 
  float GaugeWidth=800;  
  textSize(GaugeWidth/30); 
  float StrokeWidth=1; 
  float an; 
  float DivxPhasorCloser; 
  float DivxPhasorDistal; 
  float DivyPhasorCloser; 
  float DivyPhasorDistal; 
  strokeWeight(2*StrokeWidth); 
  stroke(255);
  float DivCloserPhasorLenght=GaugeWidth/2-GaugeWidth/9-StrokeWidth; 
  float DivDistalPhasorLenght=GaugeWidth/2-GaugeWidth/7.5-StrokeWidth;
  for (int Division=0;Division<NumberOfScaleMinorDivisions+1;Division++) 
  { 
    an=SpanAngle/2+Division*SpanAngle/NumberOfScaleMinorDivisions;  
    DivxPhasorCloser=DivCloserPhasorLenght*cos(radians(an)); 
    DivxPhasorDistal=DivDistalPhasorLenght*cos(radians(an)); 
    DivyPhasorCloser=DivCloserPhasorLenght*sin(radians(an)); 
    DivyPhasorDistal=DivDistalPhasorLenght*sin(radians(an));   
    line(DivxPhasorCloser, DivyPhasorCloser, DivxPhasorDistal, DivyPhasorDistal); 
  }
  DivCloserPhasorLenght=GaugeWidth/2-GaugeWidth/10-StrokeWidth; 
  DivDistalPhasorLenght=GaugeWidth/2-GaugeWidth/7.4-StrokeWidth;
  for (int Division=0;Division<NumberOfScaleMajorDivisions+1;Division++) 
  { 
    an=SpanAngle/2+Division*SpanAngle/NumberOfScaleMajorDivisions;  
    DivxPhasorCloser=DivCloserPhasorLenght*cos(radians(an)); 
    DivxPhasorDistal=DivDistalPhasorLenght*cos(radians(an)); 
    DivyPhasorCloser=DivCloserPhasorLenght*sin(radians(an)); 
    DivyPhasorDistal=DivDistalPhasorLenght*sin(radians(an)); 
    if (Division==NumberOfScaleMajorDivisions/2|Division==0|Division==NumberOfScaleMajorDivisions) 
    { 
      strokeWeight(15); 
      stroke(0); 
      line(DivxPhasorCloser, DivyPhasorCloser, DivxPhasorDistal, DivyPhasorDistal); 
      strokeWeight(8); 
      stroke(100, 255, 100); 
      line(DivxPhasorCloser, DivyPhasorCloser, DivxPhasorDistal, DivyPhasorDistal); 
    } 
    else 
    { 
      strokeWeight(3); 
      stroke(255); 
      line(DivxPhasorCloser, DivyPhasorCloser, DivxPhasorDistal, DivyPhasorDistal); 
    } 
  } 
}
