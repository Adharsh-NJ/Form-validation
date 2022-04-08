let search = document.querySelector("#search");
let searchContainer = document.querySelector("#search-container");
let additionalDetails = document.querySelector("#additional-details");
let form = document.querySelector("#details-form");
let submitButton = document.querySelector("#submit-button");
let validation = {
    purpose: {
        element: document.querySelector("#inquiry-purpose"),
        pattern() {
            return !!this.element.value
        },
        isValid: false
    },
    fname: {
        element: document.querySelector("#first-name-input"),
        pattern() {
            return this.element?.value.length >= 4
        },
        message: "first name should be atleast four letters",
        isValid: false
    },
    lname: {
        element: document.querySelector("#last-name-input"),
        pattern() {
            return this.element.value.length >= 4
        },
        message: "last name should be atleast four letters",
        isValid: false
    },
    companyEmail: {
        element: document.querySelector("#company-email-input"),
        pattern() {
            return this.element.value.includes("@")
        },
        isValid: false
    },
    companyName: {
        element: document.querySelector("#company-name-input"),
        pattern() {
            return this.element.value.length >= 4
        },
        message: "company name should be atleast four letters",
        isValid: false
    },
    role: {
        element: document.querySelector("#role"),
        pattern() {
            return !!this.element.value
        },
        isValid: false
    },
    phoneNumber: {
        element: document.querySelector("#phone-number-input"),
        pattern() {
            return this.element.value.length === 10
        },
        message: "Phone number should be 10 digit",
        isValid: false
    },
    purchaseTimeline: {
        element: document.querySelector("#purchase-plan-select"),
        pattern() {
            return !!this.element.value
        },
        isValid: false
    },
    country: {
        element: document.querySelector("#country-select"),
        pattern() {
            return !!this.element.value
        },
        isValid: false
    },
    newsLetter: {
        element: document.querySelector("#newsLetter"),
        pattern() {
            return this.element.checked
        },
        isValid: false
    },
    policy: {
        element: document.querySelector("#company-policy"),
        pattern() {
            return this.element.checked
        },
        isValid: false
    }
}

//search button functionality
search.addEventListener("click", () => {
    searchContainer.classList.toggle("hide-search");
})

//adding options to country select
countries.map((value) => {
    let option = document.createElement("option");
    let optionName = document.createTextNode(value.name);
    option.appendChild(optionName);
    validation.country.element.appendChild(option);
})

//validation
validation.phoneNumber.element.addEventListener("keypress", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault()
    }
})

for (let key in validation) {
    validation[key].element.addEventListener("input", () => {
        validation[key].isValid = validation[key].pattern();
        showError(validation[key].element, validation[key].isValid, validation[key]?.message)
    })
}

//handle submit
form.addEventListener("submit", (e) => {
    e.preventDefault()
    Object.values(validation).filter(value => !value.isValid).length === 0 ?
        onSubmit() : showError("submit");
})

submitButton.addEventListener("click", () => {
    //to show all invalid fields red on submit 
    Object.values(validation).map((value) => {
        if (!value.isValid) {
            value.element.classList.add("error");
        }
    })
})

//Throwing errors
function showError(elem, status, message) {
    if (message) {
        !status ? elem.setCustomValidity(message) : elem.setCustomValidity("");
        !elem.value && elem.setCustomValidity("Please fill in this filed");
        status ? elem?.classList.remove("error") : elem?.classList.add("error");
        elem?.reportValidity();
    } else {
        status ? elem.classList?.remove("error") : elem.classList?.add("error");
    }
}

//handling submit
function onSubmit() {
    let data = {
        additionalDetails: additionalDetails.value
    }
    Object.entries(validation).map(value => {
        let key = value[0];
        data[key] = value[1].element.value;
    })
    console.log(data);
}


