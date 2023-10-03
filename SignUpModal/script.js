(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        const emailOrPhoneInput = form.querySelector("#validationCustom04");
        const emailOrPhoneValue = emailOrPhoneInput.value.trim();
        if (!form.checkValidity() || !isEmailOrPhoneUnique(emailOrPhoneValue)) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
   // Function to check if email or phone number is unique
   function isEmailOrPhoneUnique(value) {
    // Retrieve previously stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData && storedUserData.emailOrPhone === value) {
      // Not unique - show error message
      const emailOrPhoneInput = document.querySelector("#validationCustom04");
      emailOrPhoneInput.classList.add("is-invalid");
      return false;
    }

    return true;
  }
})();

// onsubmit section

const submitBtn = document.getElementById("submitBtn");
const form = document.querySelector(".needs-validation");

submitBtn.addEventListener("click", (event) => {
  userData = {
    emailOrPhone:
    event.target.parentElement.parentElement.children[6].children[1].value,
    firtsName:
      event.target.parentElement.parentElement.children[0].children[1].value,
      lastName:
      event.target.parentElement.parentElement.children[1].children[1].value,
      userName:
      event.target.parentElement.parentElement.children[2].children[1].value,
      cityName:
      event.target.parentElement.parentElement.children[3].children[1].value,
      address:
      event.target.parentElement.parentElement.children[4].children[1].value,
      agreement:
      event.target.parentElement.parentElement.children[5].children[0].children[0],
  };

  localStorage.setItem("userData", JSON.stringify(userData));
});

if (JSON.parse(localStorage.getItem("userData")).firtsName) {
  form.innerHTML = `<div class="text-center w-100 h-100 d-flex align-items-center justify-content-center fs-2"><span>You have Successfully signed up ${JSON.parse(localStorage.getItem("userData")).firtsName} </span><i role="button" title="Edit Information" class="edit-btn btn btn-outline-danger bi bi-pencil-square m-2 px-3 fs-2 border-0"></i></div>`;
  const editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    location.reload();
  })
  };





