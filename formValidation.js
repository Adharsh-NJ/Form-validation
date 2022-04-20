let search = document.querySelector("#search");
let searchContainer = document.querySelector("#search-container");
let additionalDetails = document.querySelector("#additional-details");
let form = document.querySelector("#details-form");
let submitButton = document.querySelector("#submit-button");
let fields = {
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
    },
    additionalDetails: { 
        element: document.querySelector("#additional-details") ,
        pattern(){
            return true
        },
        isValid:true
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
    fields.country.element.appendChild(option);
})

//validation
fields.phoneNumber.element.addEventListener("keypress", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault()
    }
})
for (let key in fields) {
    fields[key].element.addEventListener("input", () => {
        fields[key].isValid = fields[key].pattern();
        showError(fields[key].element, fields[key].isValid, fields[key]?.message)
    })
}

//handle submit
form.addEventListener("submit", (e) => {
    e.preventDefault()
    Object.values(fields).filter(value => !value.isValid).length === 0 ?
        onSubmit() : showError();
})

submitButton.addEventListener("click", () => {
    //to show all invalid fields red on submit 
    Object.values(fields).map((value) => {
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
    let formData = {}
    Object.entries(fields).map(value => {
        let key = value[0];
        formData[key] = value[1].element.value;
    })
    console.log(formData);
}


