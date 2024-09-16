import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, set, ref, get, child, onValue, update, push} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

function getEmailAndPasswordFromURL(url) {
  // Get the query string part of the URL
  const queryString = url.split('?')[1];
  if (!queryString) {
      return null; // No query string found
  }

  // Split the query string into individual parameters
  const queryParams = new URLSearchParams(queryString);

  // Extract email and password parameters
  const email = queryParams.get('email');
  const password = queryParams.get('password');

  return { email, password };
}

const userName = document.getElementById("userName");
const currentURL = window.location.href;
const credentials = getEmailAndPasswordFromURL(currentURL);
let currentUser;



// Log the extracted credentials
if (credentials) {
    console.log("Email:", credentials.email);
    console.log("Password:", credentials.password);

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User signed in:', user.uid);

            const userData = {
                email: user.email
            };

            if (user.email !== "admin@gmail.com") {
              const dbRef = ref(db, 'users/' + user.uid); // Path to the user node
              
              // Check if the node already exists
              get(dbRef)
                  .then((snapshot) => {
                      if (snapshot.exists()) {
                          console.log("User node already exists in the database.");
                      } else {
                          // Node doesn't exist, create it
                          set(dbRef, userData)
                              .then(() => {
                                  console.log("User node created in the database.");
                              })
                              .catch((error) => {
                                  console.error("Error creating user node:", error);
                              });
                      }
                  })
                  .catch((error) => {
                      console.error("Error checking if user node exists:", error);
                  });
            } else {
                console.log("Admin user. Skipping creation of node.");
            }
            userName.innerText = user.email;

            currentUser = user.uid;
            

            // Store user authentication state in session storage
            sessionStorage.setItem("user", JSON.stringify(user));
            userName.innerText = user.email;


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
        });
} else {
  console.log("No email and password found in the URL.");

  // Retrieve user authentication state from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
      userName.innerText = user.email;
      currentUser = user.uid;
      
  } else {
      // Redirect user to sign-in page if not authenticated
      window.location.href = "signin.html";
  }
}



var userCurrent = currentUser;

console.log("Sana lumabas", userCurrent );

if (currentUser) {
  // User is signed in
  console.log("Current user email:", currentUser);
} else {
  // No user is signed in
  console.log("No user signed in.");
}

  

