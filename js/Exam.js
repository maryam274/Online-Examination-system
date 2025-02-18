let questionsData = []; // Array to store questions data
let currentQuestionIndex = 0;
let flaggedQuestions = []; // Array to store flagged questions
let timeLeft = 1 * 60; // Timer set to 5 minutes for testing
let filteredQuestions = []; //Array to store Type of questions
let correctAnswers = []; // Array to store correct answers
let percentage = 0;

// Fetch questions from a JSON file
function fetchQuestions() {
  fetch("../json/questions.json")
    .then((response) => response.json())
    .then((data) => {
      questionsData = data;

      // Filter and random questions based on selected type
      const selectedType = localStorage.getItem("type"); // Get selected type from local storage
      filteredQuestions = questionsData.filter(
        (q) => q.type === selectedType // Filter questions based on selected type
      );
      randomArray(filteredQuestions); // random questions
      console.log(filteredQuestions.length);
      console.log(correctAnswers.length);

      showQuestion();
      updateCounts();
    })
    .catch((error) => console.error("Error fetching questions:", error)); // Log error if any
}


// Random array function
function randomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Global object to store user answers for each question
let userAnswers = {};

// Function to handle checking the radio button and saving the value
function handleRadioChange(questionIndex) {
  const selectedRadio = document.querySelector(`input[name="q${questionIndex}"]:checked`);
  if (selectedRadio) {
    // Save the selected value in the userAnswers object
    const selectedValue = selectedRadio.value;
    userAnswers[questionIndex] = selectedValue; // Store the selected answer for the current question

    console.log(`The answer for  ${questionIndex + 1}: ${selectedValue}`);
    checkUserAnswer(questionIndex); // Check the selected answer
  }
}

// Function to get the saved value for a question
function getSavedAnswer(questionIndex) {
  return userAnswers[questionIndex]; // Return the saved answer for the current question
}


