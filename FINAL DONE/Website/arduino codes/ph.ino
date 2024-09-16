#include <ESP8266WiFi.h> // Include the WiFi library for ESP8266 boards
#include <WiFiClient.h>
#include <WebServer.h>
#include <AsyncWebSocket.h> // Use AsyncWebSocket for better performance

// Replace with your WiFi credentials
const char* ssid = "your_ssid";
const char* password = "your_password";

const char* websocket_server_ip = "your_websocket_server_ip"; // Replace with your server IP
const int websocket_server_port = 80; // Replace with your server port

AsyncWebSocket ws(0); // Create an AsyncWebSocket object

// Function to send data to the WebSocket server
void sendWebSocketMessage(String message) {
  if (ws.isConnected()) {
    ws.textAll(message); // Send the message to all connected clients
  }
}

// Calibration value: pH at 2.5 volts (Intercept)
float calibration_value = 7.0;
// Slope of the line (Change in pH per change in Voltage)
float slope = -7.0 / 2.5;

int phval = 0;
unsigned long int avgval;
int buffer_arr[10], temp;

float ph_act;

void setup() {
  Serial.begin(9600);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  // Start the WebSocket server
  ws.onConnect([](AsyncWebSocket* ws, WStype_t type, uint32_t webSocketId) {
    if (type == WStype_CONNECT) {
      Serial.printf("WebSocket connection from client %u\n", webSocketId);
    }
  });
  ws.onText([](AsyncWebSocket* ws, char* buf, size_t len, uint32_t webSocketId) {
    // Handle incoming messages from clients (if applicable)
  });
  ws.onDisconnect([](AsyncWebSocket* ws, uint32_t webSocketId, uint8_t code, char reason[]) {
    Serial.printf("WebSocket disconnect from client %u\n", webSocketId);
  });
  ws.onError([](AsyncWebSocket* ws, uint16_t code, String reason) {
    Serial.printf("WebSocket error: code %u, reason: %s\n", code, reason.c_str());
  });
  if (!ws.beginServer(websocket_server_port)) {
    Serial.println("WebSocket server failed to start");
  }

  // ... rest of your setup code ...
}

void loop() {
  ws.loop(); // Handle WebSocket connections in the background

  // ... rest of your loop code ...

  // Check if it's time to update the pH value
  if (millis() - previousMillis >= interval) {
    previousMillis = millis();

    // ... rest of your pH measurement and calculation code ...

    // Send the pH value to the WebSocket server
    String message = "pH:";
    message += String(ph_act);
    sendWebSocketMessage(message);
  }
}
