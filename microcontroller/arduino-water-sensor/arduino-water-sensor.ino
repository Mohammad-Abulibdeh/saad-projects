#include <LiquidCrystal.h>  // Include the LiquidCrystal library

int waterSensorPin = 7;   // Pin connected to the water level sensor
int piezoPin = 8;         // Pin connected to the piezo buzzer
int waterLevel;           // Variable to store the water sensor reading

// LCD Pins (Adjust these according to your wiring)
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);  // Create an LCD object

void setup() {
  pinMode(waterSensorPin, INPUT);  // Set the water sensor pin as input
  pinMode(piezoPin, OUTPUT);       // Set the piezo pin as output
  pinMode(13, OUTPUT);             // Set pin 13 as output
  
  Serial.begin(9600);              // Start serial communication for debugging
  
  lcd.begin(16, 2);                // Initialize the LCD (16 columns, 2 rows)
  lcd.print("Water Sensor");       // Print a message on the LCD
}

void loop() {
  waterLevel = digitalRead(waterSensorPin); // Read the water sensor state

  if (waterLevel == HIGH) {   // If the sensor detects water
    digitalWrite(piezoPin, HIGH);  // Turn on the piezo buzzer
    digitalWrite(13, HIGH);        // Set pin 13 high
    lcd.clear();                   // Clear the LCD
    lcd.print("Water detected!");  // Print message on LCD
    Serial.println("Water detected!"); // Print a message for debugging
  } else {
    digitalWrite(piezoPin, LOW);   // Turn off the piezo buzzer
    digitalWrite(13, LOW);         // Set pin 13 low
    lcd.clear();                   // Clear the LCD
    lcd.print("No water detected!"); // Print message on LCD
    Serial.println("No water detected!"); // Print a message for debugging
  }

  delay(100); // Short delay to avoid rapid readings
}
