#include <SoftwareSerial.h>// Libreria para el serial bluetooth

SoftwareSerial btserial(3, 2); // RX, TX
const int led = 13;
int contador = 0; // el dato dado por el computador
char nombreBT[10] = "TestBlue1";
char velocidad = '4';
char pin[5] = "0000";
long randnum;

void setup() {
  Serial.begin(9600);
  btserial.begin(9600);
  pinMode(led, OUTPUT);
  
  pinMode(led, LOW);
  
  btserial.print("AT");
  delay(1000);
  
  btserial.print("AT+NAME");
  btserial.print(nombreBT);
  delay(1000);
  
  btserial.print("AT+BAUD");
  btserial.print(velocidad);
  delay(1000);
  
  btserial.print("AT+PIN");
  btserial.print(pin);
  delay(1000);

  digitalWrite(led, HIGH);
  randomSeed(analogRead(0));  
}

void loop() {
  String coso;
  randnum = random(0-10);
  coso = "{\"numero\":"+ String(randnum)+"}";
  btserial.println(coso);
  delay(1000);
  
}
