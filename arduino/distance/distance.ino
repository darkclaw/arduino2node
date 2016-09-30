// distance.ino

const int trigPin = 7;
const int echoPin = 8;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, cm;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);

  //print to serial
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
