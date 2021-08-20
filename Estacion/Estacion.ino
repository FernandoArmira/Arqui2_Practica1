#include "DHT.h"

#define DHTPIN 7     // Pin donde está conectado el sensor

#define DHTTYPE DHT11   // Descomentar si se usa el DHT 11
//#define DHTTYPE DHT22   // Sensor DHT22

DHT dht(DHTPIN, DHTTYPE);
float wind_speed = 0;
float wind_conversion = 169.0/132; // 1.60934 (Millas to Km) * 3.3544 (Slope of wind formula) * (5.0 / 1023) (read analog voltage)
int analog_wind_speed = A0;
int analog_1 = A1;
int analog_2 = A2;
int analog_3 = A3;
int analog_4 = A4;
int grados = -1;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(analog_wind_speed, INPUT);
  pinMode(analog_1, INPUT);
  pinMode(analog_2, INPUT);
  pinMode(analog_3, INPUT);
  pinMode(analog_4, INPUT);
}
void loop() {
  delay(1000);
  
  int dir_1  = analogRead(analog_1);
  int dir_2  = analogRead(analog_2);
  int dir_3  = analogRead(analog_3);
  int dir_4  = analogRead(analog_4);

  if(dir_1 > 10){
    grados = 0;
  }else if(dir_2 > 10){
    grados = 90;
  }else if(dir_3 > 10){
    grados = 180;
  }else if(dir_4 > 10){
    grados = 270;
  }else{
    grados = -1;
  }

  //Serial.println(grados);
  int voltage = analogRead(analog_wind_speed);
  wind_speed = (voltage * wind_conversion + 3.753);// *  1.60934;
  if(wind_speed == 3.753){
    wind_speed = 0;
  }
  
  float h = dht.readHumidity(); //Leemos la Humedad
  float t = dht.readTemperature(); //Leemos la temperatura en grados Celsius
  float f = dht.readTemperature(true); //Leemos la temperatura en grados Fahrenheit

  String coso = "{\"temperatura\":"+ String(t)+ ", \"viento\":" + wind_speed + ", \"humedad\": " + String(h) + ", \"direccion\": " + String(grados) + "}";
  //--------Enviamos las lecturas por el puerto serial-------------
  Serial.println(coso);
}
