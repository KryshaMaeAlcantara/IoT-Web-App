   //arduino.js
   
   
   // Replace with your actual IP address
    const ws = new WebSocket("ws://192.168.1.100");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      console.log("Received message from ESP32:", event.data);
      // Handle incoming messages here (optional)
      const data = JSON.parse(event.data);
      const sensorValue = data.sensorValue;
      initialValue = `${sensorTS}`;
      finalValue = `${sensorPH}`;
      phValue = `${sensorPH}`;
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
// -------------------------------- ON/OFF Power Supply ------------------------------------------------------------

    powerSupplySwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToESP("P1", valueToSend);
    });

// -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------

    let currentNumberTime = 0;
    let currentNumberVolt = 0;  // initialize a variable to store the number
    const minValue = 1;
    const maxValue = 24;
    const maxTValue = 60;
    
    addVoltButton.addEventListener("click", () => {
      if (currentNumberVolt < maxValue) {
        currentNumberVolt+=8;
        sendDataToESP("voltnumber", currentNumberVolt);
      }
    });
    
    minusVoltButton.addEventListener("click", () => {
      if (currentNumberVolt > minValue) {
        currentNumberVolt-=8;
        sendDataToESP("voltnumber", currentNumberVolt);
      }
    });

// -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------



  addTimeButton.addEventListener("click", () => {
    if (currentNumberTime < maxTValue) {
      currentNumberTime+=10;
      sendDataToESP("timenumber", currentNumberTime);
    }
  });

  minusTimeButton.addEventListener("click", () => {
    if (currentNumberTime > minValue) {
      currentNumberTime-=10;
      sendDataToESP("timenumber", currentNumberTime);
    }
  });

    // Create the data to send
  const dataToSend = {
    action: "updateValues", // You can change the action name as needed
    voltage: voltage,
    time: time
  };

  // Send the data as a JSON string
  ws.send(JSON.stringify(dataToSend));

// -------------------------------- START PAUSE STOP ------------------------------------------------------------


startButton.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 5 }));
});

pauseButton.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 7 }));
});

stopButton.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 9 }));
});
    
    
// -------------------------------- function ------------------------------------------------------------
    function sendDataToESP(tag, value) {
      const data = JSON.stringify({ tag, value });
      ws.send(data);
    }

