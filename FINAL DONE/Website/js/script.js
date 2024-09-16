// ------------------------- SWITCH LABELS DESCRIPTION -------------------------------------------------------------------------------


const modeOperationSwitch = document.getElementById('modeOperationSwitch');
const mooSwitchDescription = document.getElementById('switch-description3');

// JavaScript code to update switch descriptions
    
    
    modeOperationSwitch.addEventListener('change', function() {
        if (this.checked) {
            mooSwitchDescription.textContent = 'Manual Operation';
        } else {
            mooSwitchDescription.textContent = 'Automatic Operation';
        }
    });

// ------------------------- MODE OF OPERATION BUTTONS -------------------------------------------------------------------------------
const manualSection = document.querySelector('.manual');
const automaticSection = document.querySelector('.automatic');

  modeOperationSwitch.addEventListener('change', function() {
    if (this.checked) {
      manualSection.style.display = 'block';
      automaticSection.style.display = 'none';
    } else {
      manualSection.style.display = 'none';
      automaticSection.style.display = 'block';
    }
  });

  // Trigger the change event initially to set the initial state
  modeOperationSwitch.dispatchEvent(new Event('change'));

  const numVolt = document.getElementById('numVolt');
  const addVolt = document.getElementById('addVolt');
  const minusVolt = document.getElementById('minusVolt');

  const numTime = document.getElementById('numTime');
  const addTime = document.getElementById('addTime');
  const minusTime = document.getElementById('minusTime');

  const submitBtn = document.getElementById('submitBtn');
  
  const vlInput = document.getElementById('vl');
  const ttlInput = document.getElementById('ttl');
  
  let voltValue = 0;
  let timeValue = 0;
  
  function updateNumber(element, value) {
    element.textContent = value < 10 ? '0' + value : value;
  }
  
  addVolt.addEventListener('click', () => {
    if (voltValue < 24) {
      voltValue+=8;
      updateNumber(numVolt, voltValue);
    }
  });
  
  minusVolt.addEventListener('click', () => {
    if (voltValue > 1) {
      voltValue-=8;
      updateNumber(numVolt, voltValue);
    }
  });
  
  addTime.addEventListener('click', () => {
    if (timeValue < 60) {
      timeValue+=10;
      updateNumber(numTime, timeValue);
    }
  });
  
  minusTime.addEventListener('click', () => {
    if (timeValue > 1) {
      timeValue-=10;
      updateNumber(numTime, timeValue);
    }
  });

// Function to determine voltage and time based on turbidity level
function calculateTurbidityControl() {
    // Get input value
    var turbidityInput = parseInt(document.getElementById("beforeTblvl").value);

    // Default values
    var voltage = 0;
    var time = 0;

    // Determine voltage and time based on turbidity level
    if (turbidityInput >= 0 && turbidityInput <= 70) {
        voltage = 16;
        time = 20;
    } else if (turbidityInput > 70 && turbidityInput <= 150) {
        voltage = 20;
        time = 40;
    } else if (turbidityInput > 150) {
        voltage = 24;
        time = 60;
    }

    // Display assigned voltage and time
    document.getElementById("vl").value = voltage;
    document.getElementById("ttl").value = time;
}

// Event listener for input change
document.getElementById("beforeTblvl").addEventListener("input", calculateTurbidityControl);

// Initial calculation
calculateTurbidityControl();
// -------------------------------- VOLT BUTTON ------------------------------------------------------------

// ------------------------- DATE & TIME -------------------------------------------------------------------------------  
// Get the current date and time
const d = new Date();

// Format the date to a readable string
const formattedDateTime = d.toLocaleString(); // Adjust the formatting as needed

// Set the formatted date and time into the input field

// ------------------------- INPUT FIELD WIDTH -------------------------------------------------------------------------------
// Function to adjust input field width based on its content
function adjustInputWidth(input) {
    input.style.width = (input.value.length + 1) * 8 + 'px'; // Adjust the multiplier as needed
  }
  
  // Get all input elements with class "inputs"
  const inputs = document.querySelectorAll('.inputs');
  
  // Loop through each input element and attach an input event listener
  inputs.forEach(input => {
    // Add input event listener
    input.addEventListener('input', function() {
        adjustInputWidth(this);
    });
  
    // Initially adjust input width
    adjustInputWidth(input);
  });

// -------------------------------- ACTION BUTTONS ------------------------------------------------------------
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');


  stopButton.addEventListener('click', () => {
    stopButton.classList.remove('active');
    startButton.classList.remove('active');
    pauseButton.classList.remove('active');
  });

// -------------------------------- SUBMIT ALERTS ------------------------------------------------------------  
// Get the submit button element
const submitButton = document.getElementById("submitBtns"); // Replace "submit-button" with your actual button ID

// Add a click event listener to the button
submitButton.addEventListener("click", () => {

  // Get the alert element
  const alertElement = document.getElementById("alert-submit");

  // Show the alert element
  alertElement.style.display = "block";

  // Optional: Hide the alert element after a certain time
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000); // Hide after 3 seconds

  // Display the alert message (optional)
  // alert("Data saved!");
});

// Get the submit button element
const cycleButton = document.getElementById("cycleBtns"); // Replace "submit-button" with your actual button ID

// Add a click event listener to the button
cycleButton.addEventListener("click", () => {

  // Get the alert element
  const alertCElement = document.getElementById("alert-cycle");

  // Show the alert element
  alertCElement.style.display = "block";

  // Optional: Hide the alert element after a certain time
  setTimeout(() => {
    alertCElement.style.display = "none";
  }, 3000); // Hide after 3 seconds

  // Display the alert message (optional)
  // alert("Data saved!");
});

