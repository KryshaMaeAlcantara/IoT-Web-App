import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, set, ref, get, child} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDG_NeXS3omKKF5bIMT9ebLkZsVb86drCw",
  authDomain: "electrocoagulation-system.firebaseapp.com",
  databaseURL: "https://electrocoagulation-system-default-rtdb.firebaseio.com",
  projectId: "electrocoagulation-system",
  storageBucket: "electrocoagulation-system.appspot.com",
  messagingSenderId: "906878973597",
  appId: "1:906878973597:web:c410e43d2160e3ea4fc674",
  measurementId: "G-D7K8L0ZFKF"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase Realtime Database
  const db = firebase.database();
  
  // Function to send data to Firebase
  function sendDataToFirebase(tag, value) {
    const data = {
      [tag]: value,
    };
    db.ref("CONTROLLERS/").update(data);
  }
  
  // Add your event listeners and button actions here
  // For example:
  
  // -------------------------------- ON/OFF Power Supply ------------------------------------------------------------

  powerSupplySwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToFirebase("P1", valueToSend);
    });

// -------------------------------- ON/OFF Turbidity Sensor ------------------------------------------------------------
    turbiditySensorSwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToFirebase("T1", valueToSend);
    });

// -------------------------------- ON/OFF Turbidity Sensor ------------------------------------------------------------
    solenoidOneSwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToFirebase("S1", valueToSend);
    });

// -------------------------------- ON/OFF Turbidity Sensor ------------------------------------------------------------
    solenoidTwoSwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToFirebase("S2", valueToSend);
    });

// -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------

    let currentNumber = 1; // initialize a variable to store the number
    const minValue = 1;
    const maxValue = 12;
    const maxTValue = 15;
    
    addVoltButton.addEventListener("click", () => {
      if (currentNumber < maxValue) {
        currentNumber++;
        sendDataToFirebase("voltnumber", currentNumber);
      }
    });
    
    minusVoltButton.addEventListener("click", () => {
      if (currentNumber > minValue) {
        currentNumber--;
        sendDataToFirebase("voltnumber", currentNumber);
      }
    });

// -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------

    addTimeButton.addEventListener("click", () => {
    if (currentNumber < maxTValue) {
      currentNumber++;
      sendDataToFirebase("timenumber", currentNumber);
    }
    });

    minusTimeButton.addEventListener("click", () => {
    if (currentNumber > minValue) {
      currentNumber--;
      sendDataToFirebase("timenumber", currentNumber);
    }
    });

    // Create the data to send
    const dataToSend = {
    action: "updateValues", // You can change the action name as needed
    voltage: voltage,
    time: time
    };
    // Send entire object
    sendDataToFirebase("settings", dataToSend);

// -------------------------------- START PAUSE STOP ------------------------------------------------------------

    startButton.addEventListener('click', () => {
    sendDataToFirebase("action", "start");
    });
  
    pauseButton.addEventListener('click', () => {
    sendDataToFirebase("action", "pause");
    });
  
    stopButton.addEventListener('click', () => {
    sendDataToFirebase("action", "stop");
    });
  