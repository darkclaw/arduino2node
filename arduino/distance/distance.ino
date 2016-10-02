// distance.ino

#include <SPI.h>
#include <Ethernet.h>

const int trigPin = 7;
const int echoPin = 8;

// server address
IPAddress server(192, 168, 0, 100);

// client (arduino) mac and ip address
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 177);

// Initialize the Ethernet client library
EthernetClient client;

void setup() {
  Serial.begin(9600);

  // set modes for sensor pins
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Ethernet.begin(mac, ip);
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("connecting...");

  if (client.connect(server, 4000)) {
    Serial.println("connected");
  } else {
    Serial.println("connection failed");
  }

  delay(1000);
}

void loop() {
  long duration, cm;

  if (!client.connected()) {
    // do nothing forevermore:
    while (true);
  }

  //get sensor data
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);

  //print to ethernet client
  client.print("{\"distance\":" + String(cm) + ",\"unit\":\"cm\"}");

  delay(1000);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