// Get the submit button element
const runButton = document.getElementById("runBtns"); // Replace "submit-button" with your actual button ID

// Add a click event listener to the button
runButton.addEventListener("click", () => {

  // Get the alert element
  const alertRElement = document.getElementById("alert-run");

  // Show the alert element
  alertRElement.style.display = "block";

  // Optional: Hide the alert element after a certain time
  setTimeout(() => {
    alertRElement.style.display = "none";
  }, 3000); // Hide after 3 seconds

  // Display the alert message (optional)
  // alert("Data saved!");
});

// -------------------------------- MAINTENANCE ALERTS ------------------------------------------------------------  
// // Get the afterTurbidityInput element
// const afterTurbidityInput = document.getElementById("afterTblvl");

// // Add an input event listener to the element
// afterTurbidityInput.addEventListener("input", () => {
//   // Parse the input value as a number
//   const turbidityValue = parseFloat(afterTurbidityInput.value);

//   // Check if the value is greater than 150
//   if (turbidityValue > 150) {
//     // Get the alert element
//     const alertRElement = document.getElementById("maintenance");

//     // Show the alert element
//     alertRElement.style.display = "block";


//   } else {
//     // Hide the alert if the value is no longer above 150
//     const alertRElement = document.getElementById("maintenance");
//     alertRElement.style.display = "none";
//   }
// });

// -------------------------------- AUTO INPUT NUMBER ------------------------------------------------------------  



// -------------------------------- RATINGS ------------------------------------------------------------  
// const inputField = document.getElementById("beforeTblvl");
// const ratingElement = document.querySelector(".rating");

// inputField.addEventListener("input", function() {
//   const value = parseInt(this.value);

//   if (isNaN(value)) {
//     ratingElement.textContent = ""; // Clear rating if invalid input
//     ratingElement.classList.remove("good", "fair", "bad"); // Remove all rating classes
//     return;
//   }

//   // Clear the previously applied rating class (optional)
//   ratingElement.classList.remove("good", "fair", "bad");

//   if (value >= 80) {
//     ratingElement.textContent = "DIRTY";
//     ratingElement.classList.add("bad"); // Apply the class for GOOD rating
//   } else if (value >= 60) {
//     ratingElement.textContent = "CLOUDY";
//     ratingElement.classList.add("fair"); // Apply the class for FAIR rating
//   } else {
//     ratingElement.textContent = "CLEAN";
//     ratingElement.classList.add("good"); // Apply the class for BAD rating
//   }
// });

// const afterInputField = document.getElementById("afterTblvl");
// const afterRatingElement = document.querySelector(".after-rating");

// afterInputField.addEventListener("input", function() {
//   const value = parseInt(this.value);

//   if (isNaN(value)) {
//     afterRatingElement.textContent = ""; // Clear rating if invalid input
//     afterRatingElement.classList.remove("good", "fair", "bad"); // Remove all rating classes
//     return;
//   }

//   // Clear the previously applied rating class (optional)
//   afterRatingElement.classList.remove("good", "fair", "bad");

//   if (value >= 80) {
//     ratingElement.textContent = "DIRTY";
//     ratingElement.classList.add("bad"); // Apply the class for GOOD rating
//   } else if (value >= 60) {
//     ratingElement.textContent = "CLOUDY";
//     ratingElement.classList.add("fair"); // Apply the class for FAIR rating
//   } else {
//     ratingElement.textContent = "CLEAN";
//     ratingElement.classList.add("good"); // Apply the class for BAD rating
//   }
// });

// const phInputField = document.getElementById("phlvl");
// const phRatingElement = document.querySelector(".ph-rating");

// phInputField.addEventListener("input", function() {
//   const value = parseInt(this.value);

//   if (isNaN(value)) {
//     phRatingElement.textContent = ""; // Clear rating if invalid input
//     phRatingElement.classList.remove("good", "fair", "bad"); // Remove all rating classes
//     return;
//   }

//   // Clear the previously applied rating class (optional)
//   phRatingElement.classList.remove("good", "fair", "bad");

//   if (value >= 10) {
//     phRatingElement.textContent = "BAD";
//     phRatingElement.classList.add("bad"); // Apply the class for GOOD rating
//   } else if (value >= 6) {
//     phRatingElement.textContent = "GOOD";
//     phRatingElement.classList.add("good"); // Apply the class for FAIR rating
//   } else {
//     phRatingElement.textContent = "BAD";
//     phRatingElement.classList.add("bad"); // Apply the class for BAD rating
//   }
// });

// -------------------------------- TEST CONSOLE LOG ------------------------------------------------------------  
submitButton.addEventListener('click', function() {
  console.log(`Run: ${(document.getElementById("rn").value)}`);
  console.log(`Cycle: ${(document.getElementById("cn").value)}`);
  console.log(`Date: ${(document.getElementById("dnt").value)}`);  
  console.log(`Before Turbidity Level: ${parseInt(document.getElementById("beforeTblvl").value)}`);
  console.log(`After Turbidity Level: ${parseInt(document.getElementById("afterTblvl").value)}`);
  console.log(`pH Level: ${parseInt(document.getElementById("phlvl").value)}`);
  
    if (modeOperationSwitch.checked) {
        console.log(`Manual Mode - Voltage: ${voltValue}V, Time: ${timeValue}mins`);
    } else {
        console.log(`Automatic Mode - Voltage: ${vlInput.value}V, Time: ${ttlInput.value}mins`);
    }
    

});

