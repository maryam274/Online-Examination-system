let userName = localStorage.getItem("username");
const grade = document.querySelector(".grade");
let percentage = localStorage.getItem("percentage");
const tryAgain = document.getElementById("try-btn");
const sorry = document.querySelector(".sorry");

sorry.innerHTML = `Sorry, ${userName}, You run out of time.`
if (userName && percentage >= 90) {
    grade.innerHTML = `Your grade is <strong>Excellent</strong>. Your saved score is <strong>${percentage}%</strong>`;
} else if (userName && percentage >= 80) {
    grade.innerHTML = `Your grade is <strong>Very Good</strong>. Your saved score is <strong>${percentage}%</strong>`;
} else if (userName && percentage >= 70) {
    grade.innerHTML = `Your grade is <strong>Good</strong>. Your saved score is <strong>${percentage}%</strong>`;
} else if (userName && percentage >= 60) {
    grade.innerHTML = `Your grade is <strong>Average</strong>. Your saved score is <strong>${percentage}%</strong>`;
} else if (userName && percentage >= 50) {
    grade.innerHTML = `Your grade is <strong>Pass</strong>. Your saved score is <strong>${percentage}%</strong>`;
} else if (userName && percentage < 50 && percentage != null) {
    grade.innerHTML = ` You have failed the exam. Your saved score is <strong>${percentage}%</strong>`;

} else {
    grade.innerHTML = "No score available.";
} 
