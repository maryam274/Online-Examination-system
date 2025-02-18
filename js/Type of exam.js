const username = localStorage.getItem("username");
const easy = document.getElementsByClassName("choice")[0];
const medium = document.getElementsByClassName("choice")[1];
const hard = document.getElementsByClassName("choice")[2];


const h2 = document.getElementsByTagName("h2")[0];
h2.innerHTML = `Welcome, ${username}`;
// greeting.appendChild(h2);
easy.addEventListener("click", function () {
    window.location.href = "../html/Exam.html";
    localStorage.setItem("type", 'easy');
});

medium.addEventListener("click", function () {
    window.location.href = "../html/Exam.html";
    localStorage.setItem("type", 'medium');
});

hard.addEventListener("click", function () {
    window.location.href = "../html/Exam.html";
    localStorage.setItem("type", 'hard');
})

