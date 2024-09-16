#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Define the LCD properties
#define LCD_ADDRESS 0x27  // I2C address of your LCD module
#define LCD_COLUMNS 16    // Number of columns in the LCD
#define LCD_ROWS 2        // Number of rows in the LCD

LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLUMNS, LCD_ROWS);

unsigned long previousMillis = 0;
const long interval = 500;  // Interval in milliseconds

// Calibration value: pH at 2.5 volts (Intercept)
float calibration_value = 7.0;
// Slope of the line (Change in pH per change in Voltage)
float slope = -7.0 / 2.5;

int phval = 0;
unsigned long int avgval;
int buffer_arr[10], temp;

float ph_act;

void setup() {
  Wire.begin();
  Serial.begin(9600);

  // Initialize LCD
  lcd.begin();
  lcd.backlight();
}

void loop() {
  unsigned long currentMillis = millis();

  // Check if it's time to update the pH value
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    for (int i = 0; i < 10; i++) {
      buffer_arr[i] = analogRead(A0);
      delay(30);
    }

    for (int i = 0; i < 9; i++) {
      for (int j = i + 1; j < 10; j++) {
        if (buffer_arr[i] > buffer_arr[j]) {
          temp = buffer_arr[i];
          buffer_arr[i] = buffer_arr[j];
          buffer_arr[j] = temp;
        }
      }
    }

    avgval = 0;
    for (int i = 2; i < 8; i++)
      avgval += buffer_arr[i];

    float volt = (float)avgval * 5.0 / 1024 / 6;
    // Use the corrected formula
    ph_act = slope * (volt - 2.5) + calibration_value;

    Serial.print("Voltage: ");
    Serial.print(volt);
    Serial.print("V, pH: ");
    Serial.println(ph_act);

    // Display pH value on LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("pH: ");
    lcd.print(ph_act);

    // Check pH range and display corresponding message
    lcd.setCursor(0, 1);
    if (ph_act >= 0 && ph_act <= 5.5) {
      lcd.print("BAD (Acidic)");
    } else if (ph_act >= 5.6 && ph_act <= 9) {
      lcd.print("GOOD WATER");
    } else if (ph_act >= 9.1 && ph_act <= 14) {
      lcd.print("BAD (Untreated)");
    } else {
      lcd.print("Out of readable measurement");
    }
  }
}