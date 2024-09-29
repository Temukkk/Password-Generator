const passwordInput = document.querySelector(".password-box input"),
  copyIcon = document.querySelector(".password-box .copy-icon"),
  rangeInput = document.querySelector(".range-box input"),
  sliderNumber = document.querySelector(".range-box .slider-number"),
  generateButton = document.querySelector(".generate-button"),
  themeToggle = document.getElementById("theme-toggle"),
  toast = document.getElementById("toast"),
  strengthLevel = document.getElementById("strength-level"),
  includeUppercase = document.getElementById("include-uppercase"),
  includeNumbers = document.getElementById("include-numbers"),
  includeSymbols = document.getElementById("include-symbols");

let allCharacters = "abcdefghijklmnopqrstuvwxyz";
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "^!$%&|[](){}:;.,*+-#@<>~";

// Generate password function
const generatePassword = () => {
  let characters = allCharacters;
  let newPassword = "";

  if (includeUppercase.checked) characters += uppercase;
  if (includeNumbers.checked) characters += numbers;
  if (includeSymbols.checked) characters += symbols;

  for (let i = 0; i < rangeInput.value; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    newPassword += characters[randomNumber];
  }

  passwordInput.value = newPassword;
  updateStrength();
  copyIcon.classList.replace("uil-file-check-alt", "uil-copy"); // Reset copy icon
};

// Update slider number on change
rangeInput.addEventListener("input", () => {
  sliderNumber.innerText = rangeInput.value;
  generatePassword();
});

// Copy password to clipboard
copyIcon.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.classList.replace("uil-copy", "uil-file-check-alt"); // Change icon after copy
    showToast();
  }
});

// Show toast notification
const showToast = () => {
  toast.classList.add("show-toast");
  setTimeout(() => {
    toast.classList.remove("show-toast");
  }, 2000);
};

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Update password strength
const updateStrength = () => {
  const length = passwordInput.value.length;
  let strength = "Weak";

  if (length >= 12 && includeUppercase.checked && includeNumbers.checked && includeSymbols.checked) {
    strength = "Strong";
  } else if (length >= 8 && (includeUppercase.checked || includeNumbers.checked || includeSymbols.checked)) {
    strength = "Medium";
  }

  strengthLevel.innerText = strength;
};

// Generate initial password on load
generatePassword();
generateButton.addEventListener("click", generatePassword);