// Show the current question
function showQuestion() {
  const questionContainer = document.getElementById("questions-tab"); // Get question container
  questionContainer.innerHTML = ""; // Clear previous content

  if (filteredQuestions.length === 0) { // If no questions available
    questionContainer.innerHTML = "<p>No questions available for the selected type.</p>";
    return;
  }

  const question = filteredQuestions[currentQuestionIndex]; // Get current question

  questionContainer.innerHTML = `
    <div class="question">
      <div class="question-controls">
        <button class="nav-btn" id="flag-btn">${flaggedQuestions.includes(currentQuestionIndex) ? "Unflag" : "Flag"}</button>
      </div>
      <p><strong>Question ${currentQuestionIndex + 1}:</strong> ${question.question}</p>
      ${question.options.map((option, index) => `
        <div>
          <input type="radio" name="q${currentQuestionIndex}" value="${option}" 
            ${getSavedAnswer(currentQuestionIndex) === option ? "checked" : ""}>
          <label for="q${currentQuestionIndex}-option-${index}">${option}</label>
        </div>
      `).join("")}

    </div>
  `;

  // Add event listeners for radio buttons
  const radioButtons = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`); // Get all radio buttons for the current question
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => handleRadioChange(currentQuestionIndex));
  });

  document.getElementById("flag-btn").addEventListener("click", () => flagQuestion(currentQuestionIndex)); // Flag button event listener
  updateNavigationButtons();




}



// Flag question
function flagQuestion(questionIndex) {
  if (!flaggedQuestions.includes(questionIndex)) {
    flaggedQuestions.push(questionIndex);
  } else {
    flaggedQuestions = flaggedQuestions.filter((index) => index !== questionIndex); // Unflag if already flagged
  }
  updateCounts();
  showQuestion(); // Update the button state
}

// Update flagged counts
function updateCounts() {
  if (!flaggedQuestions.length) {

    document.querySelector(".tab-count").style.display = "none";

  } else {
    document.querySelector(".tab-count").style.display = "block";

    document.getElementById("flagged-tab-count").textContent = flaggedQuestions.length || ""; // Update flagged count
  }
}

// Get user's selected answer
function getUserAnswer(questionIndex) {
  const selectedInput = document.querySelector(`input[name="q${questionIndex}]:checked`);
  return selectedInput ? selectedInput.value : null; // Return selected value or null
}

//Check the User's correct answer
function checkUserAnswer(questionIndex) {
  const question = filteredQuestions[questionIndex];
  const userAnswer = userAnswers[questionIndex]; // Get the user's selected answer
  const correctAnswer = question.options[question.answer]; // Get the correct answer text

  console.log(correctAnswer);

  // Check if the selected answer is correct
  if (userAnswer !== undefined && userAnswer === correctAnswer) {
    // Add the correct answer if not already in the array
    if (!correctAnswers.includes(correctAnswer)) {
      correctAnswers.push(correctAnswer);
    }
    console.log("Correct answer added:", correctAnswers);
  }
  // Remove the answer from correctAnswers if it was correct previously but is now wrong
  else if (userAnswer !== undefined && correctAnswers.includes(correctAnswer)) {
    correctAnswers = correctAnswers.filter((answer) => answer !== correctAnswer);

  }
}

// Timer function
function startTimer() {
  const timerElement = document.getElementById("timer");
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      handleSubmit(); // Automatically submit
      window.location.href = "../html/Time out.html";
    } else {
      timeLeft--;
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
      const seconds = String(timeLeft % 60).padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}


// Submit results
function handleSubmit() {
  // filteredQuestions.forEach((_, index) => checkUserAnswer(index)); // Check answers for all questions
  const percentage = Math.round((correctAnswers.length / filteredQuestions.length) * 100); // Calculate percentage
  localStorage.setItem("percentage", percentage);
  window.location.href = "../html/result.html"; // Redirect to the result page
}

// Navigation buttons
function updateNavigationButtons() {
  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0; // Disable previous button if first question
  document.getElementById("next-btn").disabled = currentQuestionIndex === filteredQuestions.length - 1; // Disable next button if last question
  document.querySelector(".q_no").textContent = `${currentQuestionIndex + 1} out of ${filteredQuestions.length}`; // Update question number
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions();
  startTimer();

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    }
  });

  document.getElementById("submit-btn").addEventListener("click", handleSubmit); // Submit button event listener


  function updateButtonVisibility(tabId) {
    const isQuizTab = tabId === "questions-tab"; // Check if the current tab is the quiz tab
    document.getElementById("next-btn").style.display = isQuizTab ? "inline-block" : "none";
    document.getElementById("prev-btn").style.display = isQuizTab ? "inline-block" : "none";
    document.getElementById("submit-btn").style.display = isQuizTab ? "inline-block" : "none";
    document.querySelector(".q_no").style.display = isQuizTab ? "inline-block" : "none";
  }

  const tabs = document.querySelectorAll(".tab-btn"); // Get all tab buttons
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");

      // Update tab styles
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update content visibility
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });
      document.getElementById(tabId).classList.add("active");

      // Update button visibility based on the tab
      updateButtonVisibility(tabId);

      // Show flagged questions if flagged tab is active
      if (tabId === "flagged-tab") {
        showTabContent("flagged-tab", flaggedQuestions);
      } else {
        showQuestion(); // Default to the current question in the quiz tab

      }
    });
  });


  document.querySelector(".tab-btn[data-tab='questions-tab']").classList.add("active"); // Set questions tab as active by default
});


// Show flagged questions
function showTabContent(tabId, questionIndexes) {
  const tabContent = document.getElementById(tabId);
  tabContent.innerHTML = questionIndexes.length
    ? questionIndexes
      .map((index) => `
      <div class="question">
        <p><strong>Question ${index + 1}:</strong> ${filteredQuestions[index].question}</p>
        ${filteredQuestions[index].options.map((option, optIndex) => `
          <div>
            <input type="radio" name="q${index}" value="${option}"
              ${getUserAnswer(index) === option ? "checked" : ""}>
            <label for="q${index}-option-${optIndex}">${option}</label>
          </div>
        `).join("")}
        <button class="delete-btn" id="delete-btn" data-index="${index}">Delete</button>
      </div>
    `)
      .join("")
    : "<p>No questions flagged yet.</p>";

  // Attach event listeners for radio buttons in the flagged tab
  questionIndexes.forEach((index) => {
    const radioButtons = document.querySelectorAll(`input[name="q${index}"]`);
    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", () => handleRadioChange(index));
    });
  });

  // Attach event listeners for delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const questionIndex = parseInt(event.target.getAttribute("data-index"));
      deleteFlaggedQuestion(questionIndex);
    });
  });
}

// Function to delete flagged question
function deleteFlaggedQuestion(questionIndex) {
  // Remove the question from flaggedQuestions
  flaggedQuestions = flaggedQuestions.filter((index) => index !== questionIndex);
  updateCounts(); // Update flagged count UI
  showTabContent("flagged-tab", flaggedQuestions); // Refresh flagged questions tab
}


