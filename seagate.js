let search = document.querySelector("#search");
let searchContainer = document.querySelector("#search-container");
let inquiryPurposeSelect = document.querySelector("#inquiry-purpose");
let firstNameInput = document.querySelector("#first-name-input");
let lastNameInput = document.querySelector("#last-name-input");
let companyEmailInput = document.querySelector("#company-email-input");
let companyNameInput = document.querySelector("#company-name-input");
let roleSelect = document.querySelector("#role");
let phoneNumberInput = document.querySelector("#phone-number-input");
let purchasePlanSelect = document.querySelector("#purchase-plan-select");
let countrySelect = document.querySelector("#country-select");
let policyCheckbox = document.querySelector("#company-policy");
let newsLetterCheckbox = document.querySelector("#newsLetter");
let additionalDetails = document.querySelector("#additional-details");
let form = document.querySelector("#details-form");
let detailsForm = document.querySelector("#details-form");
let submitButton = document.querySelector("#submit-button");
let isValidPurpose = false;
let isValidFirstName = false;
let isValidLastName = false;
let isValidCompanyName = false;
let isValidCompanyEmail = false;
let isValidRole = false;
let isValidPhone = false;
let isValidPurchase = false;
let isValidCountry = false;

//search button functionality
search.addEventListener("click", () => {
    searchContainer.classList.toggle("hide-search");
})

//adding options to country select
countries.map((value) => {
    let option = document.createElement("option");
    let optionName = document.createTextNode(value.name);
    option.appendChild(optionName);
    countrySelect.appendChild(option);
})

//validation
inquiryPurposeSelect.addEventListener("input", () => {
    isValidPurpose = inquiryPurposeSelect.value ? true : false;
    onError(inquiryPurposeSelect, isValidPurpose);
})

firstNameInput.addEventListener("input", () => {
    isValidFirstName = firstNameInput.value.length >= 4;
    onError(firstNameInput, isValidFirstName);
    showError();
})

lastNameInput.addEventListener("input", () => {
    isValidLastName = lastNameInput.value.length >= 4;
    onError(lastNameInput, isValidLastName);
    showError();
})

companyEmailInput.addEventListener("input", () => {
    isValidCompanyEmail = companyEmailInput.value.includes("@");
    onError(companyEmailInput, isValidCompanyEmail);
    showError();
})

companyNameInput.addEventListener("input", () => {
    isValidCompanyName = companyNameInput.value.length >= 4;
    onError(companyNameInput, isValidCompanyName);
    showError();
})

roleSelect.addEventListener("input", () => {
    isValidRole = roleSelect.value;
    onError(roleSelect, isValidRole);
})

phoneNumberInput.addEventListener("input", () => {
    isValidPhone = phoneNumberInput.value.length === 10 && !phoneNumberInput.value.includes("e") ;
    onError(phoneNumberInput, isValidPhone);
    showError();
})

purchasePlanSelect.addEventListener("input", () => {
    isValidPurchase = purchasePlanSelect.value ? true : false;
    onError(purchasePlanSelect, isValidPurchase);
})

countrySelect.addEventListener("input", () => {
    isValidCountry = countrySelect.value ? true : false;
    onError(countrySelect, isValidCountry);
})

form.addEventListener("submit", (e) => {
    isValidCompanyEmail && isValidCompanyName && isValidCountry
        && isValidFirstName && isValidLastName && isValidPhone
        && isValidPurchase && isValidPurpose && isValidRole
        && newsLetterCheckbox.checked && policyCheckbox.checked ?
        onSubmit() : showError();
    e.preventDefault();
})



//Throwing errors
function showError() {
    !isValidFirstName ? firstNameInput.setCustomValidity("first name should be atleast four letters") : firstNameInput.setCustomValidity("");
    !isValidLastName ? lastNameInput.setCustomValidity("last name should be atleast four letters") : lastNameInput.setCustomValidity("");
    !isValidPhone ? phoneNumberInput.setCustomValidity("phone number should be 10 digits") : phoneNumberInput.setCustomValidity("");
    !isValidCompanyName ? companyNameInput.setCustomValidity("company name should be atleast 4 letters") : companyNameInput.setCustomValidity("");
}

function onError(elem, valid) {
    valid ? elem.classList.remove("error") : elem.classList.add("error");
}

//handling submit
function onSubmit() {
    let data = {
        purpose: inquiryPurposeSelect.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        companyEmail: companyEmailInput.value,
        companyName: companyNameInput.value,
        roleInCompany: roleSelect.value,
        phoneNumber: phoneNumberInput.value,
        purchaseTimeline: purchasePlanSelect.value,
        country: countrySelect.value,
        additionalDetails: additionalDetails.value
    }
    console.log(data);
}


