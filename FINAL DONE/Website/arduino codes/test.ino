#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <AsyncWebSocket.h> // Replace with your chosen WebSocket library
#include <ArduinoJson.h>   // For JSON parsing

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";

LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pin assignments (adjust as needed)
const int relayPin1 = 2;
const int sensorTS = A0;
const int sensorPH = A1;

AsyncWebSocket ws(81); // Change port if needed

// Variables for LED control and sensor readings
int currentLED = 0;
bool isRunning = false;
int sensorValueTS = 0;
int sensorValuePH = 0;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  ws.onEvent(onWebSocketEvent); // Handle all WebSocket events
  if (!ws.begin()) {
    Serial.println("WebSocket server initialization failed");
  }
  pinMode(pH_Pin, INPUT);
}

void loop() {
  ws.cleanupClients(); // Manage client connections
  handleWebSocketMessages();
  readSensorsAndSendData();
  updateLEDs(); // Perform LED control logic (if applicable)
}

void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("Client connected");
  } else if (type == WS_EVT_DATA) {
    handleWebSocketMessage((char *)data, len);
  }
}

void handleWebSocketMessage(const char *message, size_t length) {
  DynamicJsonDocument doc(100);
  deserializeJson(doc, message);

  const char* tag = doc["tag"];
  int value = doc["value"];

  if (strcmp(tag, "P1") == 0) {
    digitalWrite(relayPin1, value == 0 ? LOW : HIGH);
  } else if (strcmp(tag, "T1") == 0) {
    digitalWrite(relayPin1, value == 0 ? LOW : HIGH);
  } else if (strcmp(tag, "S1") == 0) {
    digitalWrite(relayPin1, value == 0 ? LOW : HIGH);
  } else if (strcmp(tag, "S2") == 0) {
    digitalWrite(relayPin1, value == 0 ? LOW : HIGH);
  } else if (strcmp(tag, "voltnumber") == 0) {
    // Handle voltage adjustments
  } else if (strcmp(tag, "timenumber") == 0) {
    // Handle time adjustments
  } else if (strcmp(tag, "action") == 0) {
    if (strcmp(value, "start") == 0) {
      startLEDs();
    } else if (strcmp(value, "pause") == 0) {
      pauseLEDs();
    } else if (strcmp(value, "stop") == 0) {
      stopLEDs();
    }
  }
}

void readSensorsAndSendData() {
  sensorValueTS = analogRead(sensorTS);
  sensorValuePH = analogRead(sensorPH);
  float pH = mapFloat(Voltage, 0.0, 2.64, 0.0, 7.0);

  DynamicJsonDocument doc(100);
  doc["sensorTS"] = sensorValueTS;
  doc["sensorPH"] = pH;
  String jsonString;
  serializeJson(doc, jsonString);
  ws.textAll(jsonString);

  delay(1000); // Adjust sensor reading frequency
}


// Debounce function for button reads
boolean debounceRead(int pin) {
  unsigned long currentTime = millis();
  if ((digitalRead(pin) == LOW) && (currentTime - lastDebounceTime1 >= debounceDelay)) {
    lastDebounceTime1 = currentTime;
    return true;
  }
  return false;
}

// LED control functions (implement as needed)
void startLEDs() {
  // ...
  currentLED = 0;
  isRunning = true;
}

void pauseLEDs() {
  // ...
   isRunning = false;
}

void stopLEDs() {
  // ...
  isRunning = false;
  currentLED = 0;
  led1State = LOW;
  led2State = LOW;
  led3State = LOW;
}

void updateLEDs() {
  // ...

}