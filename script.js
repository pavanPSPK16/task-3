const quizData = [
  {
    question: "Which of the following is used to develop web pages?",
    options: ["Python", "C++", "HTML", "C-Language"],
    answer: "HTML"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheet", "Cascading Style Sheets", "Coded Style System", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const current = quizData[currentIndex];
  document.getElementById('question').innerText = current.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option";
    btn.onclick = () => {
      checkAnswer(option);
      // Add this line to mark the selected option
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      btn.classList.add('selected');
    };
    optionsDiv.appendChild(btn);
  });
}
function checkAnswer(selected) {
  const correct = quizData[currentIndex].answer;
  if (selected === correct) {
    score++;
    // Add this line to display correct answer message
    document.getElementById('result').innerText = 'Correct!';
  } else {
    // Add this line to display incorrect answer message
    document.getElementById('result').innerText = `Incorrect! The correct answer is ${correct}.`;
  }
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}
function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    // Change the text of the next button to "Finish"
    const nextBtn = document.querySelector('.btn');
    nextBtn.innerText = 'Finish';
    nextBtn.onclick = finishQuiz;
  }
}

// Add a new function to handle the finish quiz button click
function finishQuiz() {
  // You can add code here to handle the finish quiz logic, such as displaying the final score
  document.getElementById('result').innerText = `Your final score is ${score}/${quizData.length}`;
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}

loadQuestion();


document.getElementById("get-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  
  if (city) {
    const apiKey = "b445d38a8607d15f8d8afac046330276";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = `Weather in ${data.name}: ${data.weather[0].main} - ${data.main.temp}°C`;
        document.getElementById("weather-info").innerText = weatherInfo;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("weather-info").innerText = "City not found.";
      });
  }
});