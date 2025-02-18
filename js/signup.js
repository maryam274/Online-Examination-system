const form = document.getElementById("signupForm");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    let isValid = true;

    // Reset error states
    clearErrors();

    // Regex for alphabetical characters
    const nameRegex = /^[A-Za-z]+$/;
    // Regex for strong passwords
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(firstName)) {
        firstNameError.style.display = "block";
        document.getElementById("firstName").classList.add("error_border");
        isValid = false;
    }

    if (!nameRegex.test(lastName)) {
        lastNameError.style.display = "block";
        document.getElementById("lastName").classList.add("error_border");
        isValid = false;
    }

    if (!validateEmail(email)) {
        emailError.style.display = "block";
        document.getElementById("email").classList.add("error_border");
        isValid = false;
    }

    if (!strongPasswordRegex.test(password)) {
        passwordError.style.display = "block";
        document.getElementById("password").classList.add("error_border");
        isValid = false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.style.display = "block";
        document.getElementById("confirmPassword").classList.add("error_border");
        isValid = false;
    }

    if (isValid) {
        // Redirect to login page
        window.location.href = "../html/login.html";

        // Add email and password to local storage
        localStorage.setItem("username", firstName + " " + lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    }
});

// Enable or disable the confirm password field based on password validation
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");

passwordInput.addEventListener("input", () => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (strongPasswordRegex.test(passwordInput.value)) {
        passwordError.style.display = "none";
        passwordInput.classList.remove("error_border");
    } else {
        passwordError.style.display = "block";
        passwordInput.classList.add("error_border");
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
        input.classList.remove("error_border");
    });
}

// Toggle Password Visibility
const togglePassword1 = document.getElementById("togglePassword1");
const togglePassword2 = document.getElementById("togglePassword2");

togglePassword1.addEventListener("click", () => {
    const type = passwordInput.type === "text" ? "password" : "text";
    passwordInput.type = type;
    togglePassword1.classList.toggle("fa-eye");
    togglePassword1.classList.toggle("fa-eye-slash");
});

togglePassword2.addEventListener("click", () => {
    const type = confirmPasswordInput.type === "text" ? "password" : "text";
    confirmPasswordInput.type = type;
    togglePassword2.classList.toggle("fa-eye");
    togglePassword2.classList.toggle("fa-eye-slash");
});
