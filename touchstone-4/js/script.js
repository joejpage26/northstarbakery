const productCategories = document.querySelectorAll(".product-category");
const filterButtons = document.querySelectorAll(".filter-btn");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const favoriteCount = document.querySelector("#favorite-count");

const categoryNames = [
    "bread",
    "pastry",
    "cake"
];

const productData = [
    {
        name: "Signature Loaf",
        category: "bread"
    },
    {
        name: "Classic Artisan Bread",
        category: "bread"
    },
    {
        name: "Fresh Pastries",
        category: "pastry"
    },
    {
        name: "Cookies",
        category: "pastry"
    },
    {
        name: "Celebration Cakes",
        category: "cake"
    },
    {
        name: "Special Event Cakes",
        category: "cake"
    }
];

let favorites =
    JSON.parse(localStorage.getItem("northStarFavorites")) || [];


function filterProducts(selectedCategory) {
    productCategories.forEach(function(categorySection) {

        const category = categorySection.dataset.category;

        if (
            selectedCategory === "all" ||
            category === selectedCategory
        ) {
            categorySection.style.display = "block";
        } else {
            categorySection.style.display = "none";
        }
    });
}


function saveFavorites() {
    localStorage.setItem(
        "northStarFavorites",
        JSON.stringify(favorites)
    );
}


function updateFavoriteButtons() {

    favoriteButtons.forEach(function(button) {

        const productName = button.dataset.product;

        if (favorites.includes(productName)) {
            button.textContent = "♥ Saved";
            button.classList.add("saved");
        } else {
            button.textContent = "♡ Add to Favorites";
            button.classList.remove("saved");
        }
    });


    if (favoriteCount) {
        favoriteCount.textContent =
            "Saved Favorites: " + favorites.length;
    }
}


function toggleFavorite(productName) {

    if (favorites.includes(productName)) {

        favorites = favorites.filter(function(item) {
            return item !== productName;
        });

    } else {

        favorites.push(productName);

    }

    saveFavorites();
    updateFavoriteButtons();
}


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;

        filterProducts(selectedCategory);

    });

});


favoriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;

        toggleFavorite(productName);

    });

});

updateFavoriteButtons();

// Form Validation
const preorderForm = document.querySelector("#preorder-form");
if (preorderForm) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const requestType = document.querySelector("#request-type");
    const itemDetails = document.querySelector("#item-details");

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const detailsError = document.querySelector("#details-error");

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add("input-error");
    }

    function clearError(input, errorElement) {
        errorElement.textContent = "";
        input.classList.remove("input-error");
    }

    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showError(
                nameInput,
                nameError,
                "Please enter a name with at least 2 characters."
            );
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }

    function validateDetails() {
        const selectedRequest = requestType.value;
        const details = itemDetails.value.trim();
        if (
            selectedRequest === "pre-order" &&
            details.length < 5
        ) {
            showError(
                itemDetails,
                detailsError,
                "Please describe what you would like to pre-order."
            );
            return false;
        }

        clearError(itemDetails, detailsError);
        return true;
    }

    preorderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameIsValid = validateName();
        const emailIsValid = validateEmail();
        const detailsAreValid = validateDetails();
        if (
            nameIsValid &&
            emailIsValid &&
            detailsAreValid
        ) {
            alert("Your request has been successfully submitted!");
        }

    });

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    itemDetails.addEventListener("input", validateDetails);
    requestType.addEventListener("change", validateDetails);

}
