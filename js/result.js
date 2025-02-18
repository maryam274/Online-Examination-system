let userName = localStorage.getItem("username");
const grade = document.querySelector(".grade");
let percentage = localStorage.getItem("percentage");
const resultImg = document.querySelector(".result_img"); // Select the main image element
const overlayImg = document.querySelector(".overlay"); // Select the overlay image element

if (userName && percentage >= 90) {
    grade.innerHTML = `Congratulations, ${userName}!<br><br> Your grade is <strong>Excellent</strong>. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/exellent.svg"; // Main image for "Excellent"
    overlayImg.src = "../assest/exellent_overlay.svg"; // Overlay image for "Excellent"
} else if (userName && percentage >= 80) {
    grade.innerHTML = `Congratulations, ${userName}!<br><br> Your grade is <strong>Very Good</strong>. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/very good.svg"; // Main image for "Very Good"
    overlayImg.src = "../assest/very good_overlay.svg"; // Overlay image for "Very Good"
} else if (userName && percentage >= 70) {
    grade.innerHTML = `Congratulations, ${userName}!<br><br> Your grade is <strong>Good</strong>. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/good.svg"; // Main image for "Good"
    overlayImg.src = "../assest/good_overlay.svg"; // Overlay image for "Good"
} else if (userName && percentage >= 60) {
    grade.innerHTML = `Hi, ${userName}!<br><br> Your grade is <strong>Average</strong>. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/average.svg"; // Main image for "Average"
    overlayImg.src = "../assest/average_overlay.svg"; // Overlay image for "Average"
} else if (userName && percentage >= 50) {
    grade.innerHTML = `Hi, ${userName}!<br><br> Your grade is <strong>Pass</strong>. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/pass.svg"; // Main image for "Pass"
    overlayImg.src = "../assest/pass_overlay.svg"; // Overlay image for "Pass"
} else if (userName && percentage < 50 && percentage != 0) {
    grade.innerHTML = `Sorry, ${userName}!<br><br> You have failed the exam. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/fail.svg"; // Main image for "Fail"
    overlayImg.src = "../assest/fail_overlay.svg"; // Overlay image for "Fail"
} else {
    grade.innerHTML = `Sorry, ${userName}!<br><br> You have failed the exam. Your score is <strong>${percentage}%</strong>`;
    resultImg.src = "../assest/no score.svg"; // Default main image for no score
    overlayImg.src = "../assest/no score_overlay.svg"; // Default overlay image for no score
}