submitButton.addEventListener('click', function() {
  // Get input values
  const run = parseInt(document.getElementById("rn").value);
  const cycle = parseInt(document.getElementById("cn").value);
  const date = new Date().toISOString().replace(/[.#$\/\[\]]/g, '-');
  const dateSave = document.getElementById("dnt").value.replace(/[.#$\/\[\]]/g, '-');
  const beforeTurbidityLevel = parseInt(document.getElementById("beforeTblvl").value);
  const afterTurbidityLevel = parseInt(document.getElementById("afterTblvl").value);
  const phLevel = parseInt(document.getElementById("phlvl").value);

  const month = new Date().getMonth() + 1; 
  const nodeName = `${month}`;
  
  let voltage, treatmentTime;

  // Determine mode and get voltage/time values
  if (modeOperationSwitch.checked) {
    voltage = voltValue; // Assuming `voltValue` is defined elsewhere
    treatmentTime = timeValue; // Assuming `timeValue` is defined elsewhere
  } else {
    voltage = vlInput.value;
    treatmentTime = ttlInput.value;
  }

  // Get current Unix timestamp in milliseconds
  const timestamp = Date.now();
  const key = timestamp.toString(); // Convert timestamp to string
  
  // Create data object for Firebase
  const data = {
    run,
    cycle,
    dateSave,
    beforeTurbidityLevel,
    afterTurbidityLevel,
    phLevel,
    voltage,
    treatmentTime,
    mode: modeOperationSwitch.checked ? "Manual" : "Automatic"
  };
  
  const user = currentUser;
  const adminId = "gqUYWuveBZc0WIG8fFWSmQlMQDC3";

  if (user !== adminId) {
    const dbRef = ref(db, 'users/' + user + '/dataSave'); // Path to the user node
    const newMainSupplyRef = child(dbRef, key);
    
    const dataWithDateKey = {};
    dataWithDateKey[date] = data;

    set(newMainSupplyRef, dataWithDateKey)
        .then(() => {
            console.log("User node created in the database.");
        })
        .catch((error) => {
            console.error("Error creating user node:", error);
        });

    const dbRef1 = ref(db, 'users/' + '/dataSave'); // Path to the user node
    const newMainSupplyRef1 = child(dbRef1, key);

    set(newMainSupplyRef1, dataWithDateKey)
        .then(() => {
            console.log("User node created in the database.");
        })
        .catch((error) => {
            console.error("Error creating user node:", error);
        });

  } else {
    const dataWithDateKey = {};
    dataWithDateKey[date] = data;
    const dbRef = ref(db, 'users/' + '/dataSave'); // Path to the user node
    const newMainSupplyRef = child(dbRef, key);

    set(newMainSupplyRef, dataWithDateKey)
        .then(() => {
            console.log("User node created in the database.");
        })
        .catch((error) => {
            console.error("Error creating user node:", error);
        });
  }
  const mainSupplyRef = ref(db, 'dataSave');
  const newMainSupplyRef = child(mainSupplyRef, key); // Generate a new key for the entry

  // Create data object with date as key
  const dataWithDateKey = {};
  dataWithDateKey[date] = data;

  // Save data to Firebase with the generated key
  set(newMainSupplyRef, dataWithDateKey)
      .then(() => {
          console.log("Data saved to Firebase with key:", newMainSupplyRef.key);
          // Show success alert or handle success actions
      })
      .catch(error => {
          console.error("Error saving data:", error);
          // Handle error scenarios
      });
});


const dataRef = ref(db, 'CONTROLLERS/');
function sendDataToFirebase(tag, value) {
  const data = {
    [tag]: value,
  };

  // Use the correct `update` method from `firebase/database`
  update(dataRef, data)
    .then(() => {
      console.log(`Data for tag '${tag}' updated successfully!`);
      // Handle success actions
    })
    .catch(error => {
      console.error("Error updating data:", error);
      // Handle errors appropriately
    });
}



// -------------------------------- ON/OFF Power Supply ------------------------------------------------------------


  modeOperationSwitch.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 0 : 1; // 0 for ON, 1 for OFF
    sendDataToFirebase("P1", valueToSend);
  });

    // Now you can use the `once()` function
    const controllerRef = child(ref(db), 'CONTROLLERS/P1');
    onValue(controllerRef, (snapshot) => {
      const data = snapshot.val();
      if (data === 0) {
        modeOperationSwitch.checked = true; // If initial data is 0, check the switch
        mooSwitchDescription.textContent = 'Manual Operation';
        manualSection.style.display = 'block';
        automaticSection.style.display = 'none';
      } else if (data === 1) {
        modeOperationSwitch.checked = false; // If initial data is 1, uncheck the switch
        mooSwitchDescription.textContent = 'Automatic Operation';
        manualSection.style.display = 'none';
        automaticSection.style.display = 'block';
      }
    });
// // -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------
    const addVoltButton = document.getElementById('addVolt');
    const minusVoltButton = document.getElementById('minusVolt');
  
    let currentNumber1 = 0; // initialize a variable to store the number
    let currentNumber = 0; // initialize a variable to store the number
    const minValue = 1;
    const maxValue = 24;
    const maxTValue = 60;
  
    addVoltButton.addEventListener("click", () => {
      if (currentNumber1 < maxValue) {
        currentNumber1+=8;
        sendDataToFirebase("voltnumber", currentNumber1);
      }
    });
    
    minusVoltButton.addEventListener("click", () => {
      if (currentNumber1 > minValue) {
        currentNumber1-=8;
        sendDataToFirebase("voltnumber", currentNumber1);
      }
    });
// // -------------------------------- ADJUST VOLTAGE AND TIME ------------------------------------------------------------
    const addTimeButton = document.getElementById('addTime');
    const minusTimeButton = document.getElementById('minusTime');

    addTimeButton.addEventListener("click", () => {
      if (currentNumber < maxTValue) {
        currentNumber+=10;
        sendDataToFirebase("timenumber", currentNumber);
      }
    });

    minusTimeButton.addEventListener("click", () => {
      if (currentNumber > minValue) {
        currentNumber-=10;
        sendDataToFirebase("timenumber", currentNumber);
      }
    });

    const voltageRef = child(ref(db), 'CONTROLLERS/voltnumber');
    onValue(voltageRef, (snapshot) => {
      const datavolt = snapshot.val();
      updateNumber(numVolt, datavolt);
    });

    const timeRef = child(ref(db), 'CONTROLLERS/timenumber');
    onValue(timeRef, (snapshot) => {
      const datatime = snapshot.val();
      updateNumber(numTime, datatime);
    });
//   const voltage = document.getElementById("vl").value
//   const time = document.getElementById("ttl").value
//   // Create the data to send
//   // const dataToSend = {
//   // action: "updateValues", // You can change the action name as needed
//   // voltage: voltage,
//   // time: time
//   // };
//   // // Send entire object
//   // sendDataToFirebase("settings", dataToSend);

  

// -------------------------------- START PAUSE STOP ------------------------------------------------------------

  startButton.addEventListener('click', () => {
  sendDataToFirebase("action", 5);
  });

  pauseButton.addEventListener('click', () => {
  sendDataToFirebase("action", 7);
  });

  stopButton.addEventListener('click', () => {
  sendDataToFirebase("action", 9);
  });


  const actRef = child(ref(db), 'CONTROLLERS/action');
    onValue(actRef, (snapshot) => {
      const dataact = snapshot.val();
      if (dataact === 5) {
        startButton.classList.toggle('active');
        pauseButton.classList.remove('active');
        stopButton.classList.remove('active');
      } else if (dataact === 7) {
        pauseButton.classList.toggle('active');
        startButton.classList.remove('active');
        stopButton.classList.remove('active');
      }
    });

// -------------------------------- GET DATA ------------------------------------------------------------
// Fetch data from Firebase RTDB
const sensorRef = child(ref(db), '/sensors');
function updateValuesAndRatings(data) {
  // Update HTML elements
  data.turbidity1;
  data.turbidity2;
  data.pH;

  const dntInput = document.getElementById("dnt");
  const lwInput = document.getElementById("lw");
  const cnInput = document.getElementById("cn");
  const rnInput = document.getElementById("rn");
  const btlInput = document.getElementById('beforeTblvl');
  const atlInput = document.getElementById('afterTblvl');
  const pHInput = document.getElementById('phlvl');
  const resetCButton = document.getElementById("cycleBtns");
  const resetRButton = document.getElementById("runBtns");

  cnInput.value = 1;
  rnInput.value = 1;
  lwInput.value = 9.46355;
  dntInput.value = formattedDateTime;
  document.getElementById('beforeTblvl').value = data.turbidity1;
  document.getElementById('afterTblvl').value = data.turbidity2;
  document.getElementById('phlvl').value = data.pH;
  adjustInputWidth(lwInput);
  adjustInputWidth(dntInput);
  adjustInputWidth(btlInput);
  adjustInputWidth(pHInput);
  adjustInputWidth(atlInput);
  
  
  const inputs = document.querySelectorAll('.inputs');
  inputs.forEach(adjustInputWidth); // Call the function for each input
  // Handle additional logic for ratings (optional)
  // ADJUST INPUT WIDTH AFTER DATA UPDATE



// Function to determine voltage and time based on turbidity level
  function calculateTurbidityControl() {
    // Get input value
    var turbidityInput = parseInt(data.turbidity1);

    // Default values
    var voltage = 0;
    var time = 0;

    // Determine voltage and time based on turbidity level
    if (turbidityInput >= 1 && turbidityInput <= 70) {
        voltage = 8;
        time = 20;
    } else if (turbidityInput > 70 && turbidityInput <= 150) {
        voltage = 16;
        time = 40;
    } else if (turbidityInput > 150) {
        voltage = 24;
        time = 60;
    } else if (turbidityInput <= 0) {
      voltage = 0;
      time = 0;
    }

    const vlInput = document.getElementById("vl");
    const ttlInput = document.getElementById("ttl");
    // Display assigned voltage and time
    vlInput.value = voltage;
    ttlInput.value = time;

    modeOperationSwitch.addEventListener('change', function() {
      if (!this.checked) {
        sendDataToFirebase("timenumber", time);
        sendDataToFirebase("voltnumber",voltage);
      } else {
      }
    });
  }

  
  

// Event listener for input change
document.getElementById("beforeTblvl").addEventListener("input", calculateTurbidityControl);
calculateTurbidityControl()


// -------------------------------- RATINGS ------------------------------------------------------------

  const beforeRatingElement = document.querySelector(".rating");
  const afterRatingElement = document.querySelector(".after-rating");
  const phRatingElement = document.querySelector(".ph-rating");

  // Update ratings based on Firebase data (assuming beforeTurbidity, afterTurbidity, and phLevel are available)
  function updateRatings() {
    // Before Turbidity Rating
    if (data.turbidity1 > 50 && data.turbidity1 > 200) {
      beforeRatingElement.textContent = "DIRTY";
      beforeRatingElement.classList.add("bad");
    } else if (data.turbidity1 > 5 && data.turbidity1 <= 150) {
      beforeRatingElement.textContent = "CLOUDY";
      beforeRatingElement.classList.add("fair");
    } else if (data.turbidity1 <= 100){
      beforeRatingElement.textContent = "CLEAN";
      beforeRatingElement.classList.add("good");  
    }

    // After Turbidity Rating (similar logic)
    if (data.turbidity2 > 50 && data.turbidity2 > 200) {
      afterRatingElement.textContent = "DIRTY";
      afterRatingElement.classList.add("bad");
    } else if (data.turbidity2 > 5 && data.turbidity2 <= 150) {
      afterRatingElement.textContent = "CLOUDY";
      afterRatingElement.classList.add("fair");
    } else if (data.turbidity2 <= 100){
      afterRatingElement.textContent = "CLEAN";
      afterRatingElement.classList.add("good");
    }

    // pH Rating (similar logic)
    if (data.pH >= 10) {
      phRatingElement.textContent = "BAD";
      phRatingElement.classList.add("bad");
    } else if (data.pH >= 6) {
      phRatingElement.textContent = "GOOD";
      phRatingElement.classList.add("good");
    } else {
      phRatingElement.textContent = "BAD";
      phRatingElement.classList.add("bad");
    }
  }
  updateRatings()
  // const voltage = document.getElementById("vl").value
  // const time = document.getElementById("ttl").value
  // // Create the data to send
  // const dataToSend = {
  // action: "updateValues", // You can change the action name as needed
  // voltage: voltage,
  // time: time
  // };
  // // Send entire object
  // sendDataToFirebase("settings", dataToSend);



// -------------------------------- AUTO INPUT NUMBER ------------------------------------------------------------  

const dataRef = ref(db, 'sensors/');
function sendDataFirebase(tag, value) {
  const data = {
    [tag]: value,
  };

  // Use the correct `update` method from `firebase/database`
  update(dataRef, data)
    .then(() => {
      console.log(`Data for tag '${tag}' updated successfully!`);
      // Handle success actions
    })
    .catch(error => {
      console.error("Error updating data:", error);
      // Handle errors appropriately
    });
}

const contRef = ref(db, 'CONTROLLERS/');
function sendDataFirebaseCont(tag, value) {
  const data = {
    [tag]: value,
  };

  // Use the correct `update` method from `firebase/database`
  update(contRef, data)
    .then(() => {
      console.log(`Data for tag '${tag}' updated successfully!`);
      // Handle success actions
    })
    .catch(error => {
      console.error("Error updating data:", error);
      // Handle errors appropriately
    });
}

resetCButton.addEventListener("click", () => {
  let cnValue = parseInt(cnInput.value, 10) || 0; // Handle potential non-numeric input
  cnValue++;
  sendDataFirebase("turbidity2", 0);
  sendDataFirebase("pH", 0);
  cnInput.value = cnValue;
  sendDataFirebaseCont("cycle",cnValue);

});

resetRButton.addEventListener("click", () => {
  let rnValue = parseInt(rnInput.value, 10) || 0; // Handle potential non-numeric input
  rnValue++;
  sendDataFirebase("turbidity1", 0);
  sendDataFirebase("turbidity2", 0);
  sendDataFirebase("pH", 0);
  sendDataFirebaseCont("cycle", 1);
  rnInput.value = rnValue;
  cnInput.value = 1;
  sendDataFirebaseCont("run",rnValue);

});


const controllerRef = child(ref(db), '/CONTROLLERS');
const sensorRef = child(ref(db), '/sensors');
const alertRElement = document.getElementById("maintenance");

function alert(value, data){
  const rnValue = value.run;
  const cnValue = value.cycle;
  const timeValue = value.timenumber;
  const voltValue = value.voltnumber;
  const amountRemoved = ((data.turbidity1-data.turbidity2)/data.turbidity1)*100;
  if (rnValue === 2 && cnValue === 10 && timeValue === 60 && voltValue === 24 && amountRemoved < 50) {

    alertRElement.style.display = "block";


  } else {
    alertRElement.style.display = "none";
  }
}

onValue(controllerRef, (snapshot) => {
  const value = snapshot.val();
  onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    alert(value, data);
  });
});
}
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  updateValuesAndRatings(data);
});



// -------------------------------- DASHBOARD ------------------------------------------------------------  
