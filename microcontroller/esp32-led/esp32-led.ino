#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";         // Your Wi-Fi SSID
const char* password = "YOUR_WIFI_PASSWORD"; // Your Wi-Fi password

const int ledPin = 2;  // Define the pin where the LED is connected

WebServer server(80);  // Create a web server on port 80

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);

  // Wait for the connection to establish
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Print the IP address
  Serial.println("Connected to Wi-Fi");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize the LED pin
  pinMode(ledPin, OUTPUT);

  // Serve the toggle LED request
  server.on("/toggle", HTTP_GET, [](){
    int state = digitalRead(ledPin);
    digitalWrite(ledPin, !state);  // Toggle the LED state
    server.send(200, "text/plain", "LED Toggled");
  });

  // Start the web server
  server.begin();
}

void loop() {
  // Handle client requests
  server.handleClient();
}
