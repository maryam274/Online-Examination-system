const form = document.getElementById("signupForm");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // const userName = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    // const confirmPassword = document.getElementById("confirmPassword").value;

    // const lastNameError = document.getElementById("userNameError");
    const emailError = document.getElementById("emailError");
    // const passwordError = document.getElementById("passwordError");
    // const confirmPasswordError = document.getElementById("confirmPasswordError");
    const userError = document.getElementById("userError")

    let isValid = true;

    // Reset error states
    clearErrors();

    // Regex for alphabetical characters
    // const nameRegex = /^[A-Za-z]+$/;
    // // Regex for strong passwords
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log(email, password);
    console.log(localStorage.getItem("email"));



    if (!validateEmail(email)) {
        emailError.style.display = "block";
        document.getElementById("email").classList.add("error_border");
        isValid = false;
    }

    if (email !== (localStorage.getItem("email")) || password !== (localStorage.getItem("password"))) {
        userError.style.display = "block";
        document.getElementById("email").classList.add("error_border");
        isValid = false;
    }

    if (isValid) {
        // alert("Form submitted successfully!");
        window.location.href = "../html/Type of exam.html";
    }
});

// Helper function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to clear error messages
function clearErrors() {
    const errors = document.querySelectorAll(".error");
    const inputs = document.querySelectorAll("input");

    errors.forEach((error) => {
        error.style.display = "none";
    });

    inputs.forEach((input) => {
        input.classList.remove("error-border");
    });
}

// Toggle Password Visibility
const togglePassword1 = document.getElementById("togglePassword1");
const togglePassword2 = document.getElementById("togglePassword2");
const passwordInput = document.getElementById("password");
// const confirmPasswordInput = document.getElementById("confirmPassword");

togglePassword1.addEventListener("click", () => {
    const type = passwordInput.type === "text" ? "password" : "text";
    passwordInput.type = type;
    togglePassword1.classList.toggle("fa-eye");
    togglePassword1.classList.toggle("fa-eye-slash");
});
